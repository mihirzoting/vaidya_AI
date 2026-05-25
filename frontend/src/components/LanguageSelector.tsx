const options = [
  { id: "hi", label: "Hindi हिंदी" },
  { id: "hinglish", label: "Hinglish" },
  { id: "en", label: "English" },
  { id: "auto", label: "Auto Detect" },
] as const;

export type LanguageId = (typeof options)[number]["id"];

export function LanguageSelector({ value, onChange }: { value: LanguageId; onChange: (v: LanguageId) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={`px-3 py-1.5 text-sm border rounded-[4px] transition ${
              active
                ? "border-[color:var(--color-teal-deep)] text-[color:var(--color-teal-deep)] bg-[#F0FDFA]"
                : "border-[color:var(--color-stone-border)] text-[color:var(--color-stone-warm)] hover:border-[color:var(--color-teal-deep)]"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}