export default function ScoreRadar({ concepts, scores }) {
  // Larger canvas with generous padding for labels
  const W = 560;
  const H = 500;
  const cx = W / 2;
  const cy = H / 2;
  const maxR = 150;
  const levels = 5;
  const labelR = maxR + 44; // distance from centre to label

  const items = concepts.map((c, i) => ({
    id: c.id,
    label: c.title
      .replace('Platform Intent & Experience Intent', 'Platform Intent')
      .replace('Foundational Health', 'Enable')
      .replace('Sustainable Development', 'Grow')
      .replace('Immune System Health', 'Protect'),
    score: scores[c.id] ?? 0,
    angle: (Math.PI * 2 * i) / concepts.length - Math.PI / 2,
  }));

  function polar(angle, r) {
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  const rings = Array.from({ length: levels }, (_, i) => {
    const r = (maxR / levels) * (i + 1);
    return items.map(it => polar(it.angle, r)).map(p => `${p.x},${p.y}`).join(' ');
  });

  const dataPoints = items.map(it => polar(it.angle, (it.score / 5) * maxR));
  const dataPath = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
  const axes = items.map(it => ({ ...polar(it.angle, maxR), cx, cy }));

  const labels = items.map(it => {
    const p = polar(it.angle, labelR);
    // Determine text anchor based on x position relative to centre
    let anchor = 'middle';
    if (p.x < cx - 20) anchor = 'end';
    if (p.x > cx + 20) anchor = 'start';
    // Score label line 2
    const scoreTxt = it.score > 0 ? `${it.score}/5` : '';
    return { ...p, label: it.label, anchor, scoreTxt };
  });

  return (
    <div className="flex justify-center w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ maxWidth: 580 }}
        overflow="visible"
      >
        {/* Grid rings */}
        {rings.map((pts, i) => (
          <polygon key={i} points={pts} fill="none" stroke="#d9d9e0" strokeWidth={i === levels - 1 ? 1.5 : 0.5} />
        ))}

        {/* Axes */}
        {axes.map((a, i) => (
          <line key={i} x1={a.cx} y1={a.cy} x2={a.x} y2={a.y} stroke="#d9d9e0" strokeWidth={0.5} />
        ))}

        {/* Score level numbers (1–5) along top axis */}
        {Array.from({ length: levels }, (_, i) => {
          const r = (maxR / levels) * (i + 1);
          const p = polar(-Math.PI / 2, r);
          return (
            <text key={i} x={p.x + 4} y={p.y} fontSize="8" fill="#9c9cb4" fontFamily="Space Mono, monospace" dominantBaseline="middle">
              {i + 1}
            </text>
          );
        })}

        {/* Data polygon */}
        <polygon points={dataPath} fill="rgba(34,34,62,0.08)" stroke="#22223e" strokeWidth={2} />

        {/* Data dots */}
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4} fill="#22223e" stroke="#e8e8e8" strokeWidth={2} />
        ))}

        {/* Labels — two lines: name + score */}
        {labels.map((l, i) => (
          <text key={i} x={l.x} y={l.y} textAnchor={l.anchor} fontFamily="Space Mono, monospace" fill="#9c9cb4">
            <tspan fontSize="9.5" dominantBaseline="auto">{l.label}</tspan>
            {l.scoreTxt && (
              <tspan x={l.x} dy="13" fontSize="9" fill="#22223e" fontWeight="bold">{l.scoreTxt}</tspan>
            )}
          </text>
        ))}
      </svg>
    </div>
  );
}
