import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Vaidya AI" },
      { name: "description", content: "Get in touch with the Vaidya AI team." },
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="paper-texture">
      <div className="max-w-2xl mx-auto px-5 py-16">
        <h1 className="font-serif-display text-4xl">Contact</h1>
        <p className="font-devanagari text-xl text-[color:var(--color-stone-warm)] mt-1">संपर्क करें</p>
        <div className="h-px w-20 bg-[color:var(--color-saffron)] mt-4 mb-8" />

        {sent ? (
          <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-[6px] p-6 text-[#166534]">
            <h3 className="font-serif-display text-xl">Thank you</h3>
            <p className="text-sm mt-1">Your message has been received. We will respond soon.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="bg-white border border-[color:var(--color-stone-border)] rounded-[6px] p-6 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
          >
            <div>
              <label className="block text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-1.5">Name</label>
              <input required type="text" className="w-full border border-[color:var(--color-stone-border)] rounded-[4px] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-saffron)] focus:bg-[#FFFBF5]" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-1.5">Email</label>
              <input required type="email" className="w-full border border-[color:var(--color-stone-border)] rounded-[4px] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-saffron)] focus:bg-[#FFFBF5]" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-1.5">Subject</label>
              <select
                required
                defaultValue=""
                className="w-full border border-[color:var(--color-stone-border)] rounded-[4px] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-saffron)] bg-white"
              >
                <option value="" disabled>Select a subject</option>
                <option>Partnership</option>
                <option>Feedback</option>
                <option>Press</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[color:var(--color-stone-warm)] mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                className="w-full border border-[color:var(--color-stone-border)] rounded-[4px] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-saffron)] focus:bg-[#FFFBF5] resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[color:var(--color-saffron)] text-white py-3 rounded-[4px] font-medium hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        )}

        <p className="text-sm text-[color:var(--color-stone-warm)] mt-6 text-center">
          Or email <span className="text-[color:var(--color-teal-deep)]">hello@vaidya.ai</span> ·{" "}
          <a href="https://github.com" className="text-[color:var(--color-teal-deep)] hover:underline">GitHub</a>
        </p>
      </div>
      <DisclaimerBanner />
    </div>
  );
}