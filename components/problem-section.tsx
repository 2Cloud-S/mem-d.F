import { Copy, History, GitFork, ShieldAlert } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const problems = [
  {
    icon: Copy,
    title: "Duplicate Memory",
    memory: ['"User prefers Redis"', '"Likes Redis for caching"'],
    risk: "Context inflates and old noise outweighs new signal.",
    response: "Merge duplicates into one validated keeper.",
  },
  {
    icon: History,
    title: "Stale Preference",
    memory: ['Old: "prefers us-east-1"', 'New: "migrated to eu-west-1"'],
    risk: "Agent answers with a stale deployment region.",
    response: "Route the old memory to review.",
  },
  {
    icon: GitFork,
    title: "Conflicting Facts",
    memory: ['"Switched to Valkey"', '"User prefers Redis"'],
    risk: "The model can't tell which fact is current.",
    response: "Flag the conflict and queue resolution.",
  },
  {
    icon: ShieldAlert,
    title: "Unsafe Cleanup",
    memory: ["merge(A, B) -> ?", "no keeper validated"],
    risk: "Blind merges destroy real signal permanently.",
    response: "Block the path with an integrity blocker.",
  },
]

export function ProblemSection() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="The problem"
          title="Agent memory gets worse over time."
          description="Long-running agents accumulate memory debt. Without governance, that debt reaches the model on every call."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="flex flex-col border border-border-subtle bg-surface transition-colors hover:border-primary/30"
              style={{ borderRadius: "var(--radius-md)" }}
            >
              <div className="flex items-center gap-2.5 border-b border-border-subtle px-4 py-3">
                <p.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Memory
                  </span>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {p.memory.map((line, i) => (
                      <li
                        key={i}
                        className="truncate border border-border-subtle bg-muted px-2.5 py-1.5 font-mono text-xs leading-relaxed text-[color:#8f9ba5]"
                        style={{ borderRadius: "var(--radius-sm)" }}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:#9aa3b5]">
                    Risk
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.risk}</p>
                </div>

                <div className="mt-auto border-t border-border-subtle pt-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--electric)]">
                    Mem-D
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-foreground">{p.response}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
