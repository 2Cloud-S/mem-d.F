/**
 * HeroMemoryBackground
 *
 * Abstract, product-specific visualization of Mem-D's concept:
 *   messy memory -> governance -> clean context
 *
 * Pure SVG + CSS (no canvas, no dependencies). Sits behind the hero content,
 * low opacity, slow + non-distracting. Respects prefers-reduced-motion.
 *
 * Coordinate system: viewBox 0 0 1200 600, "slice" so it always covers.
 */

// Governance routes (left raw side -> Mem-D center -> right governed side).
const routes = {
  // Two clean flows that pass through governance and continue out (governed).
  safeTop: "M -40 150 C 300 150 380 230 620 230 S 980 160 1240 150",
  safeBottom: "M -40 450 C 300 450 380 360 620 360 S 1000 430 1240 440",
  // Two raw streams that merge at the governance center...
  mergeA: "M -40 90 C 260 90 440 290 620 295",
  mergeB: "M -40 540 C 260 540 440 300 620 295",
  // ...and one consolidated stream that exits as governed context.
  mergeOut: "M 620 295 C 820 295 1000 250 1240 250",
  // A route that diverts down into the review queue.
  review: "M -40 250 C 220 250 460 260 600 290 L 760 470",
  // A route that is stopped at the safety boundary (path ends before it).
  blocked: "M -40 320 C 220 320 440 250 596 248",
} as const

// Memory packets travelling along the routes.
type Packet = {
  path: string
  dur: number
  delay: number
  r: number
  fill: string
}

const packets: Packet[] = [
  { path: routes.safeTop, dur: 13, delay: 0, r: 3, fill: "var(--electric)" },
  { path: routes.safeTop, dur: 13, delay: 6.5, r: 2.4, fill: "var(--electric)" },
  { path: routes.safeBottom, dur: 15, delay: 3, r: 3, fill: "var(--electric)" },
  { path: routes.mergeA, dur: 11, delay: 1.5, r: 2.6, fill: "var(--steel)" },
  { path: routes.mergeB, dur: 11, delay: 5, r: 2.6, fill: "var(--steel)" },
  { path: routes.mergeOut, dur: 10, delay: 8, r: 3.2, fill: "var(--electric)" },
  { path: routes.review, dur: 14, delay: 2.5, r: 2.6, fill: "var(--steel)" },
  { path: routes.blocked, dur: 9, delay: 0.5, r: 2.6, fill: "var(--blocked)" },
  { path: routes.blocked, dur: 9, delay: 4.5, r: 2.2, fill: "var(--blocked)" },
]

// Faint node clusters: messy on the left, tidy column on the right.
const rawNodes = [
  { x: 70, y: 110, label: "pref" },
  { x: 150, y: 200, label: "dup" },
  { x: 110, y: 300, label: "fact" },
  { x: 200, y: 380, label: "stale" },
  { x: 90, y: 470, label: "task" },
  { x: 240, y: 130, label: "conflict" },
  { x: 300, y: 460, label: "dup" },
]

const governedNodes = [
  { x: 1080, y: 170, label: "keep" },
  { x: 1080, y: 250, label: "keep" },
  { x: 1080, y: 330, label: "keep" },
  { x: 1080, y: 410, label: "keep" },
]

const reviewQueue = [
  { x: 740, y: 450 },
  { x: 740, y: 478 },
  { x: 740, y: 506 },
]

export function HeroMemoryBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Route paths (faint, static) */}
        <g stroke="var(--steel)" strokeOpacity="0.16" strokeWidth="1" fill="none">
          <path d={routes.safeTop} />
          <path d={routes.safeBottom} />
          <path d={routes.mergeA} />
          <path d={routes.mergeB} />
          <path d={routes.mergeOut} stroke="var(--electric)" strokeOpacity="0.22" />
          <path d={routes.review} strokeDasharray="3 5" />
          <path d={routes.blocked} strokeDasharray="3 5" strokeOpacity="0.12" />
        </g>

        {/* Mem-D governance center marker */}
        <g opacity="0.5">
          <circle cx="620" cy="295" r="26" stroke="var(--electric)" strokeOpacity="0.25" />
          <circle cx="620" cy="295" r="14" stroke="var(--electric)" strokeOpacity="0.4" />
        </g>

        {/* Safety boundary line */}
        <g>
          <line
            x1="620"
            y1="110"
            x2="620"
            y2="490"
            stroke="var(--blocked)"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="2 7"
          />
          <text
            x="626"
            y="124"
            fill="var(--blocked)"
            fillOpacity="0.4"
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="0.12em"
          >
            safety
          </text>
        </g>

        {/* Raw / messy node cluster (left) */}
        <g fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.08em">
          {rawNodes.map((n, i) => (
            <g
              key={`raw-${i}`}
              className="mem-drift"
              style={{ animationDelay: `${i * 0.6}s`, animationDuration: `${7 + (i % 3)}s` }}
            >
              <circle cx={n.x} cy={n.y} r="3" fill="var(--steel)" fillOpacity="0.3" />
              <text x={n.x + 7} y={n.y + 3} fill="var(--steel)" fillOpacity="0.22">
                {n.label}
              </text>
            </g>
          ))}
        </g>

        {/* Governed context exit label */}
        <text
          x="1146"
          y="242"
          fill="var(--electric)"
          fillOpacity="0.34"
          fontSize="9"
          fontFamily="var(--font-mono)"
          letterSpacing="0.12em"
        >
          context
        </text>

        {/* Governed node column (right) */}
        <g fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.08em">
          {governedNodes.map((n, i) => (
            <g key={`gov-${i}`} className="mem-pulse" style={{ animationDelay: `${i * 0.8}s` }}>
              <rect
                x={n.x - 6}
                y={n.y - 6}
                width="12"
                height="12"
                rx="3"
                fill="var(--electric)"
                fillOpacity="0.12"
                stroke="var(--electric)"
                strokeOpacity="0.3"
              />
              <text x={n.x + 12} y={n.y + 3} fill="var(--electric)" fillOpacity="0.28">
                {n.label}
              </text>
            </g>
          ))}
        </g>

        {/* Review queue cluster */}
        <g>
          <text
            x="726"
            y="436"
            fill="var(--steel)"
            fillOpacity="0.32"
            fontSize="8"
            fontFamily="var(--font-mono)"
            letterSpacing="0.12em"
          >
            review
          </text>
          {reviewQueue.map((n, i) => (
            <rect
              key={`rev-${i}`}
              className="mem-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
              x={n.x}
              y={n.y - 8}
              width="34"
              height="16"
              rx="3"
              fill="var(--steel)"
              fillOpacity="0.1"
              stroke="var(--steel)"
              strokeOpacity="0.28"
            />
          ))}
        </g>

        {/* Block marker at the safety boundary */}
        <g opacity="0.5">
          <circle cx="600" cy="248" r="4" fill="var(--blocked)" fillOpacity="0.4" />
          <text
            x="582"
            y="234"
            fill="var(--blocked)"
            fillOpacity="0.4"
            fontSize="8"
            fontFamily="var(--font-mono)"
            letterSpacing="0.1em"
          >
            block
          </text>
        </g>

        {/* Memory packets flowing along the routes */}
        <g>
          {packets.map((p, i) => (
            <circle
              key={`pkt-${i}`}
              className="mem-packet"
              r={p.r}
              fill={p.fill}
              fillOpacity="0.85"
              style={{
                offsetPath: `path('${p.path}')`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </g>

        {/* Audit sweep overlay */}
        <rect
          className="mem-sweep"
          x="-160"
          y="0"
          width="160"
          height="600"
          fill="url(#mem-sweep-gradient)"
        />
        <defs>
          <linearGradient id="mem-sweep-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--electric)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--electric)" stopOpacity="0.07" />
            <stop offset="100%" stopColor="var(--electric)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
