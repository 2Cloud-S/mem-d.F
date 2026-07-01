import { Terminal } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { CopyButton } from "@/components/ui/copy-button"
import { Pill } from "@/components/ui/pill"

const commands = [
  { label: "Install", code: "pip install mem-d" },
  {
    label: "Analyze (Markdown report)",
    code: "python -m memd analyze memories.json --format markdown --output report.md",
  },
  {
    label: "Analyze (JSON report)",
    code: "python -m memd analyze memories.json --format json --output report.json",
  },
  {
    label: "Run the workflow evaluation",
    code: "python scripts/run_workflow_evaluation.py",
  },
]

const pseudoCode = `from memd import analyze
from memd.context import build_memory_context

report = analyze("memories.json")
context = build_memory_context(
    report,
    query="What should the agent remember?",
)`

function CommandRow({ label, code }: { label: string; code: string }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-background">
      <div className="flex items-center justify-between border-b border-border-subtle px-3 py-2">
        <span className="font-mono text-xs text-muted-foreground">{label}</span>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto px-3 py-2.5">
        <code className="font-mono text-[13px] text-foreground">
          <span className="select-none text-primary">$ </span>
          {code}
        </code>
      </pre>
    </div>
  )
}

export function QuickstartSection() {
  return (
    <section id="quickstart" className="border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Developer quickstart"
          title="Run Mem-D against your memory in minutes."
          description="Point Mem-D at a memory file and get an explainable report and workflow plan. No backend required to try it."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-foreground">CLI</span>
            </div>
            {commands.map((cmd) => (
              <CommandRow key={cmd.label} label={cmd.label} code={cmd.code} />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">Python</span>
              </div>
              <Pill variant="review">Demo API concept</Pill>
            </div>
            <div className="overflow-hidden rounded-lg border border-border-subtle bg-background">
              <div className="flex items-center justify-between border-b border-border-subtle px-3 py-2">
                <span className="font-mono text-xs text-muted-foreground">build_memory_context.py</span>
                <CopyButton value={pseudoCode} />
              </div>
              <pre className="overflow-x-auto px-4 py-3.5">
                <code className="font-mono text-[13px] leading-relaxed text-foreground whitespace-pre">
                  {pseudoCode}
                </code>
              </pre>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              The context API above is a demo concept illustrating the intended governed-context
              flow. The CLI analysis commands are the supported entry point today.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
