import { ScrollReveal } from "@/components/ScrollReveal"

const ProblemBlock = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-semibold mb-6">
            Sound familiar?
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Tired of Studying Alone?<br />
            <span className="text-slate-600">Notes Scattered Everywhere?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Swinburne study life can be tough, but you don&apos;t have to do it alone. Our platform connects you with peers and gives you the tools to make your study time effective.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "📚", title: "Scattered notes", desc: "Everything in one place" },
            { icon: "👤", title: "Studying alone", desc: "Find your unit buddies" },
            { icon: "⏰", title: "Ineffective revision", desc: "AI-powered flashcards" },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition-all group"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemBlock
