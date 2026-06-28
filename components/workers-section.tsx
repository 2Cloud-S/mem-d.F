import {
  MessagesSquare,
  Bot,
  Boxes,
  Plug,
  FileJson,
  Footprints,
  Users,
  LifeBuoy,
  ArrowRight,
} from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const workers = [
  { icon: MessagesSquare, name: "Claude Export Worker" },
  { icon: Bot, name: "ChatGPT Export Worker" },
  { icon: Boxes, name: "LangChain Memory Worker" },
  { icon: Plug, name: "MCP Memory Worker" },
  { icon: FileJson, name: "JSON Memory Worker" },
  { icon: Footprints, name: "Agent Trace Worker" },
  { icon: Users, name: "CRM Memory Worker" },
  { icon: LifeBuoy, name: "Support Memory Worker" },
]

const flow = ["Workers", "Normalized memory", "Mem-D core", "Governed context", "Agent / LLM / MCP"]

export function WorkersSection() {
  return (
    <section id="workers" className="border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Workers / connectors"
          title="Connect memory from anywhere."
          description="Mem-D workers normalize external memory into a governable format. Workers are adapters — Mem-D remains the governance core."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workers.map((w) => (
            <div
              key={w.name}
              className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface p-4 transition-colors hover:border-primary/30"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-surface-2">
                <w.icon className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-foreground">{w.name}</span>
            </div>
          ))}
        </div>

        {/* Flow diagram */}
        <div className="mt-8 overflow-hidden rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:justify-between">
            {flow.map((node, i) => (
              <div key={node} className="flex items-center gap-3 lg:flex-1">
                <div
                  className={`flex flex-1 items-center justify-center rounded-md border px-3 py-3 text-center font-mono text-xs ${
                    node === "Mem-D core"
                      ? "border-primary/40 bg-primary/10 text-[color:var(--electric)]"
                      : "border-border-subtle bg-muted text-muted-foreground"
                  }`}
                >
                  {node}
                </div>
                {i < flow.length - 1 ? (
                  <ArrowRight
                    className="hidden h-4 w-4 shrink-0 text-border-subtle lg:block"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
