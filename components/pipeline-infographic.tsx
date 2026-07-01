import {
  Download,
  ScanSearch,
  ListChecks,
  FlaskConical,
  Workflow,
  ShieldCheck,
} from "lucide-react"

const steps = [
  {
    icon: Download,
    name: "Ingest",
    body: "Accept memory records, exports, and agent stores.",
  },
  {
    icon: ScanSearch,
    name: "Audit",
    body: "Detect duplicates, stale facts, unknowns, and conflicts.",
  },
  {
    icon: ListChecks,
    name: "Recommend",
    body: "Propose merge, archive, review, or keep per memory.",
  },
  {
    icon: FlaskConical,
    name: "Simulate",
    body: "Predict the outcome without mutating anything.",
  },
  {
    icon: Workflow,
    name: "Plan",
    body: "Create workflow queues, ordering, and safety blockers.",
  },
  {
    icon: ShieldCheck,
    name: "Governed Context",
    body: "Pass safer memory to an agent or LLM.",
  },
]

/**
 * Thin animated connector line between pipeline modules.
 * Deterministic dash-flow, clipped inside its own box.
 */
function Connector({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      className={
        vertical
          ? "flex h-6 items-center justify-center overflow-hidden md:hidden"
          : "hidden flex-1 items-center overflow-hidden md:flex"
      }
      aria-hidden="true"
    >
      <svg
        className={vertical ? "h-full w-px" : "h-px w-full"}
        preserveAspectRatio="none"
        viewBox={vertical ? "0 0 1 24" : "0 0 100 1"}
      >
        <line
          x1={vertical ? 0.5 : 0}
          y1={vertical ? 0 : 0.5}
          x2={vertical ? 0.5 : 100}
          y2={vertical ? 24 : 0.5}
          stroke="var(--primary)"
          strokeOpacity="0.55"
          strokeWidth={vertical ? 1 : 1}
          className="mem-dash-flow"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

export function PipelineInfographic() {
  return (
    <div
      className="overflow-hidden border border-border-subtle bg-surface p-4 sm:p-6"
      style={{ borderRadius: "var(--radius-lg)" }}
    >
      <ol className="flex flex-col md:flex-row md:items-stretch md:gap-0">
        {steps.map((step, i) => (
          <li key={step.name} className="contents">
            <div
              className="flex flex-col border border-border-subtle bg-muted p-3.5 md:w-[15%] md:flex-1"
              style={{ borderRadius: "var(--radius-md)" }}
            >
              <div className="mb-2.5 flex items-center justify-between">
                <span
                  className="flex h-7 w-7 items-center justify-center border border-primary/30 bg-primary/10"
                  style={{ borderRadius: "var(--radius-sm)" }}
                >
                  <step.icon className="h-3.5 w-3.5 text-[color:var(--electric)]" aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-[13px] font-semibold leading-snug text-foreground">
                {step.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
            {i < steps.length - 1 ? (
              <>
                <Connector />
                <Connector vertical />
              </>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-4 border-t border-border-subtle pt-3.5 text-center font-mono text-xs tracking-tight text-muted-foreground">
        Mem-D plans memory maintenance before anything changes.
      </p>
    </div>
  )
}
