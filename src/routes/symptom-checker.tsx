import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SymptomInput } from "@/components/SymptomInput";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { SeverityAlert } from "@/components/SeverityAlert";
import { ConditionCard } from "@/components/ConditionCard";
import { ClinicCard } from "@/components/ClinicCard";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { checkSymptoms, type SymptomResponse } from "@/services/api";
import type { LanguageId } from "@/components/LanguageSelector";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/symptom-checker")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Symptom Checker — Vaidya AI" },
      { name: "description", content: "Describe your symptoms in Hindi, Hinglish, or English. Get severity guidance and nearest PHC/CHC clinics." },
    ],
  }),
});

function Page() {
  const [loading, setLoading] = useState(false);
  const [primaryLang, setPrimaryLang] = useState<"hi" | "en">("en");
  const [result, setResult] = useState<SymptomResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<{ text: string; lang: LanguageId; loc: string; image: string | null } | null>(null);

  const run = async (text: string, lang: LanguageId, loc: string, image: string | null) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setLastInput({ text, lang, loc, image });
    try {
      const res = await checkSymptoms({ text, language: lang, latitude: null, longitude: null, image });
      setResult(res);
    } catch {
      setError("Could not analyse symptoms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const retry = () => lastInput && run(lastInput.text, lastInput.lang, lastInput.loc, lastInput.image);

  const severityMap: Record<string, "low" | "moderate" | "emergency"> = {
    LOW: "low", MODERATE: "moderate", EMERGENCY: "emergency",
  };

  return (
    <div className="paper-texture">
      <div className="max-w-7xl mx-auto px-5 py-10 grid lg:grid-cols-[2fr_3fr] gap-8">
        <div>
          <SymptomInput onSubmit={run} loading={loading} />
        </div>

        <div className="space-y-6">
          {!loading && !result && !error && (
            <div className="bg-white border border-dashed border-[color:var(--color-stone-border)] rounded-[6px] p-10 text-center">
              <p className="font-serif-display text-2xl text-[color:var(--color-ink)]">Awaiting your symptoms</p>
              <p className="text-sm text-[color:var(--color-stone-warm)] mt-2">
                Results will appear here once you describe how you feel.
              </p>
            </div>
          )}

          {loading && (
            <div className="bg-white border border-[color:var(--color-stone-border)] rounded-[6px] p-6">
              <SkeletonLoader />
            </div>
          )}

          {error && (
            <div className="bg-white border border-[color:var(--color-emergency)] rounded-[6px] p-6 text-center">
              <AlertTriangle className="mx-auto text-[color:var(--color-emergency)]" />
              <h3 className="font-serif-display text-xl mt-2">Something went wrong</h3>
              <p className="text-sm text-[color:var(--color-stone-warm)] mt-1">{error}</p>
              <button
                onClick={retry}
                className="mt-4 bg-[color:var(--color-saffron)] text-white px-4 py-2 rounded-[4px] text-sm"
              >
                Try again
              </button>
            </div>
          )}

          {result && (
            <>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="inline-block bg-[color:var(--color-teal-deep)] text-white text-xs px-3 py-1.5 rounded-[3px]">
                  Language Detected: {labelFor(result.detected_language)}
                </span>
                <div className="inline-flex items-center rounded-full border border-[color:var(--color-stone-border)] bg-white p-0.5 text-xs">
                  <button
                    onClick={() => setPrimaryLang("en")}
                    className={`px-3 py-1 rounded-full transition ${primaryLang === "en" ? "bg-[color:var(--color-saffron)] text-white" : "text-[color:var(--color-stone-warm)]"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setPrimaryLang("hi")}
                    className={`px-3 py-1 rounded-full font-devanagari transition ${primaryLang === "hi" ? "bg-[color:var(--color-saffron)] text-white" : "text-[color:var(--color-stone-warm)]"}`}
                  >
                    हिंदी
                  </button>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-2">
                  Symptoms Identified / <span className="font-devanagari">पहचाने गए लक्षण</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.symptoms_extracted.map((s) => (
                    <span key={s.en} className="border border-[color:var(--color-teal-deep)] text-[color:var(--color-teal-deep)] text-sm px-3 py-1 rounded-[3px]">
                      {primaryLang === "hi" ? (
                        <><span className="font-devanagari">{s.hi}</span> <span className="opacity-70 text-xs">/ {s.en}</span></>
                      ) : (
                        <>{s.en} <span className="font-devanagari opacity-70 text-xs">/ {s.hi}</span></>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <SeverityAlert level={severityMap[result.severity.level]} primary={primaryLang} />

              <div>
                <h3 className="font-serif-display text-2xl">
                  Possible Related Conditions <span className="font-devanagari text-lg text-[color:var(--color-teal-deep)]">— संभावित स्थितियाँ</span>
                </h3>
                <p className="text-xs italic text-[color:var(--color-stone-warm)] mb-4">
                  <span className="font-devanagari">केवल जानकारी के लिए — चिकित्सा मूल्यांकन नहीं।</span> Informational only — not a medical assessment.
                </p>
                <div className="space-y-4">
                  {result.possible_conditions.map((c) => (
                    <ConditionCard
                      key={c.name}
                      name={c.name}
                      nameHi={c.name_hi}
                      info={c.info}
                      infoHi={c.info_hi}
                      primary={primaryLang}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif-display text-2xl mb-4">
                  Nearest PHC / CHC Clinics <span className="font-devanagari text-lg text-[color:var(--color-teal-deep)]">— निकटतम क्लिनिक</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {result.nearby_clinics.map((c) => (
                    <ClinicCard key={c.name} clinic={c} />
                  ))}
                </div>
                <div className="mt-4">
                  <MapPlaceholder />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <DisclaimerBanner>
        <span className="font-devanagari">यह चिकित्सा सलाह नहीं है। कृपया डॉक्टर से मिलें।</span> Vaidya AI is a triage and routing assistant only. It does not provide medical advice, prescriptions, or clinical assessments. Please consult a qualified doctor for any health concern.
      </DisclaimerBanner>
    </div>
  );
}

function labelFor(code: string) {
  if (code === "hi") return "Hindi";
  if (code === "en") return "English";
  if (code === "hinglish") return "Hinglish";
  return code;
}