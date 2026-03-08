import Feature1 from "./Feature1"
import Feature2 from "./Feature2"
import Feature3 from "./Feature3"
import { ScrollReveal } from "@/components/ScrollReveal"

const FeatureBlock = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-slate-900 mb-4 tracking-tight">
            All the Tools a Swinburne Student Needs
          </h2>
          <p className="text-slate-600 text-center text-lg max-w-2xl mx-auto mb-16">
            Everything you need to ace your units, connect with peers, and study smarter.
          </p>
        </ScrollReveal>
        <div className="space-y-24">
          <Feature1 />
          <Feature2 />
          <Feature3 />
        </div>
      </div>
    </section>
  )
}

export default FeatureBlock
