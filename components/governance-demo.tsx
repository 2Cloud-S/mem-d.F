"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  ShieldCheck,
  CircleAlert,
  Ban,
  MessageSquare,
  Sparkles,
  Play,
  RotateCcw,
  Search,
  ListChecks,
  FlaskConical,
  Workflow,
  FileText,
  Copy,
  Archive,
  GitMerge,
  Check,
} from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Pill } from "@/components/ui/pill"
import {
  scenarios,
  type GovernedStatus,
  type AuditLabel,
  type Recommendation,
  type WorkflowStatus,
} from "@/lib/scenarios"
import { cn } from "@/lib/utils"

type StepId = "raw" | "audit" | "recommend" | "simulate" | "workflow" | "governed" | "answer"

const STEPS: { id: StepId; n: string; label: string; icon: typeof Search }[] = [
  { id: "raw", n: "01", label: "Raw Memory", icon: FileText },
  { id: "audit", n: "02", label: "Audit", icon: Search },
  { id: "recommend", n: "03", label: "Recommend", icon: ListChecks },
  { id: "simulate", n: "04", label: "Simulate", icon: FlaskConical },
  { id: "workflow", n: "05", label: "Workflow", icon: Workflow },
  { id: "governed", n: "06", label: "Governed Context", icon: ShieldCheck },
  { id: "answer", n: "07", label: "Agent Answer", icon: MessageSquare },
]

const auditMeta: Record<AuditLabel, { label: string; pill: "safe" | "review" | "blocked" | "neutral" }> = {
  clean: { label: "clean", pill: "safe" },
  stale: { label: "stale", pill: "review" },
  conflict: { label: "conflict", pill: "review" },
  duplicate: { label: "duplicate", pill: "neutral" },
  sensitive: { label: "sensitive", pill: "blocked" },
}

const recMeta: Record<
  Recommendation,
  { label: string; pill: "safe" | "review" | "blocked" | "neutral" | "primary"; icon: typeof Check }
> = {
  keep: { label: "keep", pill: "safe", icon: Check },
  merge: { label: "merge", pill: "neutral", icon: GitMerge },
  archive: { label: "archive", pill: "neutral", icon: Archive },
  review: { label: "review", pill: "review", icon: CircleAlert },
  "add-context": { label: "add context", pill: "primary", icon: Copy },
  block: { label: "blocked", pill: "blocked", icon: Ban },
}

const governedMeta: Record<GovernedStatus, { label: string; icon: typeof ShieldCheck }> = {
  included: { label: "Included", icon: ShieldCheck },
  review: { label: "Review", icon: CircleAlert },
  blocked: { label: "Blocked", icon: Ban },
}

const workflowStatusMeta: Record<WorkflowStatus, { label: string; pill: "safe" | "review" | "blocked" }> = {
  clean: { label: "clean", pill: "safe" },
  requires_review: { label: "requires_review", pill: "review" },
  integrity_blocked: { label: "integrity_blocked", pill: "blocked" },
}

function StepStage({
  step,
  title,
  children,
  active,
  revealed,
}: {
  step: string
  title: string
  active: boolean
  revealed: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-surface p-4 transition-colors duration-300",
        active ? "border-primary/60 ring-1 ring-primary/30" : "border-border-subtle",
        !revealed && "opacity-45",
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.16em]",
            active ? "text-[color:var(--electric)]" : "text-primary",
          )}
        >
          {step}
        </span>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      {revealed ? (
        children
      ) : (
        <p className="text-xs text-muted-foreground">Run Mem-D or select this step to reveal this stage.</p>
      )}
    </div>
  )
}

export function GovernanceDemo() {
  const [activeId, setActiveId] = useState(scenarios[0].id)
  const [stepIndex, setStepIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const [useMemd, setUseMemd] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const scenario = scenarios.find((s) => s.id === activeId) ?? scenarios[0]

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const reset = useCallback(() => {
    clearTimers()
    setRunning(false)
    setStepIndex(0)
    setUseMemd(false)
  }, [clearTimers])

  const selectScenario = useCallback(
    (id: string) => {
      clearTimers()
      setRunning(false)
      setActiveId(id)
      setStepIndex(0)
      setUseMemd(false)
    },
    [clearTimers],
  )

  const run = useCallback(() => {
    clearTimers()
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    if (reduce) {
      setRunning(false)
      setStepIndex(STEPS.length - 1)
      setUseMemd(true)
      return
    }

    setRunning(true)
    setUseMemd(false)
    setStepIndex(0)

    const stepMs = 480
    for (let i = 1; i < STEPS.length; i++) {
      timers.current.push(
        setTimeout(() => {
          setStepIndex(i)
          if (STEPS[i].id === "answer") setUseMemd(true)
        }, stepMs * i),
      )
    }
    timers.current.push(
      setTimeout(() => setRunning(false), stepMs * STEPS.length),
    )
  }, [clearTimers])

  const activeStep = STEPS[stepIndex].id
  const isRevealed = (id: StepId) => STEPS.findIndex((s) => s.id === id) <= stepIndex

  const recCounts = scenario.memories.reduce<Record<string, number>>((acc, m) => {
    acc[m.recommendation] = (acc[m.recommendation] ?? 0) + 1
    return acc
  }, {})
  const actionsSummary = Object.entries(recCounts)
    .map(([k, v]) => `${v} ${recMeta[k as Recommendation].label}`)
    .join(", ")

  const wfStatus = workflowStatusMeta[scenario.workflowStatus]

  return (
    <section id="demo" className="border-b border-border-subtle bg-surface/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Interactive demo"
          title="Watch memory get governed before the model sees it."
          description="Mem-D audits memory, recommends actions, simulates outcomes, and builds a reviewable workflow plan, then passes only governed context to the agent. No source memory is mutated in this demo."
        />

        {/* Scenario switcher */}
        <div
          className="mt-8 inline-flex flex-wrap gap-1 rounded-lg border border-border-subtle bg-surface p-1"
          role="tablist"
          aria-label="Demo scenarios"
        >
          {scenarios.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === activeId}
              onClick={() => selectScenario(s.id)}
              className={cn(
                "rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors",
                s.id === activeId
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Question + controls */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 rounded-lg border border-border-subtle bg-background px-4 py-3.5">
            <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm text-foreground">
              <span className="text-muted-foreground">User asks:</span> {scenario.question}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={run}
              disabled={running}
              className={cn(
                "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity",
                running ? "opacity-60" : "hover:opacity-90",
              )}
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              {running ? "Running Mem-D..." : "Run Mem-D"}
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-md border border-border-subtle bg-surface px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        {/* Progress rail / stepper */}
        <ol
          className="mt-5 flex flex-wrap gap-1.5"
          aria-label="Mem-D pipeline steps"
        >
          {STEPS.map((s, i) => {
            const isActive = s.id === activeStep
            const isDone = i < stepIndex
            return (
              <li key={s.id}>
                <button
                  onClick={() => {
                    clearTimers()
                    setRunning(false)
                    setStepIndex(i)
                    if (s.id === "answer") setUseMemd(true)
                  }}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
                    isActive
                      ? "border-primary/60 bg-primary/15 text-[color:var(--electric)]"
                      : isDone
                        ? "border-border-subtle bg-surface-2 text-foreground"
                        : "border-border-subtle bg-surface text-muted-foreground hover:text-foreground",
                  )}
                >
                  <s.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="font-mono text-[10px]">{s.n}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              </li>
            )
          })}
        </ol>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_300px]">
          {/* Stage column */}
          <div className="flex flex-col gap-4">
            {/* 01 Raw memory */}
            <StepStage step="01" title="Raw memory" active={activeStep === "raw"} revealed={isRevealed("raw")}>
              <div className="relative overflow-hidden rounded-md">
                {(activeStep === "audit" || activeStep === "raw") && running && (
                  <div
                    className="mem-scanline pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[color:var(--electric)]/20 to-transparent"
                    aria-hidden="true"
                  />
                )}
                <ul className="flex flex-col gap-1.5">
                  {scenario.memories.map((m) => (
                    <li
                      key={m.id}
                      className="rounded-md border border-border-subtle bg-muted px-3 py-2 font-mono text-xs leading-snug text-[color:#aeb9c2]"
                    >
                      {m.text}
                      {m.meta && <span className="ml-1 text-[color:#6b7682]">({m.meta})</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </StepStage>

            {/* 02 Audit */}
            <StepStage step="02" title="Audit" active={activeStep === "audit"} revealed={isRevealed("audit")}>
              <p className="mb-3 text-xs text-muted-foreground">
                Mem-D audits memory before it reaches the model.
              </p>
              <ul className="flex flex-col gap-2">
                {scenario.memories.map((m) => {
                  const meta = auditMeta[m.audit]
                  return (
                    <li key={m.id} className="mem-reveal rounded-md border border-border-subtle bg-muted p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-mono text-xs text-foreground">{m.text}</span>
                        <Pill variant={meta.pill} className="shrink-0">
                          {meta.label}
                        </Pill>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{m.auditNote}</p>
                    </li>
                  )
                })}
              </ul>
            </StepStage>

            {/* 03 Recommend */}
            <StepStage
              step="03"
              title="Recommend"
              active={activeStep === "recommend"}
              revealed={isRevealed("recommend")}
            >
              <ul className="flex flex-col gap-2">
                {scenario.memories.map((m) => {
                  const meta = recMeta[m.recommendation]
                  return (
                    <li key={m.id} className="mem-reveal rounded-md border border-border-subtle bg-muted p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-mono text-xs text-foreground">{m.text}</span>
                        <Pill variant={meta.pill} className="shrink-0">
                          <meta.icon className="h-3 w-3" aria-hidden="true" />
                          {meta.label}
                        </Pill>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{m.recommendationNote}</p>
                    </li>
                  )
                })}
              </ul>
            </StepStage>

            {/* 04 Simulate */}
            <StepStage
              step="04"
              title="Simulate"
              active={activeStep === "simulate"}
              revealed={isRevealed("simulate")}
            >
              <p className="mb-3 text-xs text-muted-foreground">
                Mem-D simulates outcomes before any change is applied. If applied:
              </p>
              <ul className="flex flex-col gap-1.5">
                {scenario.simulation.map((line, i) => (
                  <li
                    key={i}
                    className="mem-reveal flex items-start gap-2 rounded-md border border-border-subtle bg-muted px-3 py-2 text-xs leading-relaxed text-foreground"
                  >
                    <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-steel" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:#6b7682]">
                No source memory is mutated in this demo.
              </p>
            </StepStage>

            {/* 05 Workflow */}
            <StepStage
              step="05"
              title="Workflow plan"
              active={activeStep === "workflow"}
              revealed={isRevealed("workflow")}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Workflow status</span>
                <Pill variant={wfStatus.pill}>{wfStatus.label}</Pill>
              </div>
              <ul className="flex flex-col gap-1.5">
                {scenario.workflow.map((w, i) => {
                  const meta = recMeta[w.action]
                  return (
                    <li
                      key={i}
                      className="mem-reveal flex items-center justify-between gap-2 rounded-md border border-border-subtle bg-muted px-3 py-2"
                    >
                      <span className="truncate font-mono text-xs text-foreground">{w.label}</span>
                      <Pill variant={meta.pill} className="shrink-0">
                        {meta.label}
                      </Pill>
                    </li>
                  )
                })}
              </ul>
            </StepStage>

            {/* 06 Governed context */}
            <StepStage
              step="06"
              title="Governed context"
              active={activeStep === "governed"}
              revealed={isRevealed("governed")}
            >
              <p className="mb-3 text-xs text-muted-foreground">Mem-D passes governed context to the agent.</p>
              <div className="flex flex-col gap-3">
                {(["included", "review", "blocked"] as GovernedStatus[]).map((key) => {
                  const meta = governedMeta[key]
                  const items = scenario.memories.filter((m) => m.governed === key)
                  if (items.length === 0) return null
                  return (
                    <div key={key}>
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <meta.icon
                          className={cn(
                            "h-3.5 w-3.5",
                            key === "included" && "text-[color:var(--electric)]",
                            key === "review" && "text-steel",
                            key === "blocked" && "text-[color:#9aa3b5]",
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            "font-mono text-[10px] uppercase tracking-[0.16em]",
                            key === "included" && "text-[color:var(--electric)]",
                            key === "review" && "text-steel",
                            key === "blocked" && "text-[color:#9aa3b5]",
                          )}
                        >
                          {meta.label}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {items.map((m) => (
                          <li
                            key={m.id}
                            className={cn(
                              "mem-reveal rounded-md border px-3 py-1.5 font-mono text-xs leading-snug",
                              key === "included" &&
                                "border-[color:var(--safe)]/25 bg-[color:var(--safe)]/[0.06] text-foreground",
                              key === "review" && "border-steel/30 bg-steel/[0.07] text-[color:#c4ccd1]",
                              key === "blocked" &&
                                "border-[color:var(--blocked)]/40 bg-[color:var(--blocked)]/15 text-[color:#aab3c4]",
                            )}
                          >
                            {m.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </StepStage>

            {/* 07 Agent answer */}
            <StepStage
              step="07"
              title="Agent answer"
              active={activeStep === "answer"}
              revealed={isRevealed("answer")}
            >
              <div
                className="mb-3 inline-flex gap-1 rounded-lg border border-border-subtle bg-background p-1"
                role="group"
                aria-label="Answer source"
              >
                <button
                  onClick={() => setUseMemd(false)}
                  aria-pressed={!useMemd}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    !useMemd ? "bg-[color:var(--blocked)]/30 text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Baseline
                </button>
                <button
                  onClick={() => setUseMemd(true)}
                  aria-pressed={useMemd}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    useMemd ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Mem-D governed
                </button>
              </div>

              <div
                key={`${scenario.id}-${useMemd}`}
                className="mem-reveal rounded-md border border-border-subtle bg-background p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Pill variant={useMemd ? "primary" : "blocked"}>
                    {useMemd ? "Governed memory" : "Raw memory"}
                  </Pill>
                  <span className="text-xs text-muted-foreground">
                    {useMemd ? scenario.memdNote : scenario.baselineNote}
                  </span>
                </div>
                <p className="text-pretty text-sm leading-relaxed text-foreground">
                  {useMemd ? scenario.memdAnswer : scenario.baselineAnswer}
                </p>
              </div>
            </StepStage>
          </div>

          {/* Mem-D report (sticky context) */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-lg border border-primary/30 bg-surface p-4">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[color:var(--electric)]" aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground">Mem-D report</span>
              </div>
              <dl className="flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-muted-foreground">Memories analyzed</dt>
                  <dd className="font-mono text-foreground">{scenario.memories.length}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">Actions</dt>
                  <dd className="font-mono text-foreground">{actionsSummary}</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-muted-foreground">Workflow status</dt>
                  <dd>
                    <Pill variant={wfStatus.pill}>{wfStatus.label}</Pill>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-muted-foreground">Safety blockers</dt>
                  <dd
                    className={cn(
                      "font-mono",
                      scenario.safetyBlockers > 0 ? "text-[color:#c7b8a0]" : "text-foreground",
                    )}
                  >
                    {scenario.safetyBlockers}
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">Context passed to agent</dt>
                  <dd className="font-mono text-foreground">{scenario.contextPassed}</dd>
                </div>
                {scenario.reportExtra && (
                  <div className="flex items-center justify-between gap-2 border-t border-border-subtle pt-2.5">
                    <dt className="text-muted-foreground">{scenario.reportExtra.split(":")[0]}</dt>
                    <dd className="font-mono text-foreground">{scenario.reportExtra.split(":")[1]?.trim()}</dd>
                  </div>
                )}
              </dl>
            </div>
            <p className="mt-3 px-1 text-[11px] leading-relaxed text-muted-foreground">
              Mem-D creates reviewable workflow plans. No source memory is mutated.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
