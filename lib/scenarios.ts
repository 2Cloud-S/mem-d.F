export type GovernedStatus = "included" | "review" | "blocked"
export type AuditLabel = "clean" | "stale" | "conflict" | "duplicate" | "sensitive"
export type Recommendation = "keep" | "merge" | "archive" | "review" | "add-context" | "block"
export type WorkflowStatus = "clean" | "requires_review" | "integrity_blocked"

export type Memory = {
  id: string
  text: string
  meta?: string
  audit: AuditLabel
  auditNote: string
  recommendation: Recommendation
  recommendationNote: string
  governed: GovernedStatus
}

export type WorkflowItem = {
  label: string
  action: Recommendation
}

export type Scenario = {
  id: string
  label: string
  question: string
  memories: Memory[]
  simulation: string[]
  workflowStatus: WorkflowStatus
  workflow: WorkflowItem[]
  safetyBlockers: number
  contextPassed: string
  reportExtra?: string
  baselineAnswer: string
  memdAnswer: string
  baselineNote: string
  memdNote: string
}

export const scenarios: Scenario[] = [
  {
    id: "stale-preference",
    label: "Stale preference",
    question: "What stack should you use for my new API service?",
    memories: [
      {
        id: "m1",
        text: "User prefers TypeScript for all backend services.",
        meta: "12 days ago",
        audit: "clean",
        auditNote: "Consistent with recent activity. No conflicts detected.",
        recommendation: "keep",
        recommendationNote: "High-confidence, current preference. Safe to use as context.",
        governed: "included",
      },
      {
        id: "m2",
        text: "User's default database is PostgreSQL on Neon.",
        meta: "8 days ago",
        audit: "clean",
        auditNote: "Reinforced by repeated usage. Trusted.",
        recommendation: "keep",
        recommendationNote: "Stable infrastructure preference. Include as context.",
        governed: "included",
      },
      {
        id: "m3",
        text: "User wants to standardize all services on Express + JavaScript.",
        meta: "11 months ago",
        audit: "stale",
        auditNote: "Contradicts newer TypeScript preference. Likely outdated.",
        recommendation: "review",
        recommendationNote: "Flag for review instead of silently using a stale directive.",
        governed: "review",
      },
      {
        id: "m4",
        text: "User prefers TS for backend (typed everywhere).",
        meta: "6 days ago",
        audit: "duplicate",
        auditNote: "Near-duplicate of m1. Adds noise without new signal.",
        recommendation: "merge",
        recommendationNote: "Merge into m1 to keep a single canonical preference.",
        governed: "included",
      },
    ],
    simulation: [
      "Keeping m1 + m2 raises answer confidence and avoids stack contradictions.",
      "Merging m4 into m1 removes a duplicate without losing any signal.",
      "Routing m3 to review prevents an 11-month-old directive from overriding current preferences.",
    ],
    workflowStatus: "requires_review",
    workflow: [
      { label: "Keep m1 (TypeScript preference)", action: "keep" },
      { label: "Keep m2 (Neon PostgreSQL)", action: "keep" },
      { label: "Merge m4 → m1", action: "merge" },
      { label: "Open review task for m3 (stale Express directive)", action: "review" },
    ],
    safetyBlockers: 0,
    contextPassed: "2 included, 1 review, 0 blocked",
    reportExtra: "Duplicates merged: 1",
    baselineAnswer:
      "Use Express with JavaScript and standardize all services on it, per your stated preference. PostgreSQL works fine as the database.",
    memdAnswer:
      "Use TypeScript with PostgreSQL on Neon, matching your current backend preferences. Note: an older memory says to standardize on Express + JavaScript, but it conflicts with your recent TypeScript usage, so I've flagged it for review rather than acting on it.",
    baselineNote: "Pulled a stale directive verbatim",
    memdNote: "Used current context, surfaced the conflict",
  },
  {
    id: "conflicting-facts",
    label: "Conflicting facts",
    question: "What timezone should you schedule my standups in?",
    memories: [
      {
        id: "c1",
        text: "User is based in Lisbon (WET/WEST).",
        meta: "3 days ago",
        audit: "clean",
        auditNote: "Matches recent calendar and location signals.",
        recommendation: "keep",
        recommendationNote: "Current, corroborated location. Use as context.",
        governed: "included",
      },
      {
        id: "c2",
        text: "User is based in New York (ET).",
        meta: "7 months ago",
        audit: "conflict",
        auditNote: "Directly conflicts with newer Lisbon location.",
        recommendation: "archive",
        recommendationNote: "Superseded by c1. Archive instead of mixing timezones.",
        governed: "review",
      },
      {
        id: "c3",
        text: "User prefers standups before 10:00 local time.",
        meta: "5 days ago",
        audit: "clean",
        auditNote: "Stable scheduling preference. No conflicts.",
        recommendation: "keep",
        recommendationNote: "Include to anchor the suggested time window.",
        governed: "included",
      },
    ],
    simulation: [
      "Using c1 + c3 produces a single coherent timezone and time window.",
      "Archiving c2 prevents a 7-month-old location from splitting the schedule across two timezones.",
      "No standup is silently booked in the wrong timezone.",
    ],
    workflowStatus: "requires_review",
    workflow: [
      { label: "Keep c1 (Lisbon location)", action: "keep" },
      { label: "Keep c3 (before 10:00 local)", action: "keep" },
      { label: "Archive c2 (superseded New York location)", action: "archive" },
      { label: "Open review task to confirm relocation", action: "review" },
    ],
    safetyBlockers: 0,
    contextPassed: "2 included, 1 review, 0 blocked",
    reportExtra: "Conflicts resolved: 1",
    baselineAnswer:
      "I'll schedule standups in Eastern Time (New York), before 10:00. That keeps them in your morning.",
    memdAnswer:
      "Schedule standups in Lisbon time (WET/WEST), before 10:00 local. An older memory lists New York, but it's superseded by your current Lisbon location, so I've archived it and flagged the relocation for confirmation.",
    baselineNote: "Picked the outdated location",
    memdNote: "Resolved the conflict to current location",
  },
  {
    id: "sensitive-data",
    label: "Sensitive data",
    question: "Can you summarize what you know to help onboard a new teammate?",
    memories: [
      {
        id: "s1",
        text: "User's project is a B2B analytics dashboard.",
        meta: "4 days ago",
        audit: "clean",
        auditNote: "Safe, non-sensitive project context.",
        recommendation: "keep",
        recommendationNote: "Appropriate to share for onboarding.",
        governed: "included",
      },
      {
        id: "s2",
        text: "User's team uses Linear for issue tracking.",
        meta: "9 days ago",
        audit: "clean",
        auditNote: "Safe tooling context. No conflicts.",
        recommendation: "keep",
        recommendationNote: "Useful onboarding context. Include.",
        governed: "included",
      },
      {
        id: "s3",
        text: "Production DB password: pg_live_8f3...e21",
        meta: "2 days ago",
        audit: "sensitive",
        auditNote: "Detected a live credential. Must never enter model context.",
        recommendation: "block",
        recommendationNote: "Hard block. Route to a secrets workflow, never to the agent.",
        governed: "blocked",
      },
      {
        id: "s4",
        text: "Internal API key for billing service: sk_live_b27...9aa",
        meta: "2 days ago",
        audit: "sensitive",
        auditNote: "Detected a live secret. Integrity rule blocks exposure.",
        recommendation: "block",
        recommendationNote: "Hard block. Quarantine and alert, do not summarize.",
        governed: "blocked",
      },
    ],
    simulation: [
      "Keeping s1 + s2 gives a useful, safe onboarding summary.",
      "Blocking s3 + s4 prevents live credentials from reaching the model or the new teammate.",
      "If applied without governance, secrets would have been summarized into plain text.",
    ],
    workflowStatus: "integrity_blocked",
    workflow: [
      { label: "Keep s1 (project context)", action: "keep" },
      { label: "Keep s2 (tooling context)", action: "keep" },
      { label: "Block s3 (production DB password)", action: "block" },
      { label: "Block s4 (billing API key)", action: "block" },
    ],
    safetyBlockers: 2,
    contextPassed: "2 included, 0 review, 2 blocked",
    reportExtra: "Secrets quarantined: 2",
    baselineAnswer:
      "Sure! The project is a B2B analytics dashboard, the team uses Linear, the production DB password is pg_live_8f3...e21, and the billing API key is sk_live_b27...9aa.",
    memdAnswer:
      "The project is a B2B analytics dashboard and the team uses Linear for issue tracking. I detected two live credentials in memory (a production DB password and a billing API key) and blocked them from this summary. They were quarantined and routed to a secrets workflow instead.",
    baselineNote: "Leaked live credentials in plain text",
    memdNote: "Blocked secrets, shared only safe context",
  },
]
