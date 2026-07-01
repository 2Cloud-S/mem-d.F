import { StatCounter } from "@/components/ui/stat-counter"

type Stat = {
  value: number
  label: string
  suffix?: string
  decimals?: number
}

const columns: { title: string; caption: string; tone: "input" | "core" | "output"; stats: Stat[] }[] = [
  {
    title: "Input",
    caption: "Real Claude export",
    tone: "input",
    stats: [
      { value: 98, label: "conversations" },
      { value: 805, label: "raw messages" },
      { value: 187, label: "memory candidates" },
    ],
  },
  {
    title: "Mem-D processing",
    caption: "Audit + simulation",
    tone: "core",
    stats: [
      { value: 12, label: "duplicate clusters" },
      { value: 28, label: "duplicate memories" },
      { value: 14.97, suffix: "%", decimals: 2, label: "compression opportunity" },
    ],
  },
  {
    title: "Governance output",
    caption: "Plans, not mutations",
    tone: "output",
    stats: [
      { value: 31, label: "workflow items" },
      { value: 36, label: "workflow steps" },
      { value: 1, label: "integrity blocker" },
    ],
  },
]

const toneStyles = {
  input: {
    header: "text-muted-foreground",
    border: "border-border-subtle",
    value: "text-foreground",
  },
  core: {
    header: "text-[color:var(--electric)]",
    border: "border-primary/40",
    value: "text-[color:var(--electric)]",
  },
  output: {
    header: "text-[color:var(--electric)]",
    border: "border-border-subtle",
    value: "text-foreground",
  },
} as const

export function EvidencePanel() {
  return (
    <div
      className="overflow-hidden border border-border-subtle bg-surface"
      style={{ borderRadius: "var(--radius-lg)" }}
    >
      {/* Evidence header strip */}
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-2.5">
        <span className="font-mono text-xs tracking-tight text-muted-foreground">
          claude_export_analysis.report
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--electric)]">
          end-to-end run
        </span>
      </div>

      <div className="grid divide-y divide-border-subtle md:grid-cols-3 md:divide-x md:divide-y-0">
        {columns.map((col) => {
          const tone = toneStyles[col.tone]
          return (
            <div key={col.title} className={`flex flex-col p-4 sm:p-5 ${col.tone === "core" ? "bg-primary/[0.04]" : ""}`}>
              <div className="mb-4">
                <h3 className={`font-mono text-xs uppercase tracking-[0.16em] ${tone.header}`}>
                  {col.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{col.caption}</p>
              </div>
              <dl className="flex flex-col gap-2">
                {col.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`border bg-muted px-3 py-2.5 ${tone.border}`}
                    style={{ borderRadius: "var(--radius-sm)" }}
                  >
                    <dd className={`font-mono text-xl font-semibold tracking-tight sm:text-2xl ${tone.value}`}>
                      <StatCounter
                        value={stat.value}
                        suffix={stat.suffix ?? ""}
                        decimals={stat.decimals ?? 0}
                      />
                    </dd>
                    <dt className="mt-0.5 font-mono text-xs text-muted-foreground">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          )
        })}
      </div>
    </div>
  )
}
