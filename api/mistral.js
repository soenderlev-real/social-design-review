/**
 * Server-side Mistral proxy — lets people try the tool without their own key.
 *
 * The app is a static SPA, so a key shipped to the browser is a published key:
 * view-source, devtools, or curl on the JS asset all reveal it. The key
 * therefore lives only in the MISTRAL_API_KEY environment variable and never
 * reaches the client. Bring-your-own-key providers are unaffected and still
 * call their provider directly from the browser.
 *
 * Mistral hosts in the EU by default, which is why this is the provider we
 * front rather than one of the US options.
 */

const MISTRAL_URL = 'https://api.mistral.ai/v1/chat/completions';

const TEXT_MODEL   = 'mistral-large-latest';
const VISION_MODEL = 'mistral-large-latest';

// A full 13-dimension run is 13 requests, so the window has to allow a few runs
// while still stopping a script. Best-effort only — see the note by `hits`.
const WINDOW_MS    = 10 * 60 * 1000;
const MAX_PER_IP   = 45;
const MAX_BODY     = 1_000_000;   // ~1MB, enough for prompts plus a couple of images
const MAX_IMAGES   = 6;   // matches fileProcessing.js MAX_IMAGES — silently
                          // dropping the rest would lose evidence without saying so
const MAX_TOKENS   = 2000;

/**
 * In-memory sliding window. Serverless instances are reused under Fluid Compute,
 * so this catches casual abuse, but it is per-instance and NOT authoritative.
 * The real backstop is a monthly spending limit on the Mistral workspace.
 */
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every(t => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_IP;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: { message: 'The hosted Mistral option is not configured on this deployment. Choose a provider and use your own API key.' },
    });
  }

  if (rateLimited(clientIp(req))) {
    res.setHeader('Retry-After', '600');
    return res.status(429).json({
      error: { message: 'Too many requests on the shared key. Please try again in 10 minutes, or run this with your own API key — any provider on the form works.' },
    });
  }

  let body = req.body;
  try {
    if (typeof body === 'string') body = JSON.parse(body);
  } catch {
    return res.status(400).json({ error: { message: 'Invalid JSON body' } });
  }

  const { systemPrompt, userPrompt, images } = body || {};
  if (typeof systemPrompt !== 'string' || typeof userPrompt !== 'string') {
    return res.status(400).json({ error: { message: 'systemPrompt and userPrompt are required' } });
  }

  const imgs = Array.isArray(images) ? images.slice(0, MAX_IMAGES) : [];

  const approxSize = systemPrompt.length + userPrompt.length +
    imgs.reduce((n, i) => n + (i?.base64?.length || 0), 0);
  if (approxSize > MAX_BODY) {
    return res.status(413).json({
      error: { message: 'Request too large for the shared key. Remove some uploaded files, or use your own API key.' },
    });
  }

  const content = imgs.length
    ? [
        { type: 'text', text: userPrompt },
        ...imgs.map(i => ({ type: 'image_url', image_url: { url: `data:${i.mediaType};base64,${i.base64}` } })),
      ]
    : userPrompt;

  try {
    const upstream = await fetch(MISTRAL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: imgs.length ? VISION_MODEL : TEXT_MODEL,
        max_tokens: MAX_TOKENS,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content },
        ],
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.json().catch(() => ({}));
      // Pass rate-limit and overload signals through unchanged so the client's
      // retry/backoff can act on them; never forward anything key-shaped.
      const retryAfter = upstream.headers.get('retry-after');
      if (retryAfter) res.setHeader('Retry-After', retryAfter);
      // Mistral uses {message} at the top level for some errors and
      // {error:{message}} for others — read both, or diagnostics vanish.
      const upstreamMessage =
        detail.error?.message || detail.message ||
        (typeof detail.detail === 'string' ? detail.detail : null);
      const message =
        upstream.status === 429
          ? (upstreamMessage || 'The shared key is rate limited right now. Retrying shortly.')
          : upstream.status === 401 || upstream.status === 403
            ? 'The shared key was rejected. Please use your own API key for now.'
            : (upstreamMessage || `Upstream error ${upstream.status}`);
      return res.status(upstream.status).json({ error: { message } });
    }

    const data = await upstream.json();
    const text = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ text });
  } catch (err) {
    return res.status(502).json({ error: { message: 'Could not reach Mistral. Please try again.' } });
  }
}
