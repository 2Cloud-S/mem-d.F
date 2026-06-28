import { Copy, History, GitFork, ShieldAlert } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const problems = [
  {
    icon: Copy,
    title: "Duplicate memory",
    body: "The same fact gets stored over and over, inflating context and weighting old noise.",
    example: ["User prefers Redis", "User prefers Redis", "Likes Redis for caching"],
  },
  {
    icon: History,
    title: "Stale preferences",
    body: "Old user preferences override newer ones and quietly steer the agent wrong.",
    example: ["User prefers JavaScript", "User now uses TypeScript"],
  },
  {
    icon: GitFork,
    title: "Conflicting facts",
    body: "The agent sees incompatible state and has no way to know which one is current.",
    example: ["Switched to Valkey", "User prefers Redis"],
  },
  {
    icon: ShieldAlert,
    title: "Unsafe cleanup",
    body: "Deleting or merging memory without review breaks trust and loses real signal.",
    example: ["merge(A, B) -> ?", "no keeper validated"],
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-lg border border-border-subtle bg-surface p-5 transition-colors hover:border-primary/30"
            >
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle bg-surface-2">
                <p.icon className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <ul className="mt-4 flex flex-col gap-1 border-t border-border-subtle pt-4">
                {p.example.map((line, i) => (
                  <li
                    key={i}
                    className="truncate font-mono text-xs leading-relaxed text-[color:#7f8b95]"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
