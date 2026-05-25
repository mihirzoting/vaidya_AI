import { createFileRoute } from "@tanstack/react-router";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Vaidya AI" },
      { name: "description", content: "Vaidya AI is a multilingual AI-powered triage assistant designed for rural India." },
    ],
  }),
});

const stack = ["React", "FastAPI", "MuRIL", "LangChain", "PostgreSQL", "OpenStreetMap"];

function About() {
  return (
    <div className="paper-texture">
      <div className="max-w-5xl mx-auto px-5 py-16">
        <h1 className="font-serif-display text-4xl sm:text-5xl">About Vaidya AI</h1>
        <p className="font-devanagari text-2xl text-[color:var(--color-stone-warm)] mt-2">हमारे बारे में</p>
        <div className="h-px w-24 bg-[color:var(--color-saffron)] mt-4" />

        <p className="text-[color:var(--color-ink)] mt-8 leading-relaxed max-w-3xl">
          Over 65% of India lives in villages, yet most digital health tools are designed only in English and for urban
          contexts. Vaidya AI exists to close that gap. We help people describe their symptoms in the language they
          actually speak — Hindi, Hinglish, or English — and quickly understand whether they should rest, visit a clinic,
          or seek emergency care. Every output is informational only and points the user back to a qualified doctor.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white border border-[color:var(--color-stone-border)] accent-left rounded-[6px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <div className="text-[11px] uppercase tracking-wider text-[color:var(--color-saffron)] mb-2">THE PROBLEM</div>
            <h3 className="font-serif-display text-2xl mb-3">A language and access gap</h3>
            <p className="text-sm text-[color:var(--color-stone-warm)] leading-relaxed">
              Most rural patients delay or skip care because they cannot describe symptoms in English, do not know where
              the nearest PHC is, or cannot judge severity. Misinformation fills the vacuum.
            </p>
          </div>
          <div className="bg-white border border-[color:var(--color-stone-border)] accent-left rounded-[6px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <div className="text-[11px] uppercase tracking-wider text-[color:var(--color-saffron)] mb-2">OUR APPROACH</div>
            <h3 className="font-serif-display text-2xl mb-3">Triage, not treatment</h3>
            <p className="text-sm text-[color:var(--color-stone-warm)] leading-relaxed">
              A multilingual model extracts symptoms, assesses severity, and routes patients to the nearest PHC or CHC.
              We never prescribe, treat, or assess clinically — that always belongs to a doctor.
            </p>
          </div>
        </div>

        <h2 className="font-serif-display text-2xl mt-16 accent-left pl-4">Built With</h2>
        <div className="flex flex-wrap gap-2 mt-5">
          {stack.map((s) => (
            <span key={s} className="border border-[color:var(--color-stone-border)] text-[color:var(--color-ink)] text-sm px-3 py-1.5 rounded-[4px] bg-white">
              {s}
            </span>
          ))}
        </div>

        <h2 className="font-serif-display text-2xl mt-16 accent-left pl-4">Social Impact</h2>
        <div className="grid sm:grid-cols-3 gap-6 mt-6">
          {[
            { n: "65%", l: "of India lives in rural areas" },
            { n: "800M+", l: "potential users underserved" },
            { n: "10+", l: "Indian languages on roadmap" },
          ].map((s) => (
            <div key={s.l} className="bg-white border border-[color:var(--color-stone-border)] rounded-[6px] p-5">
              <div className="font-serif-display text-4xl text-[color:var(--color-saffron)]">{s.n}</div>
              <div className="text-sm text-[color:var(--color-stone-warm)] mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <DisclaimerBanner />
    </div>
  );
}