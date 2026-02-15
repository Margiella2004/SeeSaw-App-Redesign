/**
 * SmallGalleryCard — 161×115px card used in "Similar Shows" section.
 * Features: 3-column thumbnails, name + rating, bank icon tag pill, status text.
 */
import { IconBankInCircle } from "../icons";
import { DarkTagPill } from "../gallery-ui";

export interface SmallGalleryCardProps {
  name: string;
  thumbnails: string[];
  rating: string;
  status: string;
  statusColor?: string;
  tag?: string;
  width?: number;
  height?: number;
  thumbnailHeight?: number;
  className?: string;
  onClick?: () => void;
}

export function SmallGalleryCard({
  name,
  thumbnails,
  rating,
  status,
  statusColor = "#ed2115",
  tag,
  width = 161,
  height = 115,
  thumbnailHeight = 61,
  className = "",
  onClick,
}: SmallGalleryCardProps) {
  return (
    <div
      className={`shrink-0 rounded-[8px] overflow-hidden bg-white relative cursor-pointer ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      {/* Thumbnail area */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden rounded-tl-[7px] rounded-tr-[7px]"
        style={{ height: `${thumbnailHeight}px` }}
      >
        <div className="flex h-full">
          {thumbnails.map((src, i) => (
            <div key={i} className="relative flex-1 min-w-0">
              <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Gallery name + rating badge */}
      <div
        className="absolute flex items-center justify-between"
        style={{ left: "8px", right: "5px", top: `${thumbnailHeight + 5}px` }}
      >
        <span
          style={{
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
        <span
          className="bg-[#d8d8d8] rounded-full flex items-center justify-center"
          style={{
            width: "16px",
            height: "16px",
            fontSize: "7.4px",
            letterSpacing: "-0.52px",
            lineHeight: "normal",
            color: "black",
            fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
          }}
        >
          {rating}
        </span>
      </div>

      {/* Tag row: bank icon circle + dark pill */}
      {tag && (
        <>
          <div className="absolute" style={{ left: "7px", top: "84px" }}>
            <IconBankInCircle size={15.88} color="black" />
          </div>
          <DarkTagPill
            label={tag}
            className="absolute"
            style={{ left: "17.76px", top: "84.37px" }}
          />
        </>
      )}

      {/* Status text */}
      <span
        className="absolute"
        style={{
          left: "125px",
          top: "95px",
          fontSize: "7.397px",
          letterSpacing: "-0.518px",
          lineHeight: "normal",
          fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
          color: statusColor,
        }}
      >
        {status}
      </span>

      {/* Border overlay */}
      <div className="absolute inset-0 rounded-[8px] border-[rgba(0,0,0,0.9)] border-b-[1.5px] border-l-[0.5px] border-r-[0.5px] border-t-[0.5px] pointer-events-none" />
    </div>
  );
}
