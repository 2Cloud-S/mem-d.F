import { ShieldCheck, Info } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { EvidencePanel } from "@/components/evidence-panel"

export function ValidationSection() {
  return (
    <section className="border-b border-border-subtle bg-surface/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Real-world validation"
          title="Evidence, not marketing claims."
          description="A real Claude export was converted into memory candidates and analyzed end-to-end. Mem-D found duplicate pressure, generated workflow plans, and blocked unsafe paths instead of mutating source memory."
        />

        <div className="mt-10">
          <EvidencePanel />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div
            className="flex items-start gap-3 border border-primary/30 bg-primary/[0.07] px-4 py-3.5"
            style={{ borderRadius: "var(--radius-md)" }}
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--electric)]" aria-hidden="true" />
            <p className="text-pretty text-sm leading-relaxed text-foreground">
              <span className="font-mono text-xs">integrity_blocked</span> is a safety-positive
              outcome, not a system failure. The blocker stopped an unsafe path before any source
              memory was mutated.
            </p>
          </div>
          <div
            className="flex items-start gap-3 border border-border-subtle bg-surface px-4 py-3.5"
            style={{ borderRadius: "var(--radius-md)" }}
          >
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
