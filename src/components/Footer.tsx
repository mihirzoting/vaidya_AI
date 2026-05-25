import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[color:var(--color-stone-border)] mt-16">
      <div className="max-w-7xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-devanagari text-2xl">वैद्य AI</div>
          <div className="font-serif-display text-sm text-[color:var(--color-stone-warm)]">Vaidya AI</div>
          <p className="text-sm text-[color:var(--color-stone-warm)] mt-2 max-w-xs">
            Your AI health guide — in Hindi, in your village, in your hands.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <Link to="/" className="hover:text-[color:var(--color-saffron)]">Home</Link>
          <Link to="/symptom-checker" className="hover:text-[color:var(--color-saffron)]">Symptom Checker</Link>
          <Link to="/about" className="hover:text-[color:var(--color-saffron)]">About</Link>
          <Link to="/contact" className="hover:text-[color:var(--color-saffron)]">Contact</Link>
        </nav>
        <div className="text-sm text-[color:var(--color-stone-warm)] md:text-right">
          Made for Rural India
        </div>
      </div>
      <div className="border-t border-[color:var(--color-stone-border)] bg-[color:var(--color-paper)]">
        <p className="max-w-7xl mx-auto px-5 py-3 text-xs text-[color:var(--color-stone-warm)]">
          Vaidya AI provides informational guidance only — not medical advice. Always consult a qualified healthcare professional.
        </p>
      </div>
    </footer>
  );
}