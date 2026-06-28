"use client"

import { useState } from "react"
import {
  ShieldCheck,
  CircleAlert,
  Ban,
  MessageSquare,
  Sparkles,
  ArrowDown,
} from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Pill } from "@/components/ui/pill"
import { scenarios, type GovernedStatus } from "@/lib/scenarios"
import { cn } from "@/lib/utils"

const statusMeta: Record<
  GovernedStatus,
  { label: string; pill: "safe" | "review" | "blocked"; icon: typeof ShieldCheck }
> = {
  included: { label: "Included", pill: "safe", icon: ShieldCheck },
  review: { label: "Review", pill: "review", icon: CircleAlert },
  blocked: { label: "Blocked", pill: "blocked", icon: Ban },
}

function PanelTitle({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">{step}</span>
      <span className="text-sm font-semibold text-foreground">{title}</span>
    </div>
  )
}

export function GovernanceDemo() {
  const [activeId, setActiveId] = useState(scenarios[0].id)
  const [useMemd, setUseMemd] = useState(true)
  const scenario = scenarios.find((s) => s.id === activeId) ?? scenarios[0]

  return (
    <section id="demo" className="border-b border-border-subtle bg-surface/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Interactive demo"
          title="See governance change the answer."
          description="Pick a scenario. Watch raw memory become governed context, then toggle how the agent responds with and without Mem-D."
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
              onClick={() => setActiveId(s.id)}
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

        {/* Question */}
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-border-subtle bg-background px-4 py-3.5">
          <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm text-foreground">
            <span className="text-muted-foreground">User asks:</span> {scenario.question}
          </p>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {/* Raw memory */}
          <div className="rounded-lg border border-border-subtle bg-surface p-4">
            <PanelTitle step="01" title="Raw memory" />
            <ul className="flex flex-col gap-1.5">
              {scenario.rawMemory.map((m, i) => (
                <li
                  key={i}
                  className="rounded-md border border-border-subtle bg-muted px-3 py-2 font-mono text-xs leading-snug text-[color:#aeb9c2]"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Analysis */}
          <div className="rounded-lg border border-border-subtle bg-surface p-4">
            <PanelTitle step="02" title="Mem-D analysis" />
            <ul className="flex flex-col gap-2">
              {scenario.analysis.map((row, i) => {
                const meta = statusMeta[row.status]
                return (
                  <li key={i} className="rounded-md border border-border-subtle bg-muted p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-xs text-foreground">{row.memory}</span>
                      <Pill variant={meta.pill} className="shrink-0">
                        {row.action}
                      </Pill>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{row.note}</p>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Governed context */}
          <div className="rounded-lg border border-primary/30 bg-surface p-4">
            <PanelTitle step="03" title="Governed context" />
            <div className="flex flex-col gap-3">
              {(["included", "review", "blocked"] as GovernedStatus[]).map((key) => {
                const meta = statusMeta[key]
                const items = scenario.governedContext[key]
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
                      {items.map((item, i) => (
                        <li
                          key={i}
                          className={cn(
                            "rounded-md border px-3 py-1.5 font-mono text-xs leading-snug",
                            key === "included" &&
                              "border-[color:var(--safe)]/25 bg-[color:var(--safe)]/[0.06] text-foreground",
                            key === "review" &&
                              "border-steel/30 bg-steel/[0.07] text-[color:#c4ccd1]",
                            key === "blocked" &&
                              "border-[color:var(--blocked)]/40 bg-[color:var(--blocked)]/15 text-[color:#aab3c4]",
                          )}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="my-4 flex justify-center">
          <ArrowDown className="h-5 w-5 text-border-subtle" aria-hidden="true" />
        </div>

        {/* Answer comparison */}
        <div className="rounded-lg border border-border-subtle bg-surface p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <PanelTitle step="04" title="Agent answer" />
            <div
              className="inline-flex gap-1 rounded-lg border border-border-subtle bg-background p-1"
              role="group"
              aria-label="Answer source"
            >
              <button
                onClick={() => setUseMemd(false)}
                aria-pressed={!useMemd}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  !useMemd
                    ? "bg-[color:var(--blocked)]/30 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Baseline
              </button>
              <button
                onClick={() => setUseMemd(true)}
                aria-pressed={useMemd}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  useMemd
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Mem-D governed
              </button>
            </div>
          </div>

          <div
            key={`${scenario.id}-${useMemd}`}
            className="animate-fade-up mt-3 rounded-md border border-border-subtle bg-background p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <Pill variant={useMemd ? "primary" : "blocked"}>
                {useMemd ? "Governed memory" : "Raw memory"}
              </Pill>
              {useMemd ? (
                <span className="text-xs text-muted-foreground">conflicts flagged, no blind merge</span>
              ) : (
                <span className="text-xs text-muted-foreground">stale + conflicting context</span>
              )}
            </div>
            <p className="text-pretty text-sm leading-relaxed text-foreground">
              {useMemd ? scenario.memdAnswer : scenario.baselineAnswer}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
