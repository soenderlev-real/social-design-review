/**
 * Normalise the `content` of a chat-completions message or delta to plain text.
 *
 * For years an OpenAI-compatible reply carried `content` as a string, and every
 * reader here assumed one. Mistral's reasoning models — which
 * `mistral-large-latest` now resolves to — send a list of typed chunks instead:
 *
 *   [{ type: 'thinking', thinking: [{ type: 'text', text: '...' }], closed: true },
 *    { type: 'text', text: 'the actual answer' }]
 *
 * and then revert to a bare string on the final frame, so a single reply
 * arrives in both shapes. Concatenating the list is where a reply rendered as
 * an unbroken wall of "[object Object]" came from.
 *
 * The `thinking` chunks are the model's private reasoning. They are dropped on
 * purpose: they are not the answer, they are not written for a reader, and
 * because they arrive first they would otherwise appear in place of the reply
 * and be mistaken for it.
 *
 * A string passes through untouched, so this is safe on providers that never
 * send anything else.
 */
export function contentToText(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';

  let text = '';
  for (const chunk of content) {
    if (typeof chunk === 'string') { text += chunk; continue; }
    // Only `text` chunks are the reply. Unknown types are skipped rather than
    // stringified — a future chunk type should go missing, not turn into noise.
    if (chunk?.type === 'text' && typeof chunk.text === 'string') text += chunk.text;
  }
  return text;
}
