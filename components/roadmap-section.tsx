"use client"

import { useState } from "react"
import { Check, Circle, ChevronDown, Lock, ShieldAlert } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Pill } from "@/components/ui/pill"
import { cn } from "@/lib/utils"

const completed = [
  { tag: "V0.5", label: "Benchmark foundation" },
  { tag: "V0.6", label: "Recommendation evaluation" },
  { tag: "V0.7", label: "Simulation evaluation" },
  { tag: "V0.8", label: "Workflow planning + evaluation" },
]

const next = [
  { tag: "V0.9", label: "Action architecture" },
  { tag: "—", label: "Connectors / workers" },
  { tag: "—", label: "Agent integrations" },
]

export function RoadmapSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="border-b border-border-subtle bg-surface/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Roadmap"
          title="Planning is done. Execution stays gated."
          description="Mem-D ships planning and evaluation today. Execution remains intentionally gated behind a future, separately reviewed release."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {/* Completed */}
          <div className="rounded-lg border border-border-subtle bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Completed</h3>
              <Pill variant="safe">Shipped</Pill>
            </div>
            <ul className="flex flex-col gap-2">
              {completed.map((item) => (
                <li
                  key={item.tag}
                  className="flex items-center gap-3 rounded-md border border-border-subtle bg-muted px-3 py-2.5"
                >
                  <Check className="h-4 w-4 shrink-0 text-[color:var(--electric)]" aria-hidden="true" />
                  <span className="font-mono text-xs text-primary">{item.tag}</span>
                  <span className="text-sm text-foreground">{item.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 rounded-md border border-primary/30 bg-primary/[0.07] px-3 py-2.5">
              <span className="text-xs font-medium text-[color:var(--electric)]">
                Current demo layer:
              </span>{" "}
              <span className="text-xs text-foreground">Governed memory context for agents</span>
            </div>
          </div>

          {/* Next */}
          <div className="rounded-lg border border-border-subtle bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Next</h3>
              <Pill variant="review">Planned</Pill>
            </div>
            <ul className="flex flex-col gap-2">
              {next.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 rounded-md border border-border-subtle bg-muted px-3 py-2.5"
                >
                  <Circle className="h-4 w-4 shrink-0 text-steel" aria-hidden="true" />
                  <span className="font-mono text-xs text-muted-foreground">{item.tag}</span>
                  <span className="text-sm text-foreground">{item.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 rounded-md border border-border-subtle bg-muted px-3 py-2.5">
              <Lock className="h-4 w-4 shrink-0 text-steel" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">
                Execution remains intentionally gated.
              </span>
            </div>
          </div>
        </div>

        {/* Expandable safety blocker */}
        <div className="mt-4 overflow-hidden rounded-lg border border-border-subtle bg-surface">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
          >
            <span className="flex items-center gap-3">
              <ShieldAlert className="h-4 w-4 shrink-0 text-steel" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">
                What does a safety blocker actually do?
              </span>
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                open && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
          <div className={cn("border-t border-border-subtle", open ? "block" : "hidden")}>
            <div className="flex flex-col gap-3 px-4 py-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                A blocker marks a workflow item as non-executable and keeps it visible. Workflow
                approval cannot override it. Common blockers include:
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  ["INPUT_INTEGRITY", "Upstream inputs changed or don't match — plan is integrity-blocked."],
                  ["MISSING_KEEPER", "A merge has no validated keeper, so the merge can't proceed."],
                  ["ORPHAN_MERGE_NO_KEEPER", "An orphan merge would drop memory without a survivor."],
                  ["POLICY_BLOCKED", "Policy marks the action as not permitted for execution."],
                ].map(([code, desc]) => (
                  <li
                    key={code}
                    className="rounded-md border border-border-subtle bg-muted px-3 py-2.5"
                  >
                    <span className="font-mono text-xs text-[color:#aab3c4]">{code}</span>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                  </li>
                ))}
              </ul>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Blocked items remain blocked even if adjacent items are approved. Nothing is
                executed and no source memory is mutated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
