import { Database, Cpu, FileOutput, ArrowRight, Layers } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const columns = [
  {
    icon: Database,
    title: "Memory sources",
    items: [
      "Agent memory stores",
      "Chat exports",
      "CRM notes",
      "Project docs",
      "Support logs",
    ],
  },
  {
    icon: Cpu,
    title: "Mem-D core",
    highlight: true,
    items: [
      "Parser",
      "Category audit",
      "Duplicate detection",
      "Lifecycle analysis",
      "Recommendation engine",
      "Simulation engine",
      "Workflow planner",
      "Evaluation benchmarks",
    ],
  },
  {
    icon: FileOutput,
    title: "Outputs",
    items: [
      "Reports",
      "Workflow plans",
      "Review queues",
      "Governed memory context",
      "Connector responses",
    ],
  },
]

export function ArchitectureSection() {
  return (
    <section id="architecture" className="border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Architecture"
          title="A governance core with clean boundaries."
          description="Framework-independent. No LangChain or sentence-transformers dependency required."
        />

        <div className="mt-10 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1.4fr_auto_1fr]">
          {columns.map((col, idx) => (
            <div key={col.title} className="contents">
              <div
                className={`flex flex-col rounded-lg border p-5 ${
                  col.highlight
                    ? "border-primary/40 bg-primary/[0.07]"
                    : "border-border-subtle bg-surface"
                }`}
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-md border ${
                      col.highlight
                        ? "border-primary/40 bg-primary/15"
                        : "border-border-subtle bg-surface-2"
                    }`}
                  >
                    <col.icon
                      className={`h-4 w-4 ${col.highlight ? "text-[color:var(--electric)]" : "text-primary"}`}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border-subtle bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {idx < columns.length - 1 ? (
                <div className="flex items-center justify-center py-1">
                  <ArrowRight
                    className="h-4 w-4 rotate-90 text-border-subtle lg:rotate-0"
                    aria-hidden="true"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-border-subtle bg-surface px-4 py-3.5">
          <Layers className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            Integrates beside LangChain, MCPs, custom agents, and LLM apps — Mem-D governs the
            memory layer without owning your stack.
          </p>
        </div>
      </div>
    </section>
  )
}
