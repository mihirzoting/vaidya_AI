import { MapPin } from "lucide-react";

export type Clinic = {
  name: string;
  type: "PHC" | "CHC";
  distance_km: number;
  address: string;
  phone: string;
  timings: string;
};

export function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="bg-white border border-[color:var(--color-stone-border)] rounded-[6px] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-serif-display text-lg">{clinic.name}</h4>
        <span className="text-[11px] font-medium uppercase tracking-wider text-[color:var(--color-teal-deep)] border border-[color:var(--color-teal-deep)] px-2 py-0.5 rounded-[3px]">
          {clinic.type}
        </span>
      </div>
      <div className="text-sm text-[color:var(--color-stone-warm)] space-y-1">
        <div className="flex items-center gap-1.5"><MapPin size={13} />{clinic.distance_km} km away</div>
        <div>{clinic.address}</div>
        <div>{clinic.phone}</div>
        <div>{clinic.timings}</div>
      </div>
      <button className="mt-4 text-sm border border-[color:var(--color-teal-deep)] text-[color:var(--color-teal-deep)] px-3 py-1.5 rounded-[4px] hover:bg-[color:var(--color-teal-deep)] hover:text-white transition">
        Get Directions
      </button>
    </div>
  );
}