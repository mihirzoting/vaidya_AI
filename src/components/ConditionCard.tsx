export function ConditionCard({ name, info }: { name: string; info: string }) {
  return (
    <div className="bg-white border border-[color:var(--color-stone-border)] accent-left rounded-[6px] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <h4 className="font-serif-display text-xl text-[color:var(--color-ink)] mb-1">{name}</h4>
      <p className="text-sm text-[color:var(--color-stone-warm)] leading-relaxed">{info}</p>
      <p className="text-xs italic text-[color:var(--color-stone-warm)] mt-3">
        This is not medical advice. Please consult a doctor.
      </p>
    </div>
  );
}