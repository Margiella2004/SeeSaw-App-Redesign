/**
 * LocationSheetContent — Content for the "Location" bottom sheet popup.
 * Fully data-driven: accepts location data to show map, address, and map links.
 */
import svgPaths from "../../imports/svg-qpesrnpx6v";
import type { LocationData } from "./gallery-data";

/* ── External link arrow icon ── */
function ExternalLinkIcon() {
  return (
    <svg width="6.5" height="6.5" fill="none" viewBox="0 0 6.5 6.5">
      <path d={svgPaths.p594eb00} fill="black" />
    </svg>
  );
}

/* ── Location pin icon ── */
function LocationPinIcon() {
  return (
    <svg width="10" height="13" fill="none" viewBox="0 0 10 13">
      <path d={svgPaths.pb30df80} fill="#676C72" />
    </svg>
  );
}

/* ── Link row (google maps / apple maps) ── */
function MapLinkRow({ label, url }: { label: string; url?: string }) {
  return (
    <div className="relative" style={{ width: "275px", marginLeft: "4px" }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-[4px] overflow-hidden no-underline"
        style={{ paddingTop: "19px", paddingBottom: "19px", paddingLeft: "4px", textDecoration: "none" }}
      >
        <span
          className="font-['KMR_Waldenburg:Normal',sans-serif] text-[#333]"
          style={{ fontSize: "9px", letterSpacing: "-0.27px", lineHeight: "normal" }}
        >
          {label}
        </span>
        <ExternalLinkIcon />
      </a>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          borderTop: "0.5px solid #d0d0d0",
          borderBottom: "0.5px solid #d0d0d0",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════ */

export function LocationSheetContent({
  location,
}: {
  location: LocationData;
}) {
  return (
    <div className="bg-[#fefefe] w-full px-[20px] pt-[12px] pb-[24px]">
      {/* ── Heading ── */}
      <p
        className="font-['KMR_Waldenburg:Normal',sans-serif] text-[#131313]"
        style={{ fontSize: "18px", letterSpacing: "-0.54px", lineHeight: "normal" }}
      >
        Location
      </p>

      {/* ── Map image ── */}
      <div
        className="mt-[14px] w-full overflow-hidden rounded-[13px] relative"
        style={{ height: "157px", border: "1px solid black" }}
      >
        <img
          src={location.mapImage}
          alt="Map"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* ── Address row ── */}
      <div className="flex items-center gap-[8px] mt-[14px]">
        <LocationPinIcon />
        <span
          className="font-['KMR_Waldenburg:Buch',sans-serif] text-[#676c72]"
          style={{ fontSize: "9px", letterSpacing: "-0.27px", lineHeight: "normal" }}
        >
          {location.address}
        </span>
      </div>

      {/* ── Map links ── */}
      <div className="mt-[10px]">
        <MapLinkRow label="google maps" url={location.googleMapsUrl} />
        <MapLinkRow label="apple maps" url={location.appleMapsUrl} />
      </div>
    </div>
  );
}
