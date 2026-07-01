import { Database, Plug, Cpu, FileOutput, Bot, ArrowDown, Layers } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const coreModules = [
  "Category Audit",
  "Duplicate Detection",
  "Lifecycle Analysis",
  "Recommendation Engine",
  "Simulation Engine",
  "Workflow Planner",
  "Evaluation Benchmarks",
]

const layers = [
  {
    icon: Database,
    title: "Memory Sources",
    items: ["Agent memory stores", "Chat exports", "CRM notes", "Support logs"],
    highlight: false,
  },
  {
    icon: Plug,
    title: "Workers / Normalizers",
    items: ["Source adapters", "Normalized memory format"],
    highlight: false,
  },
  {
    icon: Cpu,
    title: "Mem-D Core",
    items: coreModules,
    highlight: true,
  },
  {
    icon: FileOutput,
    title: "Reports + Workflow Plans + Governed Context",
    items: ["Reports", "Workflow plans", "Review queues", "Governed memory context"],
    highlight: false,
  },
  {
    icon: Bot,
    title: "Agent / LLM / MCP",
    items: ["Custom agents", "LLM apps", "MCP clients", "LangChain stacks"],
    highlight: false,
  },
]

export function ArchitectureSection() {
  return (
    <section id="architecture" className="border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Architecture"
          title="Middleware between memory and the model."
          description="Framework-independent. Mem-D governs the memory layer without owning your stack."
        />

        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-stretch">
          {layers.map((layer, i) => (
            <div key={layer.title} className="flex flex-col items-center">
              <div
                className={`w-full border p-4 sm:p-5 ${
                  layer.highlight
                    ? "border-primary/40 bg-primary/[0.07]"
                    : "border-border-subtle bg-surface"
                }`}
                style={{ borderRadius: "var(--radius-md)" }}
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className={`flex h-7 w-7 items-center justify-center border ${
                      layer.highlight
                        ? "border-primary/40 bg-primary/15"
                        : "border-border-subtle bg-surface-2"
                    }`}
                    style={{ borderRadius: "var(--radius-sm)" }}
                  >
                    <layer.icon
                      className={`h-4 w-4 ${layer.highlight ? "text-[color:var(--electric)]" : "text-primary"}`}
                      aria-hidden="true"
                    />
                  </span>
                  <h3
                    className={`text-sm font-semibold ${layer.highlight ? "text-[color:var(--electric)]" : "text-foreground"}`}
                  >
                    {layer.title}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="border border-border-subtle bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
                      style={{ borderRadius: "var(--radius-sm)" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {i < layers.length - 1 ? (
                <div className="flex h-8 items-center justify-center" aria-hidden="true">
                  <ArrowDown className="h-4 w-4 text-primary/60" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div
          className="mx-auto mt-8 flex max-w-3xl items-start gap-3 border border-border-subtle bg-surface px-4 py-3.5"
          style={{ borderRadius: "var(--radius-md)" }}
        >
          <Layers className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            No LangChain or sentence-transformers dependency required. Mem-D integrates beside
            LangChain, MCPs, custom agents, and LLM apps.
          </p>
        </div>
      </div>
    </section>
  )
}
