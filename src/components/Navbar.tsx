import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/symptom-checker", label: "Symptom Checker" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white border-b border-[color:var(--color-stone-border)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        <Link to="/" className="leading-tight">
          <div className="font-devanagari text-[20px] text-[color:var(--color-ink)]">वैद्य AI</div>
          <div className="font-serif-display text-[13px] text-[color:var(--color-stone-warm)] -mt-0.5">Vaidya AI</div>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-[color:var(--color-ink)] hover:text-[color:var(--color-saffron)]"
              activeProps={{ className: "text-[color:var(--color-saffron)] font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/symptom-checker"
            className="bg-[color:var(--color-saffron)] text-white px-4 py-2 text-sm font-medium hover:opacity-90 rounded-[4px]"
          >
            Check Symptoms
          </Link>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[color:var(--color-stone-border)] bg-white px-5 py-3 space-y-3">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            to="/symptom-checker"
            onClick={() => setOpen(false)}
            className="block bg-[color:var(--color-saffron)] text-white px-4 py-2 text-sm text-center rounded-[4px]"
          >
            Check Symptoms
          </Link>
        </div>
      )}
    </header>
  );
}