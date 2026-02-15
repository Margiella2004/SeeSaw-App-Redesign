/**
 * LargeGalleryCard — 180×133px card used in "Shown In Crawls" section.
 * Features: 3-column thumbnails, name + status, avatar group, extra info row.
 */
import { AvatarGroup } from "../gallery-ui";

export interface LargeGalleryCardProps {
  name: string;
  thumbnails: string[];
  avatars: string[];
  extraCount?: number;
  namePillText?: string;
  statusText?: string;
  extraText?: string;
  extraText2?: string;
  width?: number;
  height?: number;
  thumbnailHeight?: number;
  /** Column widths for the 3 thumbnails (defaults: [69, 64, 72]) */
  columnWidths?: [number, number, number];
  className?: string;
  onClick?: () => void;
}

export function LargeGalleryCard({
  name,
  thumbnails,
  avatars,
  extraCount = 8,
  namePillText = "Eric White ...+2",
  statusText,
  extraText,
  extraText2,
  width = 180,
  height = 133,
  thumbnailHeight = 79,
  columnWidths = [69, 64, 72],
  className = "",
  onClick,
}: LargeGalleryCardProps) {
  return (
    <div
      className={`shrink-0 rounded-[8px] overflow-hidden bg-white relative cursor-pointer ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      {/* Thumbnail area — 3 columns */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden rounded-tl-[8px] rounded-tr-[8px]"
        style={{ height: `${thumbnailHeight}px` }}
      >
        <div className="flex h-full">
          {thumbnails.slice(0, 3).map((src, i) => (
            <div
              key={i}
              className="relative shrink-0 h-full"
              style={{ width: `${columnWidths[i] ?? columnWidths[0]}px` }}
            >
              <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Gallery name */}
      <span
        className="absolute"
        style={{
          left: "5px",
          top: `${thumbnailHeight + 5}px`,
          fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
          fontWeight: 500,
          fontSize: "12px",
          letterSpacing: "-0.84px",
          lineHeight: "normal",
          color: "#5a5a5a",
        }}
      >
        {name}
      </span>

      {/* Status text — right-aligned, same row as name */}
      {statusText && (
        <span
          className="absolute"
          style={{
            right: "8px",
            top: `${thumbnailHeight + 8}px`,
            fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
            fontWeight: 400,
            fontSize: "9px",
            letterSpacing: "-0.63px",
            lineHeight: "normal",
            color: "#908a8a",
          }}
        >
          {statusText}
        </span>
      )}

      {/* Avatar row */}
      <div className="absolute" style={{ left: "5px", top: "105px" }}>
        <AvatarGroup
          avatars={avatars}
          extraCount={extraCount}
          namePillText={namePillText}
        />
      </div>

      {/* Extra info row (e.g. "40 shows • NYC") */}
      {extraText && (
        <>
          <span
            className="absolute"
            style={{
              left: "105px",
              top: "111px",
              fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
              fontWeight: 400,
              fontSize: "9px",
              letterSpacing: "-0.63px",
              lineHeight: "normal",
              color: "#908a8a",
            }}
          >
            {extraText}
          </span>
          {/* Dot separator */}
          <div
            className="absolute rounded-full"
            style={{ left: "145px", top: "117px", width: "2px", height: "2px", backgroundColor: "#b5b2b2" }}
          />
          {extraText2 && (
            <span
              className="absolute"
              style={{
                left: "152px",
                top: "112px",
                fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
                fontWeight: 400,
                fontSize: "9px",
                letterSpacing: "-0.63px",
                lineHeight: "normal",
                color: "#908a8a",
              }}
            >
              {extraText2}
            </span>
          )}
        </>
      )}

      {/* Border overlay */}
      <div className="absolute inset-0 rounded-[8px] border-[rgba(0,0,0,0.9)] border-b-[1.5px] border-l-[0.5px] border-r-[0.5px] border-t-[0.5px] pointer-events-none" />
    </div>
  );
}