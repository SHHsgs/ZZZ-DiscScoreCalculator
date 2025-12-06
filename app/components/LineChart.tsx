"use client";
import React from "react";

type Series = {
  name: string;
  values: number[]; // indexed from 0 -> x=1
  color?: string;
};

type Props = {
  series: Series[];
  width?: number;
  height?: number;
  xMax?: number; // default 20
  yMax?: number; // optional; if not provided computed from data
};

export default function LineChart({ series, width = 700, height = 220, xMax = 20, yMax }: Props) {
  const padding = { top: 12, right: 12, bottom: 44, left: 36 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  // compute max from data if yMax not provided
  const dataMax = Math.max(
    0,
    ...(series.flatMap((s) => s.values.filter((v) => typeof v === "number")))
  );
  const computedYMax = yMax && yMax > dataMax ? yMax : Math.ceil(dataMax === 0 ? 10 : dataMax / 10) * 10;

  function xForIndex(i: number) {
    if (xMax === 1) return padding.left + innerW / 2;
    const t = i / (xMax - 1);
    return padding.left + t * innerW;
  }

  function yForValue(v: number) {
    const ratio = Math.max(0, Math.min(1, v / computedYMax));
    return padding.top + (1 - ratio) * innerH;
  }

  const xTicks = Array.from({ length: xMax }, (_, i) => i + 1);
  const yTicks = (() => {
    const step = Math.max(10, Math.ceil(computedYMax / 5 / 10) * 10);
    const arr = [];
    for (let v = 0; v <= computedYMax; v += step) arr.push(v);
    if (arr[arr.length - 1] !== computedYMax) arr.push(computedYMax);
    return arr;
  })();

  return (
    <div className="w-full overflow-auto">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-label="Line chart">
        <defs>
          <style>{`.gridline{stroke:#e5e7eb;stroke-width:1}.axis{stroke:#9ca3af;stroke-width:1}.label{fill:#6b7280;font-size:18px;font-family:Inter,Arial,sans-serif}`}</style>
        </defs>

        {/* grid horizontal lines and y labels */}
        {yTicks.map((y) => {
          const yy = yForValue(y);
          return (
            <g key={y}>
              <line className="gridline" x1={padding.left} x2={width - padding.right} y1={yy} y2={yy} />
              <text className="label" x={padding.left - 8} y={yy + 4} textAnchor="end">
                {y}
              </text>
            </g>
          );
        })}

        {/* x axis */}
        <line className="axis" x1={padding.left} x2={width - padding.right} y1={padding.top + innerH} y2={padding.top + innerH} />
        {xTicks.map((xt, i) => {
          // show label every 2 or 5 to avoid clutter
          const show = xMax <= 10 ? true : i % 2 === 0;
          const x = xForIndex(i);
          return (
            <g key={xt}>
              <line className="gridline" x1={x} x2={x} y1={padding.top + innerH} y2={padding.top + innerH + 4} />
              {show && (
                <text className="label" x={x} y={padding.top + innerH + 24} textAnchor="middle">
                  {xt}
                </text>
              )}
            </g>
          );
        })}

        {/* axis units */}
        <text className="label" x={width - padding.right} y={padding.top + innerH + 24} textAnchor="end">
          個
        </text>
        <text className="label" x={padding.left - 8} y={padding.top - 4} textAnchor="end">
          %
        </text>

        {/* lines */}
        {series.map((s, si) => {
          const color = s.color ?? (si === 0 ? "#3B82F6" : si === 1 ? "#F97316" : `hsl(${(si * 70) % 360} 80% 50%)`);
          const points = Array.from({ length: xMax }, (_, i) => {
            const v = s.values[i] ?? 0;
            const x = xForIndex(i);
            const y = yForValue(v);
            return `${x},${y}`;
          }).join(" ");
          return (
            <g key={s.name}>
              <polyline fill="none" stroke={color} strokeWidth={2} points={points} strokeLinejoin="round" strokeLinecap="round" />
              {/* markers */}
              {Array.from({ length: xMax }, (_, i) => {
                const v = s.values[i] ?? 0;
                const x = xForIndex(i);
                const y = yForValue(v);
                return <circle key={i} cx={x} cy={y} r={2.5} fill={color} />;
              })}
            </g>
          );
        })}
      </svg>

      {/* legend */}
      <div className="mt-3 flex gap-4 items-center">
        {series.map((s, i) => (
          <div key={s.name} className="flex items-center gap-3">
            <span style={{ width: 14, height: 14, background: s.color ?? (i === 0 ? "#3B82F6" : i === 1 ? "#F97316" : undefined) }} className="inline-block rounded-sm" />
            <span style={{ fontSize: 18, color: "#374151" }}>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
