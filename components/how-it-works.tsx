import {
  Download,
  ScanSearch,
  ListChecks,
  FlaskConical,
  Workflow,
  ShieldCheck,
  ArrowRight,
  Lock,
} from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const steps = [
  {
    icon: Download,
    name: "Ingest",
    body: "Accepts memory records, exports, and agent stores.",
  },
  {
    icon: ScanSearch,
    name: "Audit",
    body: "Detects categories, duplicates, and lifecycle issues.",
  },
  {
    icon: ListChecks,
    name: "Recommend",
    body: "Proposes merge, archive, review, or keep per memory.",
  },
  {
    icon: FlaskConical,
    name: "Simulate",
    body: "Predicts structural outcome without mutating anything.",
  },
  {
    icon: Workflow,
    name: "Plan",
    body: "Creates workflow queues, ordering, and safety blockers.",
  },
  {
    icon: ShieldCheck,
    name: "Governed context",
    body: "Passes safer memory to an agent or LLM.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="A pipeline, not a delete button."
          description="Mem-D moves memory through explainable stages. Each stage is auditable and produces evidence for the next."
        />

        <div className="mt-10 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, i) => (
            <div key={step.name} className="relative">
              <div className="flex h-full flex-col rounded-lg border border-border-subtle bg-surface p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
                    <step.icon className="h-4 w-4 text-[color:var(--electric)]" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{step.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
              {i < steps.length - 1 ? (
                <ArrowRight
                  className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-border-subtle lg:block"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/[0.07] px-4 py-3.5">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--electric)]" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-foreground">
            Mem-D does not mutate memory by default. It produces explainable plans first.
          </p>
        </div>
      </div>
    </section>
  )
}
