import { Lock } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { PipelineInfographic } from "@/components/pipeline-infographic"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="A pipeline, not a delete button."
          description="Mem-D moves memory through explainable stages. Each stage is auditable and produces evidence for the next."
        />

        <div className="mt-10">
          <PipelineInfographic />
        </div>

        <div
          className="mt-6 flex items-start gap-3 border border-primary/30 bg-primary/[0.07] px-4 py-3.5"
          style={{ borderRadius: "var(--radius-md)" }}
        >
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--electric)]" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-foreground">
            No source memory is mutated by default. Mem-D produces explainable plans first.
          </p>
        </div>
      </div>
    </section>
  )
}
