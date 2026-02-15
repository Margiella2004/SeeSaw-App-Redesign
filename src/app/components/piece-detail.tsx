/**
 * PieceDetailContent — Content displayed inside the bottom sheet
 * when a "Piece In Show" artwork card is tapped.
 * Shows artwork image, title, artists, about text, materials tags, and navigation.
 */
import svgPaths from "../../imports/svg-1yfzvbg61n";
import { ArtistAvatarGroup } from "./gallery-ui";
import { portraitImages } from "./curated-images";

const [artistAvatar1, artistAvatar2] = portraitImages;

/* ── Types ── */
export interface PieceData {
  id: string;
  src: string;
  title: string;
  artist: string;
}

/* ── Reusable sub-components ── */

/** Navigation arrow button */
function NavArrow({
  direction,
  disabled = false,
  onClick,
}: {
  direction: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const path =
    direction === "left" ? svgPaths.p3baaea80 : svgPaths.p38215a80;
  const color = disabled ? "#CECACA" : "#888888";

  return (
    <div
      className="cursor-pointer shrink-0"
      style={{ width: "11.838px", height: "13.318px", opacity: disabled ? 0.5 : 1 }}
      onClick={onClick}
    >
      <svg
        width="11.838"
        height="13.318"
        fill="none"
        viewBox="0 0 11.8383 13.3181"
      >
        <path d={path} fill={color} />
      </svg>
    </div>
  );
}

/* ── Placeholder about text ── */
const aboutText =
  "This work is part of Signal to Noise, a series examining how broadcast media shapes memory and public attention. Layered brushwork and projected light recreate the feel of late-night city streets, while the composition references archival television stills collected by the artist over the last decade. ";

/* ── Main component ── */
export function PieceDetailContent({
  piece,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
}: {
  piece: PieceData;
  currentIndex: number;
  totalCount: number;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="relative pb-[20px]">
      {/* ─── Header: navigation arrows + page counter ─── */}
      <div
        className="flex items-center justify-center gap-[16px] px-[19px] py-[4px]"
      >
        <NavArrow
          direction="left"
          disabled={currentIndex === 0}
          onClick={onPrev}
        />
        <span
          style={{
            fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
            fontSize: "13.318px",
            letterSpacing: "-0.3995px",
            lineHeight: "normal",
            color: "#888",
          }}
        >
          {currentIndex + 1} of {totalCount}
        </span>
        <NavArrow
          direction="right"
          disabled={currentIndex === totalCount - 1}
          onClick={onNext}
        />
      </div>

      {/* ─── Artwork Image ─── */}
      <div
        className="mx-auto mt-[6px] overflow-hidden"
        style={{
          width: "265px",
          height: "235px",
          borderRadius: "3.699px",
        }}
      >
        <img
          src={piece.src}
          alt={piece.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ─── Title ─── */}
      <div className="px-[19px] mt-[12px]">
        <h3
          style={{
            fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
            fontSize: "18px",
            letterSpacing: "-0.54px",
            lineHeight: "normal",
            color: "#131313",
          }}
        >
          {piece.title}
        </h3>
      </div>

      {/* ─── Artist Avatar Group ─── */}
      <div className="px-[19px] mt-[12px]">
        <ArtistAvatarGroup
          avatars={[artistAvatar1, artistAvatar2]}
          nameText="Eric White and Alberta Whittle"
        />
      </div>

      {/* ─── About Section ─── */}
      <div className="px-[19px] mt-[18px]">
        <h4
          style={{
            fontFamily: "'KMR Waldenburg Halbfett', 'KMR_Waldenburg:Halbfett', sans-serif",
            fontSize: "13.318px",
            letterSpacing: "-0.3995px",
            lineHeight: "normal",
            color: "#535252",
          }}
        >
          About
        </h4>
        <p
          className="mt-[8px]"
          style={{
            fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
            fontSize: "8.879px",
            letterSpacing: "-0.2664px",
            lineHeight: "1.35",
            color: "#403d3d",
          }}
        >
          {aboutText}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Read More
          </span>
        </p>
      </div>

      {/* ─── Materials Section ─── */}
      <div className="px-[19px] mt-[18px]">
        <h4
          style={{
            fontFamily: "'KMR Waldenburg Halbfett', 'KMR_Waldenburg:Halbfett', sans-serif",
            fontSize: "13.318px",
            letterSpacing: "-0.3995px",
            lineHeight: "normal",
            color: "#535252",
          }}
        >
          Materials
        </h4>
        <div className="flex items-center gap-[6.659px] mt-[8px]">
          {["Architecture", "Painting", "Film"].map((tag) => (
            <div
              key={tag}
              className="relative flex items-center justify-center shrink-0"
              style={{
                borderRadius: "45.473px",
                paddingLeft: "15.068px",
                paddingRight: "15.068px",
                paddingTop: "7.206px",
                paddingBottom: "7.206px",
              }}
            >
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-0.74px",
                  border: "0.74px solid rgba(82,82,82,0.93)",
                  borderRadius: "46.213px",
                }}
              />
              <span
                style={{
                  fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
                  fontSize: "9.827px",
                  letterSpacing: "-0.2948px",
                  lineHeight: "normal",
                  color: "rgba(55,51,51,0.89)",
                }}
              >
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
