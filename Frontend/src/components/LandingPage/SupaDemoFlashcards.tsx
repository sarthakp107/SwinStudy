import { ScrollReveal } from "@/components/ScrollReveal"

const SupaDemoFlashcards = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-6">
            See it in action
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Turn Any PDF to Flashcards{" "}
            <span className="text-red-600">Instantly</span>
            <span className="ml-2">⚡</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your notes and watch AI generate personalized flashcards in seconds.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div
            className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white"
            style={{
              position: "relative",
              boxSizing: "content-box",
              maxHeight: "80vh",
              width: "100%",
              aspectRatio: "1.8103448275862069",
              padding: "0",
            }}
          >
            <iframe
              src="https://app.supademo.com/embed/cm9ppjaca6aquljv5yqanr55e?embed_v=2"
              loading="lazy"
              title="Swinstudy.com"
              allow="clipboard-write"
              allowFullScreen
              className="w-full h-full"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default SupaDemoFlashcards
