import { ArrowRight, BookOpen, Github } from "lucide-react"

const GITHUB_URL = "https://github.com/2Cloud-S/mem-d"

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle">
      <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Stop feeding agents broken memory.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Mem-D turns long-term memory into an auditable, reviewable, governed system before it
          reaches the model.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#demo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:#5a8cba] sm:w-auto"
          >
            View the demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border-subtle bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 sm:w-auto"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Read the docs
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border-subtle bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 sm:w-auto"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
