import { SiteHeader } from "@/components/site-header"
import { HeroDemo } from "@/components/hero-demo"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorks } from "@/components/how-it-works"
import { GovernanceDemo } from "@/components/governance-demo"
import { WorkersSection } from "@/components/workers-section"
import { ValidationSection } from "@/components/validation-section"
import { ArchitectureSection } from "@/components/architecture-section"
import { UseCases } from "@/components/use-cases"
import { QuickstartSection } from "@/components/quickstart-section"
import { RoadmapSection } from "@/components/roadmap-section"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroDemo />
        <ProblemSection />
        <HowItWorks />
        <GovernanceDemo />
        <WorkersSection />
        <ValidationSection />
        <ArchitectureSection />
        <UseCases />
        <QuickstartSection />
        <RoadmapSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
