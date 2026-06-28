import { BrainCircuit, Github } from "lucide-react"

const GITHUB_URL = "https://github.com/2Cloud-S/mem-d"

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/40 bg-primary/15">
            <BrainCircuit className="h-4 w-4 text-[color:var(--electric)]" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm text-foreground">Mem-D</span>
          <span className="text-sm text-muted-foreground">Memory governance for AI agents.</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="#top"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            Source
          </a>
        </div>
      </div>
    </footer>
  )
}
