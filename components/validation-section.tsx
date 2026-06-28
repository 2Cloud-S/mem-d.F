import { ShieldCheck, Info } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { StatCounter } from "@/components/ui/stat-counter"

const stats = [
  { value: 98, label: "Conversations read" },
  { value: 805, label: "Raw messages converted" },
  { value: 187, label: "Memory candidates" },
  { value: 12, label: "Duplicate clusters" },
  { value: 28, label: "Duplicate memories" },
  { value: 14.97, suffix: "%", decimals: 2, label: "Compression opportunity" },
  { value: 31, label: "Workflow items" },
  { value: 36, label: "Workflow steps" },
  { value: 1, label: "Integrity blocker" },
]

export function ValidationSection() {
  return (
    <section className="border-b border-border-subtle bg-surface/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Real-world validation"
          title="Tested on real AI collaboration memory."
          description="A real Claude export was converted into memory candidates and analyzed end-to-end. Mem-D found duplicate pressure, generated workflow plans, and blocked unsafe paths instead of mutating source memory."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border-subtle bg-surface p-5"
            >
              <div className="font-mono text-2xl font-semibold tracking-tight text-[color:var(--electric)] sm:text-3xl">
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix ?? ""}
                  decimals={stat.decimals ?? 0}
                />
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/[0.07] px-4 py-3.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--electric)]" aria-hidden="true" />
            <p className="text-pretty text-sm leading-relaxed text-foreground">
              The integrity blocker stopped an unsafe path before any source memory was mutated.
              Plans stay reviewable instead of auto-applied.
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border-subtle bg-surface px-4 py-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-steel" aria-hidden="true" />
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Raw transcript analysis is stress mode. Curated memory candidates are the correct
              governance input for end-to-end reporting.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
