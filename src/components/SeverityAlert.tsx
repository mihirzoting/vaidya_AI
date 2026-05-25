type Level = "low" | "moderate" | "emergency";

const config: Record<Level, { bg: string; text: string; border: string; title: string; body: string; pulse?: boolean }> = {
  emergency: {
    bg: "bg-[#DC2626]",
    text: "text-white",
    border: "border-[#DC2626]",
    title: "Emergency",
    body: "Seek immediate medical attention. Visit the nearest hospital or call 112.",
    pulse: true,
  },
  moderate: {
    bg: "bg-[#FEF3C7]",
    text: "text-[#92400E]",
    border: "border-[#FCD34D]",
    title: "Moderate Severity",
    body: "Visit a clinic soon. Do not delay seeking care.",
  },
  low: {
    bg: "bg-[#F0FDF4]",
    text: "text-[#166534]",
    border: "border-[#86EFAC]",
    title: "Low Severity",
    body: "Monitor your symptoms. Rest, stay hydrated, and consult a doctor if symptoms worsen.",
  },
};

export function SeverityAlert({ level }: { level: Level }) {
  const c = config[level];
  return (
    <div
      className={`${c.bg} ${c.text} border ${c.border} rounded-[6px] p-6 ${c.pulse ? "pulse-emergency" : ""}`}
    >
      <h3 className="font-serif-display text-3xl mb-2">{c.title}</h3>
      <p className="text-sm leading-relaxed">{c.body}</p>
    </div>
  );
}