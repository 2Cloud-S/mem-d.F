import { ArrowRight, ArrowDown, ShieldCheck, GitBranch, Ban, CircleAlert } from "lucide-react"
import { Pill } from "@/components/ui/pill"
import { HeroMemoryBackground } from "@/components/hero-memory-background"

const rawMemory = [
  "User prefers JavaScript",
  "User now uses TypeScript",
  "User dislikes semicolons",
  "User switched from Redis to Valkey",
  "User no longer uses Husky",
  "User plans PostgreSQL migration",
  "User prefers Redis",
  "TODO: remind user tomorrow",
]

const included = [
  "User uses TypeScript",
  "User prefers single quotes and no semicolons",
  "User switched from Redis to Valkey",
  "User plans PostgreSQL migration",
]

const review = [
  "Conflicting Redis vs Valkey memory",
  "Temporary TODO should not become permanent memory",
]

const blocked = ["Unsafe merge without keeper validation"]

function TerminalHeader({ label, tone }: { label: string; tone: "raw" | "governed" }) {
  return (
    <div className="flex items-center justify-between border-b border-border-subtle px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--blocked)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-steel/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--electric)]/60" />
      </div>
      <span className="font-mono text-xs tracking-tight text-muted-foreground">{label}</span>
      <Pill variant={tone === "raw" ? "blocked" : "primary"}>
        {tone === "raw" ? "unmanaged" : "governed"}
      </Pill>
    </div>
  )
}

export function HeroDemo() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border-subtle">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <HeroMemoryBackground />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Pill variant="primary" className="mb-5">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Memory governance for AI agents
          </Pill>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Give AI agents memory they can trust.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Mem-D audits, simulates, and plans memory maintenance before stale or conflicting
            memories reach your LLM.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:#5a8cba]"
            >
              Run the demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border-subtle bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
            >
              View architecture
            </a>
          </div>
        </div>

        {/* Split demo */}
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
          {/* Raw memory */}
          <div className="overflow-hidden rounded-lg border border-border-subtle bg-surface">
            <TerminalHeader label="raw_agent_memory.json" tone="raw" />
            <div className="p-4">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Raw agent memory
              </p>
              <ul className="flex flex-col gap-1.5">
                {rawMemory.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border-subtle bg-muted px-3 py-2 font-mono text-[13px] leading-snug text-[color:#aeb9c2]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--electric)]">
                Mem-D
              </span>
              <ArrowRight className="hidden h-5 w-5 text-[color:var(--electric)] lg:block" aria-hidden="true" />
              <ArrowDown className="h-5 w-5 text-[color:var(--electric)] lg:hidden" aria-hidden="true" />
            </div>
          </div>

          {/* Governed context */}
          <div className="overflow-hidden rounded-lg border border-primary/30 bg-surface">
            <TerminalHeader label="governed_context.json" tone="governed" />
            <div className="flex flex-col gap-4 p-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--electric)]" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--electric)]">
                    Included
                  </span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-[color:var(--safe)]/25 bg-[color:var(--safe)]/[0.06] px-3 py-1.5 font-mono text-[13px] leading-snug text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <CircleAlert className="h-3.5 w-3.5 text-steel" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-steel">
                    Review
                  </span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {review.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-steel/30 bg-steel/[0.07] px-3 py-1.5 font-mono text-[13px] leading-snug text-[color:#c4ccd1]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Ban className="h-3.5 w-3.5 text-[color:#9aa3b5]" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-[color:#9aa3b5]">
                    Blocked
                  </span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {blocked.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-[color:var(--blocked)]/40 bg-[color:var(--blocked)]/15 px-3 py-1.5 font-mono text-[13px] leading-snug text-[color:#aab3c4]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-3xl items-start gap-3 rounded-lg border border-border-subtle bg-surface px-4 py-3.5">
          <GitBranch className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            The agent answer improves because the model sees{" "}
            <span className="text-foreground">governed memory</span>, not raw memory debt.
          </p>
        </div>
      </div>
    </section>
  )
}
