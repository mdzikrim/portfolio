import type { ProjectMeta } from "@/lib/projects";

/** Deterministic hue per project so two cards never share a wash. */
function hueFor(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

/**
 * Picks a scene from the category text rather than an exact match, so a new
 * category like "Applied Security" still lands somewhere sensible.
 * Order matters: "IoT & Data" must be caught before the generic "data".
 */
function sceneFor(category: string) {
  const c = category.toLowerCase();
  if (c.includes("security") || c.includes("cyber")) return "keystroke";
  if (c.includes("gis") || c.includes("map") || c.includes("geo")) return "map";
  if (c.includes("vision") || c.includes("image")) return "scan";
  if (c.includes("iot") || c.includes("sensor")) return "trace";
  if (c.includes("data") || c.includes("analy")) return "chart";
  return "drift";
}

/** Typing rhythm: staggered bars with a caret sweeping across them. */
function Keystroke() {
  return (
    <>
      {Array.from({ length: 11 }, (_, i) => (
        <rect
          key={i}
          className="pv-bar fill-accent/55"
          x={68 + i * 17}
          y={64}
          width="6"
          height="72"
          rx="3"
          style={{ animationDelay: `${i * 0.13}s` }}
        />
      ))}
      <rect className="pv-caret fill-accent" x={62} y={58} width="2" height="84" rx="1" />
    </>
  );
}

/** Radius search: rings expanding from a centre pin, with two outliers. */
function MapScene() {
  // The teardrop and its hole are scaled together, so smaller pins stay in
  // proportion instead of growing an oversized dot.
  const pin = (x: number, y: number, delay: number, scale = 1) => (
    <g className="pv-pin" style={{ animationDelay: `${delay}s` }}>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <path
          d="M0 0 c-6.6 0-12 5.4-12 12 0 8 12 21 12 21s12-13 12-21c0-6.6-5.4-12-12-12Z"
          className="fill-accent/80"
        />
        <circle cx="0" cy="12" r="4.5" className="fill-bg" />
      </g>
    </g>
  );

  return (
    <>
      {[0, 1.1, 2.2].map((delay) => (
        <circle
          key={delay}
          className="pv-ring stroke-accent/45"
          cx={160}
          cy={104}
          r="58"
          fill="none"
          strokeWidth="1.5"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {pin(160, 84, 0)}
      {pin(96, 60, 0.7, 0.62)}
      {pin(232, 118, 1.3, 0.62)}
    </>
  );
}

/** Image classification: a detection frame with a scan line crossing it. */
function Scan() {
  const bracket = (d: string) => (
    <path d={d} className="stroke-accent/70" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  );

  return (
    <>
      <rect
        x={104}
        y={56}
        width={112}
        height={92}
        rx="8"
        className="stroke-fg/12"
        strokeWidth="1.5"
        fill="none"
      />
      {bracket("M104 76 v-12 a8 8 0 0 1 8-8 h12")}
      {bracket("M216 76 v-12 a8 8 0 0 0-8-8 h-12")}
      {bracket("M104 128 v12 a8 8 0 0 0 8 8 h12")}
      {bracket("M216 128 v12 a8 8 0 0 1-8 8 h-12")}
      <g className="pv-scan">
        <rect x={104} y={56} width={112} height="2" rx="1" className="fill-accent" />
        <rect x={104} y={44} width={112} height="12" className="fill-accent/15" />
      </g>
    </>
  );
}

/** Sensor readings: a trace drawing itself, over and over. */
function Trace() {
  return (
    <>
      <path
        d="M56 118 C88 118 88 78 120 78 S152 130 184 130 216 70 248 70 268 92 272 96"
        className="stroke-fg/12"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M56 118 C88 118 88 78 120 78 S152 130 184 130 216 70 248 70 268 92 272 96"
        className="pv-trace stroke-accent"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

/** Analysis: bars rising in sequence under a flat baseline. */
function Chart() {
  const heights = [34, 58, 44, 76, 62, 92];
  return (
    <>
      <rect x={64} y={144} width={192} height="1.5" rx="1" className="fill-fg/12" />
      {heights.map((h, i) => (
        <rect
          key={i}
          className="pv-grow fill-accent/60"
          x={70 + i * 31}
          y={144 - h}
          width={18}
          height={h}
          rx="4"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </>
  );
}

/** Neutral fallback for categories we have no scene for yet. */
function Drift() {
  return (
    <>
      {[
        { cx: 128, cy: 84, r: 30, d: 0 },
        { cx: 186, cy: 112, r: 22, d: 0.9 },
        { cx: 156, cy: 62, r: 14, d: 1.8 },
      ].map((c) => (
        <circle
          key={c.d}
          className="pv-drift stroke-accent/45"
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill="none"
          strokeWidth="1.5"
          style={{ animationDelay: `${c.d}s` }}
        />
      ))}
    </>
  );
}

const SCENES = {
  keystroke: Keystroke,
  map: MapScene,
  scan: Scan,
  trace: Trace,
  chart: Chart,
  drift: Drift,
} as const;

/**
 * The animated stand-in shown on cards that have no screenshot yet.
 * As soon as a project sets `cover`, the real image takes over.
 */
export function ProjectVisual({ project }: { project: ProjectMeta }) {
  const hue = hueFor(project.slug);
  const Scene = SCENES[sceneFor(project.category)];

  return (
    <div
      className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
      style={{
        backgroundImage: `radial-gradient(120% 100% at 20% 0%, hsl(${hue} 70% 55% / 0.18), transparent 62%)`,
      }}
    >
      <svg viewBox="0 0 320 200" className="size-full" aria-hidden focusable="false">
        <Scene />
      </svg>
    </div>
  );
}
