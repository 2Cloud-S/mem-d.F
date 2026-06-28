"use client"

import { useState } from "react"
import { Github, Menu, X, BrainCircuit } from "lucide-react"
import { cn } from "@/lib/utils"

const GITHUB_URL = "https://github.com/2Cloud-S/mem-d"

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "Workers", href: "#workers" },
  { label: "Architecture", href: "#architecture" },
  { label: "Quickstart", href: "#quickstart" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/40 bg-primary/15">
            <BrainCircuit className="h-4.5 w-4.5 text-[color:var(--electric)]" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
            Mem-D
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md border border-border-subtle bg-surface px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href="#demo"
            className="inline-flex items-center rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:#5a8cba]"
          >
            Run the demo
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-muted-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn("border-t border-border-subtle md:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border-subtle bg-surface px-3 py-2 text-sm text-foreground"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              Run the demo
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
