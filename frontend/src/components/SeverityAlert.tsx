type Level = "low" | "moderate" | "emergency";

const config: Record<Level, { bg: string; text: string; border: string; title_hi: string; title_en: string; body_hi: string; body_en: string; pulse?: boolean }> = {
  emergency: {
    bg: "bg-[#DC2626]",
    text: "text-white",
    border: "border-[#DC2626]",
    title_hi: "आपातकाल — तुरंत जाएं",
    title_en: "Emergency — Go immediately",
    body_hi: "तुरंत चिकित्सा सहायता लें। निकटतम अस्पताल जाएं या 112 पर कॉल करें।",
    body_en: "Seek immediate medical attention. Visit the nearest hospital or call 112.",
    pulse: true,
  },
  moderate: {
    bg: "bg-[#FEF3C7]",
    text: "text-[#92400E]",
    border: "border-[#FCD34D]",
    title_hi: "सामान्य गंभीरता",
    title_en: "Moderate Severity",
    body_hi: "जल्द क्लिनिक जाएं। देरी न करें।",
    body_en: "Visit a clinic soon. Do not delay seeking care.",
  },
  low: {
    bg: "bg-[#F0FDF4]",
    text: "text-[#166534]",
    border: "border-[#86EFAC]",
    title_hi: "कम गंभीरता",
    title_en: "Low Severity",
    body_hi: "अपने लक्षणों पर ध्यान दें। आराम करें, पानी पिएं, और स्थिति बिगड़ने पर डॉक्टर से मिलें।",
    body_en: "Monitor your symptoms. Rest, stay hydrated, and consult a doctor if symptoms worsen.",
  },
};

export function SeverityAlert({ level, primary = "en" }: { level: Level; primary?: "hi" | "en" }) {
  const c = config[level];
  const primaryTitle = primary === "hi" ? c.title_hi : c.title_en;
  const secondaryTitle = primary === "hi" ? c.title_en : c.title_hi;
  const primaryBody = primary === "hi" ? c.body_hi : c.body_en;
  const secondaryBody = primary === "hi" ? c.body_en : c.body_hi;
  return (
    <div
      className={`${c.bg} ${c.text} border ${c.border} rounded-[6px] p-6 ${c.pulse ? "pulse-emergency" : ""}`}
    >
      <h3 className={`${primary === "hi" ? "font-devanagari" : "font-serif-display"} text-3xl leading-tight`}>{primaryTitle}</h3>
      <p className={`text-sm opacity-90 mb-3 ${primary === "en" ? "font-devanagari" : ""}`}>{secondaryTitle}</p>
      <p className={`text-base leading-relaxed ${primary === "hi" ? "font-devanagari" : ""}`}>{primaryBody}</p>
      <p className={`text-xs opacity-80 mt-1 ${primary === "en" ? "font-devanagari" : ""}`}>{secondaryBody}</p>
    </div>
  );
}