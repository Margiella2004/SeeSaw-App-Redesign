/**
 * HomeGalleryCard — 273×228px card used in "For you" and "Friends Also Like" sections.
 * Features: single hero image at top (149px), gallery name, rating circle,
 * bank icon + dark tag pill, "Open · 10am-6pm" status row.
 * Supports `heroImage` for a single collage/composite, or falls back to thumbnails[0].
 */
import svgPaths from "../../../imports/svg-63hltl4ch0";

export interface HomeGalleryCardData {
  id: string;
  heroImage?: string;         // single collage/composite image for the top area
  thumbnails: string[];       // fallback images (uses first if no heroImage)
  name: string;               // e.g. "Pace Gallery"
  tag: string;                // badge pill text, e.g. "Pace"
  rating: string;             // e.g. "3.6"
  status: string;             // e.g. "Open"
  hours?: string;             // e.g. "10am-6pm"
}

export function HomeGalleryCard({
  card,
  onClick,
  className = "",
}: {
  card: HomeGalleryCardData;
  onClick?: () => void;
  className?: string;
}) {
  /* Pick the single image source: heroImage preferred, else first thumbnail */
  const imageSrc = card.heroImage || card.thumbnails[0];

  return (
    <div
      className={`shrink-0 rounded-[12px] overflow-hidden bg-white relative cursor-pointer ${className}`}
      style={{ width: "273px", height: "228px" }}
      onClick={onClick}
    >
      {/* ── Single image area (149px) ── */}
      <div className="absolute top-0 left-0 right-0 h-[149px] overflow-hidden rounded-t-[12px]">
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* ── Gallery name ── */}
      <p
        className="absolute font-['KMR_Waldenburg:Normal',sans-serif]"
        style={{
          fontSize: "15px",
          letterSpacing: "-1.05px",
          lineHeight: "normal",
          color: "#5a5a5a",
          left: "13px",
          top: "161px",
        }}
      >
        {card.name}
      </p>

      {/* ── Rating circle ── */}
      <div
        className="absolute flex items-center justify-center overflow-hidden"
        style={{
          width: "24.279px",
          height: "24.279px",
          borderRadius: "39.221px",
          border: "0.757px solid black",
          left: "237px",
          top: "158px",
        }}
      >
        <span
          className="font-['KMR_Waldenburg:Buch',sans-serif]"
          style={{
            fontSize: "11.206px",
            letterSpacing: "-0.7844px",
            lineHeight: "normal",
            color: "black",
          }}
        >
          {card.rating}
        </span>
      </div>

      {/* ── Bank icon circle ── */}
      <div
        className="absolute"
        style={{ left: "13px", top: "187px" }}
      >
        <svg width="26.895" height="26.895" fill="none" viewBox="0 0 26.8949 26.8949">
          <rect fill="white" height="26.1375" rx="13.0687" width="26.1375" x="0.378718" y="0.378718" />
          <rect height="26.1375" rx="13.0687" stroke="black" strokeWidth="0.757436" width="26.1375" x="0.378718" y="0.378718" />
          <path d={svgPaths.p2dfcd280} fill="black" />
        </svg>
      </div>

      {/* ── Tag pill (overlapping bank icon) ── */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "29px",
          top: "186px",
          backgroundColor: "#262626",
          borderRadius: "30.884px",
          paddingLeft: "7.315px",
          paddingRight: "8.127px",
          paddingTop: "6.439px",
          paddingBottom: "6.439px",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            inset: "-0.757px",
            border: "0.757px solid #262626",
            borderRadius: "31.641px",
          }}
        />
        <span
          className="font-['KMR_Waldenburg:Buch',sans-serif]"
          style={{
            fontSize: "12px",
            letterSpacing: "-0.84px",
            lineHeight: "normal",
            color: "#e8e8e8",
          }}
        >
          {card.tag}
        </span>
      </div>

      {/* ── Status + hours row ── */}
      <div className="absolute flex items-center" style={{ top: "196px", left: "164px" }}>
        <span
          className="font-['KMR_Waldenburg:Buch',sans-serif]"
          style={{
            fontSize: "12px",
            letterSpacing: "-0.84px",
            lineHeight: "normal",
            color: "#908a8a",
          }}
        >
          {card.status}
        </span>
        {card.hours && (
          <>
            <div
              className="rounded-full"
              style={{
                width: "3.735px",
                height: "3.735px",
                backgroundColor: "#c5c5c5",
                marginLeft: "6px",
                marginRight: "6px",
              }}
            />
            <span
              className="font-['KMR_Waldenburg:Buch',sans-serif]"
              style={{
                fontSize: "12px",
                letterSpacing: "-0.84px",
                lineHeight: "normal",
                color: "#908a8a",
              }}
            >
              {card.hours}
            </span>
          </>
        )}
      </div>

      {/* ── Border overlay ── */}
      <div
        className="absolute inset-0 rounded-[12px] pointer-events-none"
        style={{
          borderTop: "0.757px solid rgba(23,23,23,0.9)",
          borderLeft: "0.757px solid rgba(23,23,23,0.9)",
          borderRight: "0.757px solid rgba(23,23,23,0.9)",
          borderBottom: "1.5px solid rgba(23,23,23,0.9)",
        }}
      />
    </div>
  );
}
