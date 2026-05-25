export function ConditionCard({
  name,
  nameHi,
  info,
  infoHi,
  primary = "en",
}: {
  name: string;
  nameHi: string;
  info: string;
  infoHi: string;
  primary?: "hi" | "en";
}) {
  return (
    <div className="bg-white border border-[color:var(--color-stone-border)] accent-left rounded-[6px] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <h4 className="font-serif-display text-xl text-[color:var(--color-ink)]">
        {name} <span className="font-devanagari text-base text-[color:var(--color-teal-deep)]">— {nameHi}</span>
      </h4>
      {primary === "hi" ? (
        <>
          <p className="font-devanagari text-base text-[color:var(--color-ink)] leading-relaxed mt-2">{infoHi}</p>
          <p className="text-sm text-[color:var(--color-stone-warm)] leading-relaxed mt-1">{info}</p>
        </>
      ) : (
        <>
          <p className="text-base text-[color:var(--color-ink)] leading-relaxed mt-2">{info}</p>
          <p className="font-devanagari text-sm text-[color:var(--color-stone-warm)] leading-relaxed mt-1">{infoHi}</p>
        </>
      )}
      <p className="text-xs italic text-[color:var(--color-stone-warm)] mt-3">
        <span className="font-devanagari">यह चिकित्सा सलाह नहीं है। कृपया डॉक्टर से मिलें।</span>
        <br />
        This is not medical advice. Please consult a doctor.
      </p>
    </div>
  );
}