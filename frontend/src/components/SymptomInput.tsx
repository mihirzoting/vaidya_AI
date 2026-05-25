import { useRef, useState } from "react";
import { LanguageSelector, type LanguageId } from "./LanguageSelector";
import { Camera, Loader2, MapPin, X } from "lucide-react";

const examples = [
  "बुखार और खांसी",
  "Pet dard aur ulti",
  "Chest pain and dizziness",
  "आंखों में जलन",
];

export function SymptomInput({
  onSubmit,
  loading,
}: {
  onSubmit: (text: string, language: LanguageId, location: string, imageBase64: string | null) => void;
  loading: boolean;
}) {
  const [text, setText] = useState("");
  const [lang, setLang] = useState<LanguageId>("auto");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(f);
  };

  const useGPS = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (p) => setLocation(`${p.coords.latitude.toFixed(3)}, ${p.coords.longitude.toFixed(3)}`),
      () => setLocation("Location unavailable")
    );
  };

  return (
    <div className="bg-white border border-[color:var(--color-stone-border)] rounded-[6px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <h2 className="font-serif-display text-3xl">Symptom Checker</h2>
      <p className="font-devanagari text-xl text-[color:var(--color-stone-warm)] mt-1">लक्षण जांचें</p>
      <p className="text-sm text-[color:var(--color-stone-warm)] mt-2 mb-6">
        Describe how you feel — in Hindi, Hinglish, or English.
      </p>

      <div className="mb-4">
        <label className="block text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-2">Language</label>
        <LanguageSelector value={lang} onChange={setLang} />
      </div>

      <div className="mb-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="मुझे बुखार और सिरदर्द है..."
          rows={5}
          maxLength={500}
          className="w-full border border-[color:var(--color-stone-border)] rounded-[6px] p-3 text-sm focus:outline-none focus:border-[color:var(--color-saffron)] focus:bg-[#FFFBF5] resize-none font-devanagari"
        />
        <div className="text-right text-xs text-[color:var(--color-stone-warm)]">{text.length}/500</div>
      </div>

      <div className="mt-5 mb-5">
        <label className="block text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-2">
          <span className="font-devanagari">दृश्य लक्षण की फ़ोटो (वैकल्पिक)</span> / Upload Symptom Photo (Optional)
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onPickImage}
          className="hidden"
        />
        {!image ? (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full bg-white border-2 border-dashed border-[color:var(--color-stone-border)] rounded-[6px] p-6 flex flex-col items-center justify-center gap-2 hover:border-[color:var(--color-saffron)] hover:bg-[#FFFBF5] transition"
          >
            <Camera size={28} className="text-[color:var(--color-stone-warm)]" />
            <span className="text-sm text-[color:var(--color-stone-warm)] text-center">
              <span className="font-devanagari">फ़ोटो खींचें या चुनें</span> / Tap to upload or take photo
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-3 bg-white border border-[color:var(--color-stone-border)] rounded-[6px] p-3">
            <img src={image} alt="Symptom preview" className="w-20 h-20 object-cover rounded-[4px]" />
            <div className="flex-1 text-sm text-[color:var(--color-stone-warm)]">
              <span className="font-devanagari">फ़ोटो जोड़ी गई</span>
              <div className="text-xs">Photo attached</div>
            </div>
            <button
              type="button"
              onClick={() => { setImage(null); if (fileRef.current) fileRef.current.value = ""; }}
              className="text-[color:var(--color-stone-warm)] hover:text-[color:var(--color-emergency)] p-1"
              aria-label="Remove photo"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 mb-5">
        <label className="block text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-2">
          Your Location (optional)
        </label>
        <div className="flex items-center gap-3">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Village or town"
            className="flex-1 border border-[color:var(--color-stone-border)] rounded-[6px] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-saffron)] focus:bg-[#FFFBF5]"
          />
          <button
            type="button"
            onClick={useGPS}
            className="text-sm text-[color:var(--color-teal-deep)] hover:underline flex items-center gap-1"
          >
            <MapPin size={14} /> Use GPS
          </button>
        </div>
      </div>

      {image && (
        <div className="mb-3 inline-flex items-center gap-1.5 text-xs bg-[#F0FDFA] text-[color:var(--color-teal-deep)] border border-[color:var(--color-teal-deep)] px-2.5 py-1 rounded-full">
          <Camera size={12} /> Photo added
        </div>
      )}
      <button
        disabled={!text.trim() || loading}
        onClick={() => onSubmit(text, lang, location, image)}
        className="w-full bg-[color:var(--color-saffron)] text-white py-3 rounded-[4px] font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        Analyse Symptoms
      </button>

      <div className="mt-6">
        <div className="text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-2">Try an example:</div>
        <div className="flex flex-wrap gap-2">
          {examples.map((e) => (
            <button
              key={e}
              onClick={() => setText(e)}
              className="text-xs border border-[color:var(--color-teal-deep)] text-[color:var(--color-teal-deep)] px-3 py-1.5 rounded-[4px] hover:bg-[#F0FDFA]"
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}