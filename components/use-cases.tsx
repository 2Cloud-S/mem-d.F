import { Code2, Headset, UserRound, Building2, LineChart, FlaskConical } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const useCases = [
  {
    icon: Code2,
    title: "AI coding agents",
    body: "Prevent stale project memory from steering implementation decisions.",
  },
  {
    icon: Headset,
    title: "Customer support agents",
    body: "Govern customer preferences and account history before they drive replies.",
  },
  {
    icon: UserRound,
    title: "Personal AI memory",
    body: "Clean long-term assistant memory so older facts don't override new ones.",
  },
  {
    icon: Building2,
    title: "Enterprise copilots",
    body: "Audit memory before it affects decisions across teams and tools.",
  },
  {
    icon: LineChart,
    title: "CRM / sales agents",
    body: "Detect outdated customer facts and conflicting account state.",
  },
  {
    icon: FlaskConical,
    title: "Research agents",
    body: "Reduce duplicated and stale context across long investigations.",
  },
]

export function UseCases() {
  return (
    <section className="border-b border-border-subtle bg-surface/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Use cases"
          title="Wherever agents remember, memory drifts."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="flex flex-col rounded-lg border border-border-subtle bg-surface p-5 transition-colors hover:border-primary/30"
            >
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle bg-surface-2">
                <uc.icon className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-foreground">{uc.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{uc.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
