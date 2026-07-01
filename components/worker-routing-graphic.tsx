/**
 * WorkerRoutingGraphic
 *
 * Deterministic SVG infographic:
 *   Workers -> Normalized Memory -> Mem-D Core -> Governed Context -> Agent / LLM
 *
 * Small packets enter from the worker side along fixed straight lines,
 * converge through normalization into Mem-D Core, and a clean packet
 * exits to governed context. Fully contained, no random motion.
 */

// Fixed straight entry paths from four worker lanes into the normalize bus.
const entryPaths = [
  "M 0 45 L 250 45 L 330 132",
  "M 0 105 L 250 105 L 330 144",
  "M 0 195 L 250 195 L 330 156",
  "M 0 255 L 250 255 L 330 168",
] as const

// Normalized memory -> Mem-D core -> context -> agent.
const corePath = "M 330 150 L 470 150"
const exitPath = "M 630 150 L 790 150"
const agentPath = "M 900 150 L 1000 150"

const packets = [
  { path: entryPaths[0], dur: 7, delay: 0 },
  { path: entryPaths[1], dur: 7, delay: 1.8 },
  { path: entryPaths[2], dur: 7, delay: 3.5 },
  { path: entryPaths[3], dur: 7, delay: 5.2 },
]

export function WorkerRoutingGraphic() {
  return (
    <div
      className="overflow-hidden border border-border-subtle bg-surface"
      style={{ borderRadius: "var(--radius-lg)" }}
    >
      <svg
        viewBox="0 0 1000 300"
        className="h-auto w-full"
        role="img"
        aria-label="Workers feed normalized memory into Mem-D Core, which outputs governed context to the agent or LLM"
        fill="none"
      >
        {/* Entry lanes */}
        <g stroke="var(--steel)" strokeOpacity="0.25" strokeWidth="1">
          {entryPaths.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Core connector lines (animated dash flow) */}
        <g strokeWidth="1">
          <path d={corePath} stroke="var(--primary)" strokeOpacity="0.6" className="mem-dash-flow" />
          <path d={exitPath} stroke="var(--electric)" strokeOpacity="0.6" className="mem-dash-flow" />
          <path d={agentPath} stroke="var(--electric)" strokeOpacity="0.4" className="mem-dash-flow-slow" />
        </g>

        {/* Worker lane labels */}
        <g fontFamily="var(--font-mono)" fontSize="11" fill="var(--steel)" fillOpacity="0.75">
          <text x="8" y="38">worker: claude_export</text>
          <text x="8" y="98">worker: mcp_memory</text>
          <text x="8" y="188">worker: langchain</text>
          <text x="8" y="248">worker: json / traces</text>
        </g>

        {/* Normalized memory node */}
        <g>
          <rect
            x="270"
            y="120"
            width="120"
            height="60"
            rx="4"
            fill="var(--muted)"
            stroke="var(--border-subtle)"
          />
          <text
            x="330"
            y="146"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--muted-foreground)"
          >
            normalized
          </text>
          <text
            x="330"
            y="162"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--muted-foreground)"
          >
            memory
          </text>
        </g>

        {/* Mem-D Core node */}
        <g>
          <rect
            x="470"
            y="105"
            width="160"
            height="90"
            rx="4"
            fill="color-mix(in srgb, var(--primary) 10%, transparent)"
            stroke="var(--primary)"
            strokeOpacity="0.5"
          />
          <text
            x="550"
            y="142"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="13"
            fill="var(--electric)"
            letterSpacing="0.08em"
          >
            Mem-D Core
          </text>
          <text
            x="550"
            y="162"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="var(--steel)"
          >
            audit · simulate · plan
          </text>
          {/* Governance gate tick */}
          <line
            x1="630"
            y1="120"
            x2="630"
            y2="180"
            stroke="var(--electric)"
            strokeOpacity="0.35"
            strokeDasharray="2 5"
          />
        </g>

        {/* Governed context node */}
        <g>
          <rect
            x="790"
            y="120"
            width="110"
            height="60"
            rx="4"
            fill="color-mix(in srgb, var(--electric) 8%, transparent)"
            stroke="var(--electric)"
            strokeOpacity="0.4"
          />
          <text
            x="845"
            y="146"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--electric)"
          >
            governed
          </text>
          <text
            x="845"
            y="162"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--electric)"
          >
            context
          </text>
        </g>

        {/* Agent label at the exit */}
        <text
          x="994"
          y="140"
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--muted-foreground)"
        >
          agent / LLM
        </text>

        {/* Memory packets on fixed entry lanes */}
        <g>
          {packets.map((p, i) => (
            <circle
              key={i}
              className="mem-packet"
              r="3"
              fill="var(--steel)"
              fillOpacity="0.9"
              style={{
                offsetPath: `path('${p.path}')`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
          {/* Clean packet exiting to context */}
          <circle
            className="mem-packet"
            r="3.5"
            fill="var(--electric)"
            style={{
              offsetPath: `path('${exitPath}')`,
              animationDuration: "5s",
              animationDelay: "2s",
            }}
          />
        </g>
      </svg>
    </div>
  )
}
