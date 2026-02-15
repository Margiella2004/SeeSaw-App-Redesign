/**
 * Reusable UI primitives for the Reviews section.
 * All components accept customization props for reuse across screens.
 */
import type { ReactNode } from "react";
import {
  IconHeartOutline,
  IconComment,
  IconPencil,
  IconChevronDownSmall,
} from "./icons";

/* ══════════════════════════════════════════════
   RATING DISPLAY
   ══════════════════════════════════════════════ */

/** Large rating display — "3.5 avg" */
export function RatingDisplay({
  rating = "3.5",
  suffix = "avg",
  className = "",
}: {
  rating?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline ${className}`}>
      <span
        style={{
          fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
          fontWeight: 400,
          fontSize: "32px",
          letterSpacing: "-1.6px",
          lineHeight: "56.249px",
          color: "#2c2c2c",
        }}
      >
        {rating}
      </span>
      <span
        style={{
          fontFamily: "'KMR Waldenburg Halbfett', 'KMR_Waldenburg:Halbfett', sans-serif",
          fontSize: "12px",
          letterSpacing: "-0.36px",
          lineHeight: "normal",
          color: "#2c2c2c",
          marginLeft: "2px",
        }}
      >
        {suffix}
      </span>
    </div>
  );
}

/** Review count text — "333 reviews for Gallery" */
export function ReviewCount({
  count = 333,
  label = "Gallery",
  className = "",
}: {
  count?: number;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "'KMR Waldenburg Halbfett', 'KMR_Waldenburg:Halbfett', sans-serif",
        fontSize: "12px",
        letterSpacing: "-0.36px",
        lineHeight: "normal",
        color: "#535252",
      }}
    >
      {count} reviews for {label}
    </span>
  );
}

/* ══════════════════════════════════════════════
   BUTTONS & PILLS
   ══════════════════════════════════════════════ */

/** "Review Gallery" CTA button */
export function ReviewGalleryButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`relative flex items-center justify-center gap-[6.953px] cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        paddingLeft: "90px",
        paddingRight: "90px",
        paddingTop: "11px",
        paddingBottom: "11px",
        borderRadius: "5.215px",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ border: "0.97px solid #2d2d2d", borderRadius: "5.215px" }}
      />
      <IconPencil size={10.912} color="#2D2D2D" />
      <span
        style={{
          fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
          fontSize: "10.912px",
          letterSpacing: "-0.3274px",
          lineHeight: "normal",
          color: "#2d2d2d",
        }}
      >
        Review Gallery
      </span>
    </div>
  );
}

/** Filter/Sort pill with dropdown chevron */
export function FilterPill({
  label,
  className = "",
  onClick,
}: {
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`relative flex items-center justify-center gap-[7.721px] cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        paddingLeft: "7.721px",
        paddingRight: "7.721px",
        paddingTop: "5.405px",
        paddingBottom: "5.405px",
        borderRadius: "27.024px",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ border: "0.772px solid #282727", borderRadius: "27.024px" }}
      />
      <span
        style={{
          fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
          fontSize: "11.582px",
          letterSpacing: "-0.3475px",
          lineHeight: "normal",
          color: "#333",
        }}
      >
        {label}
      </span>
      <IconChevronDownSmall size={10} color="black" />
    </div>
  );
}

/** Small rating circle badge — "3.6" */
export function RatingBadge({
  rating = "3.6",
  size = 24.279,
  className = "",
}: {
  rating?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "39.221px",
        border: "0.757px solid black",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
          fontWeight: 400,
          fontSize: "11.206px",
          letterSpacing: "-0.7844px",
          lineHeight: "normal",
          color: "black",
        }}
      >
        {rating}
      </span>
    </div>
  );
}

/** "Art Critic" badge */
export function ArtCriticBadge({
  label = "Art Critic",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        backgroundColor: "#5f5c5c",
        borderRadius: "2.409px",
        paddingLeft: "3.613px",
        paddingRight: "3.613px",
        paddingTop: "1.807px",
        paddingBottom: "1.807px",
      }}
    >
      <span
        style={{
          fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
          fontSize: "6.704px",
          letterSpacing: "-0.2011px",
          lineHeight: "normal",
          color: "white",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/** Black pill with icon + text — for likes and comments */
export function ActionPill({
  icon,
  text,
  className = "",
  onClick,
}: {
  icon: ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`relative flex items-center justify-center gap-[4px] cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        backgroundColor: "black",
        borderRadius: "20.387px",
        paddingLeft: "5px",
        paddingRight: "7px",
        paddingTop: "4px",
        paddingBottom: "4px",
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{ inset: "-0.5px", border: "0.5px solid black", borderRadius: "20.887px" }}
      />
      {icon}
      <span
        style={{
          fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
          fontWeight: 400,
          fontSize: "9px",
          letterSpacing: "-0.63px",
          lineHeight: "normal",
          color: "#e2e2e2",
        }}
      >
        {text}
      </span>
    </div>
  );
}

/** Pre-configured likes pill */
export function LikesPill({
  count = 330,
  className = "",
  onClick,
}: {
  count?: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <ActionPill
      icon={<IconHeartOutline size={10.329} color="#E2E2E2" />}
      text={`${count} likes`}
      className={className}
      onClick={onClick}
    />
  );
}

/** Pre-configured comments pill */
export function CommentsPill({
  count = 40,
  className = "",
  onClick,
}: {
  count?: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <ActionPill
      icon={<IconComment size={10} color="#E2E2E2" />}
      text={`${count} comments`}
      className={className}
      onClick={onClick}
    />
  );
}

/* ══════════════════════════════════════════════
   REVIEW CARD
   ══════════════════════════════════════════════ */

export interface ReviewData {
  id: string;
  avatarSrc: string;
  name: string;
  rating: string;
  text: string;
  likes: number;
  comments: number;
  isCritic?: boolean;
  criticLabel?: string;
}

/** Full review card — avatar, name, badge, rating, text, action pills */
export function ReviewCard({
  review,
  showTopBorder = true,
  className = "",
}: {
  review: ReviewData;
  showTopBorder?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {/* Top separator line */}
      {showTopBorder && (
        <div style={{ borderTop: "0.5px solid #828181", marginBottom: "12px" }} />
      )}

      {/* Header: Avatar + Name/Badge + Rating */}
      <div className="flex items-start">
        {/* Avatar */}
        <div
          className="rounded-full overflow-hidden shrink-0"
          style={{ width: "33px", height: "33px" }}
        >
          <img
            src={review.avatarSrc}
            alt=""
            className="w-full h-full object-cover rounded-full"
            style={{ border: "2px solid white" }}
          />
        </div>

        {/* Name + Badge */}
        <div className="flex flex-col ml-[6px] flex-1 min-w-0">
          {review.isCritic && (
            <ArtCriticBadge label={review.criticLabel || "Art Critic"} className="self-start" />
          )}
          <span
            style={{
              fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
              fontSize: review.isCritic ? "12px" : "10.831px",
              letterSpacing: review.isCritic ? "-0.36px" : "-0.3249px",
              lineHeight: "normal",
              color: "#333",
              marginTop: review.isCritic ? "2px" : "0",
            }}
          >
            {review.name}
          </span>
        </div>

        {/* Rating badge */}
        <RatingBadge rating={review.rating} className="ml-[8px]" />
      </div>

      {/* Review text */}
      <p
        className="mt-[10px]"
        style={{
          fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
          fontSize: "9px",
          letterSpacing: "-0.27px",
          lineHeight: "1.35",
          color: "#504b4b",
        }}
      >
        {review.text}
      </p>

      {/* Action pills */}
      <div className="flex items-center gap-[10px] mt-[10px]">
        <LikesPill count={review.likes} />
        <CommentsPill count={review.comments} />
      </div>
    </div>
  );
}
