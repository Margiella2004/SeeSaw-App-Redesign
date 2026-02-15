/**
 * ArtistsSheetContent — Content for the Artists bottom sheet popup.
 * Fully data-driven: accepts list of artist names to display with follow buttons.
 */
import svgPaths from "../../imports/svg-acowqhrxgd";
import { FollowButton } from "./gallery-ui";
import type { ArtistInfo } from "./gallery-data";

/** Single artist avatar placeholder — gray circle with centered + icon */
function ArtistAvatar({ size = 49.78, avatarSrc }: { size?: number; avatarSrc?: string }) {
  const iconSize = 11.746;
  const iconOffset = (size - iconSize) / 2;
  return (
    <div
      className="bg-[#ededed] overflow-hidden rounded-full shrink-0"
      style={{ width: `${size}px`, height: `${size}px`, position: "relative" }}
    >
      {avatarSrc ? (
        <img src={avatarSrc} alt="" className="absolute inset-0 w-full h-full object-cover rounded-full" />
      ) : (
        <svg
          className="block"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 11.7458 11.7458"
          style={{
            position: "absolute",
            left: `${iconOffset}px`,
            top: `${iconOffset}px`,
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
        >
          <rect fill="#C3C3C3" height="11.7458" rx="5.87288" width="11.7458" />
          <path d={svgPaths.p4e61c00} fill="#E9E9E9" />
        </svg>
      )}
    </div>
  );
}

/** Single row — avatar + name + follow button */
function ArtistRow({ artist }: { artist: ArtistInfo }) {
  return (
    <div className="flex items-center justify-between py-[3px]">
      <div className="flex items-center gap-[9px]">
        <ArtistAvatar avatarSrc={artist.avatarSrc} />
        <span
          className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
          style={{
            fontSize: "12px",
            letterSpacing: "-0.6px",
            lineHeight: "normal",
            color: "#535353",
            fontWeight: 600,
          }}
        >
          {artist.name}
        </span>
      </div>
      <FollowButton />
    </div>
  );
}

/** Down-arrow icon next to "Artists" heading */
function DownArrowIcon() {
  return (
    <svg width="17" height="15.54" fill="none" viewBox="0 0 17 15.5429" className="shrink-0">
      <path d={svgPaths.p11c2c680} fill="#4E4E4E" />
    </svg>
  );
}

export function ArtistsSheetContent({
  artists,
  subtitle = "8 users in crawls",
  heading = "Artists",
  onClose,
}: {
  artists: ArtistInfo[];
  subtitle?: string;
  heading?: string;
  onClose: () => void;
}) {
  return (
    <div className="px-[12px] pb-[24px]">
      {/* Subtitle */}
      <p
        className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
        style={{
          fontSize: "10px",
          letterSpacing: "-0.3px",
          lineHeight: "normal",
          color: "#343333",
          marginTop: "8px",
        }}
      >
        {subtitle}
      </p>

      {/* Heading + down-arrow */}
      <div className="flex items-center gap-[6px] mt-[4px]">
        <p
          className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
          style={{
            fontSize: "35px",
            letterSpacing: "-1.75px",
            lineHeight: "56.249px",
            color: "#494949",
            fontWeight: 600,
          }}
        >
          {heading}
        </p>
        <DownArrowIcon />
      </div>

      {/* Artist list */}
      <div className="flex flex-col gap-[12px] mt-[16px]">
        {artists.map((artist) => (
          <ArtistRow key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
