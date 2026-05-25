export function DisclaimerBanner({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-[#FEF3C7] border-y border-[#FCD34D]">
      <p className="max-w-7xl mx-auto px-5 py-4 text-sm text-[#92400E]">
        {children ??
          "Vaidya AI provides informational guidance only — not medical advice. All outputs must be verified by a qualified healthcare professional. This platform does not prescribe, treat, or diagnose."}
      </p>
    </div>
  );
}