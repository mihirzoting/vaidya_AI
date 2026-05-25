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
  const [result, setResult] = useState<SymptomResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<{ text: string; lang: LanguageId; loc: string } | null>(null);

  const run = async (text: string, lang: LanguageId, loc: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setLastInput({ text, lang, loc });
    try {
      const res = await checkSymptoms({ text, language: lang, latitude: null, longitude: null });
      setResult(res);
    } catch {
      setError("Could not analyse symptoms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const retry = () => lastInput && run(lastInput.text, lastInput.lang, lastInput.loc);

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
              <div>
                <span className="inline-block bg-[color:var(--color-teal-deep)] text-white text-xs px-3 py-1.5 rounded-[3px]">
                  Language Detected: {labelFor(result.detected_language)}
                </span>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-2">
                  Symptoms Identified
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.symptoms_extracted.map((s) => (
                    <span key={s} className="border border-[color:var(--color-teal-deep)] text-[color:var(--color-teal-deep)] text-sm px-3 py-1 rounded-[3px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <SeverityAlert level={severityMap[result.severity.level]} />

              <div>
                <h3 className="font-serif-display text-2xl">Possible Related Conditions</h3>
                <p className="text-xs italic text-[color:var(--color-stone-warm)] mb-4">
                  Informational only — not a medical assessment.
                </p>
                <div className="space-y-4">
                  {result.possible_conditions.map((c) => (
                    <ConditionCard key={c.name} name={c.name} info={c.info} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif-display text-2xl mb-4">Nearest PHC / CHC Clinics</h3>
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
        Vaidya AI is a triage and routing assistant only. It does not provide medical advice, prescriptions, or clinical assessments. Please consult a qualified doctor for any health concern.
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