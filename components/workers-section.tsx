import {
  MessagesSquare,
  Bot,
  Boxes,
  Plug,
  FileJson,
  Footprints,
  Users,
  LifeBuoy,
  Layers,
} from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { WorkerRoutingGraphic } from "@/components/worker-routing-graphic"

const workers = [
  { icon: MessagesSquare, name: "Claude Export Worker" },
  { icon: Bot, name: "ChatGPT Export Worker" },
  { icon: FileJson, name: "JSON Memory Worker" },
  { icon: Plug, name: "MCP Memory Worker" },
  { icon: Boxes, name: "LangChain Memory Worker" },
  { icon: Users, name: "CRM Memory Worker" },
  { icon: LifeBuoy, name: "Support Memory Worker" },
  { icon: Footprints, name: "Agent Trace Worker" },
]

export function WorkersSection() {
  return (
    <section id="workers" className="border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Workers / connectors"
          title="Adapters in. Governance stays in the core."
          description="Mem-D workers normalize external memory sources into a governable format — they adapt, they never execute."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workers.map((w) => (
            <div
              key={w.name}
              className="flex items-center gap-3 border border-border-subtle bg-surface p-3.5 transition-colors hover:border-primary/30"
              style={{ borderRadius: "var(--radius-md)" }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center border border-border-subtle bg-surface-2"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                <w.icon className="h-4 w-4 text-primary" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-foreground">{w.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <WorkerRoutingGraphic />
        </div>

        <div
          className="mt-6 flex items-start gap-3 border border-border-subtle bg-surface px-4 py-3.5"
          style={{ borderRadius: "var(--radius-md)" }}
        >
          <Layers className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            <span className="text-foreground">Workers adapt memory sources.</span> Mem-D remains
            the governance core. No worker mutates or executes anything.
          </p>
        </div>
      </div>
    </section>
  )
}
