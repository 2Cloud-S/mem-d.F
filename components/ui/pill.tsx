import { cn } from "@/lib/utils"

type PillVariant = "safe" | "review" | "blocked" | "neutral" | "primary"

const variantStyles: Record<PillVariant, string> = {
  safe: "border-[color:var(--safe)]/40 bg-[color:var(--safe)]/10 text-[color:var(--electric)]",
  review: "border-steel/40 bg-steel/10 text-steel",
  blocked: "border-[color:var(--blocked)]/50 bg-[color:var(--blocked)]/15 text-[color:#aab3c4]",
  neutral: "border-border-subtle bg-surface-2 text-muted-foreground",
  primary: "border-primary/40 bg-primary/15 text-[color:var(--electric)]",
}

export function Pill({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode
  variant?: PillVariant
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
