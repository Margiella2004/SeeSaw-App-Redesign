/**
 * PopularGalleryRow — Horizontal row used in "Most Popular" section.
 * Features: rounded thumbnail (~80×77px), gallery name, hours + "Closed" status,
 * underlined gallery link, and rating circle on the right.
 * Matches Figma's Frame90/91/92 pattern exactly.
 */
import { galleryImages } from "../curated-images";

const [defaultThumb] = galleryImages;

export interface PopularGalleryRowData {
  id: string;
  thumbnailSrc?: string;
  name: string;              // e.g. "Sean Kelly"
  hours: string;             // e.g. "10am-6pm"
  status: string;            // e.g. "Closed"
  statusColor?: string;      // e.g. "#ed2115"
  galleryLink: string;       // e.g. "Templon"
  rating: string;            // e.g. "3.6"
}

export function PopularGalleryRow({
  row,
  onClick,
  className = "",
}: {
  row: PopularGalleryRowData;
  onClick?: () => void;
  className?: string;
}) {
  const thumb = row.thumbnailSrc || defaultThumb;

  return (
    <div
      className={`relative bg-white cursor-pointer ${className}`}
      style={{ width: "306px", height: "93px" }}
      onClick={onClick}
    >
      {/* ── Thumbnail ── */}
      <div
        className="absolute overflow-hidden rounded-[14px]"
        style={{ left: "9px", top: "10px", width: "80px", height: "77px" }}
      >
        <img
          src={thumb}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[14px]"
        />
      </div>

      {/* ── Gallery name ── */}
      <p
        className="absolute font-['KMR_Waldenburg:Normal',sans-serif]"
        style={{
          fontSize: "15px",
          letterSpacing: "-1.05px",
          lineHeight: "normal",
          color: "#646464",
          fontWeight: 500,
          left: "96px",
          top: "11px",
        }}
      >
        {row.name}
      </p>

      {/* ── Hours + dot + status row ── */}
      <div
        className="absolute flex items-center"
        style={{ left: "97px", top: "30px" }}
      >
        <span
          className="font-['KMR_Waldenburg:Buch',sans-serif]"
          style={{
            fontSize: "12px",
            letterSpacing: "-0.84px",
            lineHeight: "normal",
            color: "#908a8a",
          }}
        >
          {row.hours}
        </span>
        <div
          className="rounded-full"
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: "#908a8a",
            marginLeft: "6px",
            marginRight: "6px",
            flexShrink: 0,
          }}
        />
        <span
          className="font-['KMR_Waldenburg:Buch',sans-serif]"
          style={{
            fontSize: "12px",
            letterSpacing: "-0.84px",
            lineHeight: "normal",
            color: row.statusColor || "#ed2115",
          }}
        >
          {row.status}
        </span>
      </div>

      {/* ── Gallery link (underlined) ── */}
      <p
        className="absolute font-['KMR_Waldenburg:Normal',sans-serif] underline"
        style={{
          fontSize: "12px",
          letterSpacing: "-0.36px",
          lineHeight: "normal",
          color: "#9d9d9d",
          left: "97px",
          top: "49px",
        }}
      >
        {row.galleryLink}
      </p>

      {/* ── Rating circle ── */}
      <div
        className="absolute flex items-center justify-center overflow-hidden"
        style={{
          width: "24.279px",
          height: "24.279px",
          borderRadius: "39.221px",
          border: "0.757px solid #1f1f1f",
          left: "274px",
          top: "12px",
        }}
      >
        <span
          className="font-['KMR_Waldenburg:Buch',sans-serif]"
          style={{
            fontSize: "11.206px",
            letterSpacing: "-0.7844px",
            lineHeight: "normal",
            color: "#040404",
          }}
        >
          {row.rating}
        </span>
      </div>
    </div>
  );
}
