import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  { tag: "LANGUAGE", title: "Multilingual Symptom Input", body: "Hindi, Hinglish, and English understood naturally — speak the way you think." },
  { tag: "TRIAGE", title: "Emergency Severity Alerts", body: "Know immediately if your symptoms need urgent care or can be safely monitored." },
  { tag: "LOCATION", title: "Nearest Clinic Finder", body: "PHC and CHC clinics near you, with distance, timings, phone and directions." },
  { tag: "GUIDANCE", title: "Health Condition Information", body: "Informational overview of related conditions — always pointing back to a doctor." },
  { tag: "ACCESS", title: "Optimised for Basic Phones", body: "Works on 2G, low-end Android, and small screens — no app install required." },
  { tag: "PRIVACY", title: "No Data Stored", body: "Your health inputs are never saved or shared. The session ends when you leave." },
];

const steps = [
  { n: "01", t: "Enter your symptoms in any language" },
  { n: "02", t: "AI detects language and extracts key symptoms" },
  { n: "03", t: "Severity is assessed. Conditions are matched." },
  { n: "04", t: "Nearest clinics are shown with directions" },
];

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="hero-tint border-b border-[color:var(--color-stone-border)]">
        <div className="max-w-7xl mx-auto px-5 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-teal-deep)] mb-5">
              Primary Healthcare Guidance Platform
            </div>
            <h1 className="font-devanagari text-[44px] sm:text-[56px] leading-[1.1] text-[color:var(--color-ink)]">
              आपका स्वास्थ्य मार्गदर्शक
            </h1>
            <p className="font-serif-display text-2xl sm:text-3xl text-[color:var(--color-ink)] mt-4 leading-snug">
              Your AI Health Guide — In Hindi, In Your Village, In Your Hands.
            </p>
            <p className="text-[color:var(--color-stone-warm)] mt-5 max-w-xl">
              Vaidya AI helps rural India describe symptoms in any language, understand their severity, and find the
              nearest Primary or Community Health Centre — quickly, privately, and without any installation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/symptom-checker"
                className="bg-[color:var(--color-saffron)] text-white px-5 py-3 rounded-[4px] text-sm font-medium hover:opacity-90"
              >
                Symptoms Check करें
              </Link>
              <Link
                to="/about"
                className="border border-[color:var(--color-teal-deep)] text-[color:var(--color-teal-deep)] px-5 py-3 rounded-[4px] text-sm font-medium hover:bg-[#F0FDFA]"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Product demo card */}
          <div className="bg-white border border-[color:var(--color-stone-border)] accent-left rounded-[6px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <div className="text-[11px] uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-3">Live preview</div>
            <span className="inline-block bg-[color:var(--color-teal-deep)] text-white text-xs px-2 py-1 rounded-[3px]">
              Language Detected: Hindi
            </span>
            <div className="mt-4 text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-2">Symptoms identified</div>
            <div className="flex flex-wrap gap-2">
              <span className="border border-[color:var(--color-teal-deep)] text-[color:var(--color-teal-deep)] text-xs px-2 py-1 rounded-[3px]">बुखार · Fever</span>
              <span className="border border-[color:var(--color-teal-deep)] text-[color:var(--color-teal-deep)] text-xs px-2 py-1 rounded-[3px]">सिरदर्द · Headache</span>
            </div>
            <div className="mt-5 bg-[#FEF3C7] border border-[#FCD34D] rounded-[6px] p-4">
              <div className="font-serif-display text-lg text-[#92400E]">Moderate — Visit a clinic</div>
              <div className="text-xs text-[#92400E] mt-1">Do not delay seeking care.</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y-2 border-[color:var(--color-saffron)] bg-white">
        <div className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[color:var(--color-stone-border)]">
          {[
            { n: "65%+", l: "Rural Population in India" },
            { n: "3", l: "Hindi · Hinglish · English" },
            { n: "PHC & CHC", l: "Clinics Mapped" },
          ].map((s) => (
            <div key={s.l} className="text-center py-4 md:py-2 px-6">
              <div className="font-serif-display text-4xl text-[color:var(--color-ink)]">{s.n}</div>
              <div className="text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <h2 className="font-serif-display text-3xl sm:text-4xl accent-left pl-4">What Vaidya AI Does</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-[color:var(--color-stone-border)] accent-left rounded-[6px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-saffron)] mb-2">{f.tag}</div>
              <h3 className="font-serif-display text-xl mb-2">{f.title}</h3>
              <p className="text-sm text-[color:var(--color-stone-warm)] leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#F0FDFA] border-y border-[color:var(--color-stone-border)]">
        <div className="max-w-7xl mx-auto px-5 py-20">
          <h2 className="font-serif-display text-3xl sm:text-4xl">How It Works</h2>
          <p className="font-devanagari text-xl text-[color:var(--color-stone-warm)] mt-1">यह कैसे काम करता है</p>
          <div className="mt-10 grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[8%] right-[8%] h-px bg-[color:var(--color-saffron)]" />
            {steps.map((s) => (
              <div key={s.n} className="relative bg-[#F0FDFA] z-10">
                <div className="font-serif-display text-5xl text-[color:var(--color-saffron)] leading-none">{s.n}</div>
                <p className="text-sm text-[color:var(--color-ink)] mt-3">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
