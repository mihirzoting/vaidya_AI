export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="shimmer h-6 w-40 rounded-[4px]" />
      <div className="shimmer h-4 w-64 rounded-[4px]" />
      <div className="shimmer h-28 w-full rounded-[6px]" />
      <div className="shimmer h-24 w-full rounded-[6px]" />
      <div className="shimmer h-24 w-full rounded-[6px]" />
    </div>
  );
}