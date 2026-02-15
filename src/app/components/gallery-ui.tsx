/**
 * Reusable UI primitives for the gallery app.
 * All components accept customization props so they can be reused across screens.
 */
import type { ReactNode, CSSProperties } from "react";
import {
  IconChevronLeft,
  IconShare,
  IconChevronDown,
  IconBank,
  IconPlus,
  IconHeartLarge,
} from "./icons";

/* ══════════════════════════════════════════════
   TYPOGRAPHY
   ══════════════════════════════════════════════ */

/** Section heading — "Press Release", "Artists Information", "Gallery", "Location" */
export function SectionHeading({
  children,
  className = "",
  font = "medium", // "medium" uses Neue Haas Grotesk, "bold" uses KMR Halbfett
}: {
  children: ReactNode;
  className?: string;
  font?: "medium" | "bold";
}) {
  const fontFamily =
    font === "medium"
      ? "'Neue Haas Grotesk Display Pro', 'Neue_Haas_Grotesk_Display_Pro:65_Medium', sans-serif"
      : "'KMR Waldenburg Halbfett', 'KMR_Waldenburg:Halbfett', sans-serif";

  return (
    <h2
      className={className}
      style={{
        fontFamily,
        fontSize: "15px",
        letterSpacing: "-0.45px",
        fontWeight: 500,
        lineHeight: "normal",
        color: "#3f3f3f",
      }}
    >
      {children}
    </h2>
  );
}

/** Detail label text — "Days Open:", "Hours:", field labels */
export function DetailLabel({
  children,
  color = "#393838",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`font-['KMR_Waldenburg:Normal',sans-serif] ${className}`}
      style={{ fontSize: "9px", letterSpacing: "-0.27px", lineHeight: "normal", color }}
    >
      {children}
    </span>
  );
}

/** Detail value text — "Mon-Fri", "10am-9pm", etc. */
export function DetailValue({
  children,
  color = "#767373",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`font-['KMR_Waldenburg:Normal',sans-serif] ${className}`}
      style={{ fontSize: "9px", letterSpacing: "-0.27px", lineHeight: "normal", color }}
    >
      {children}
    </span>
  );
}

/** Info pair — icon + text, used for location, status, contact, etc. */
export function IconLabel({
  icon,
  text,
  gap = 5,
  textColor = "#8c9096",
  textSize = "12px",
  textTracking = "-0.36px",
  fontFamily = "'KMR Waldenburg Buch', 'KMR_Waldenburg:Buch', sans-serif",
  className = "",
}: {
  icon: ReactNode;
  text: string;
  gap?: number;
  textColor?: string;
  textSize?: string;
  textTracking?: string;
  fontFamily?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`} style={{ gap: `${gap}px` }}>
      {icon}
      <span style={{ fontFamily, fontSize: textSize, letterSpacing: textTracking, lineHeight: "normal", color: textColor }}>
        {text}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   BUTTONS
   ══════════════════════════════════════════════ */

/** Pill-shaped back button — "< results" */
export function BackButton({
  label = "results",
  className = "",
  style,
  onClick,
}: {
  label?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-white cursor-pointer ${className}`}
      style={{ borderRadius: "67.302px", border: "none", padding: 0, ...style }}
    >
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{
          gap: "6.349px",
          paddingLeft: "12.698px",
          paddingRight: "12.698px",
          paddingTop: "8.889px",
          paddingBottom: "8.889px",
          borderRadius: "inherit",
        }}
      >
        <IconChevronLeft size={10.37} color="black" />
        <span
          style={{
            fontFamily: "'KMR Waldenburg Buch', 'KMR_Waldenburg:Buch', sans-serif",
            fontSize: "15px",
            letterSpacing: "-0.45px",
            lineHeight: "normal",
            color: "black",
            flexShrink: 0,
          }}
        >
          {label}
        </span>
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ border: "1px solid black", borderRadius: "67.302px" }}
      />
    </button>
  );
}

/** Circle icon button — share, etc. */
export function CircleButton({
  icon,
  size = 36,
  bgColor = "white",
  borderColor = "black",
  className = "",
  style,
  onClick,
}: {
  icon: ReactNode;
  size?: number;
  bgColor?: string;
  borderColor?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center rounded-full cursor-pointer ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, backgroundColor: bgColor, border: "none", padding: 0, ...style }}
    >
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ inset: "-1px", border: `1px solid ${borderColor}` }}
      />
      {icon}
    </button>
  );
}

/** Share button — pre-configured CircleButton with share icon */
export function ShareButton({
  size = 36,
  className = "",
  style,
  onClick,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <CircleButton
      icon={<IconShare size={14.538} color="black" />}
      size={size}
      className={className}
      style={style}
      onClick={onClick}
    />
  );
}

/** Dark expand circle button — used below text truncation */
export function ExpandButton({
  size = 22,
  className = "",
  onClick,
}: {
  size?: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-[#171717] rounded-full flex items-center justify-center cursor-pointer ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, padding: 0, border: "1px solid rgba(217,217,217,0.64)", lineHeight: 0, fontSize: 0 }}
    >
      <IconChevronDown size={10} color="white" />
    </button>
  );
}

/** Heart FAB — large dark heart that overlaps hero bottom */
export function HeartFab({
  size = 57,
  active = false,
  className = "",
  onClick,
}: {
  size?: number;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className={`cursor-pointer bg-transparent border-none p-0 ${className}`}>
      <IconHeartLarge size={size} color={active ? "#ED4B75" : "#CDC9C9"} />
    </button>
  );
}

/** Follow button — dark button with + icon */
export function FollowButton({
  label = "Follow",
  className = "",
  onClick,
}: {
  label?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-[#2d2d2d] rounded-[4px] flex items-center gap-[5px] px-[8px] py-[6px] border-[1.5px] border-white cursor-pointer ${className}`}
    >
      <IconPlus size={7} color="#C3C3C3" />
      <span className="font-['KMR_Waldenburg:Normal',sans-serif] text-[#c3c3c3] text-[9px] tracking-[-0.27px]">
        {label}
      </span>
    </button>
  );
}

/* ══════════════════════════════════════════════
   BADGES & PILLS
   ══════════════════════════════════════════════ */

/** Gallery badge — bank icon circle + name pill */
export function GalleryBadge({
  name,
  iconSize = 15,
  circleSize = 27,
  className = "",
  onClick,
}: {
  name: string;
  iconSize?: number;
  circleSize?: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div className={`flex items-center ${className}`} onClick={onClick} style={{ cursor: onClick ? "pointer" : undefined }}>
      <div
        className="rounded-full border border-black flex items-center justify-center bg-white shrink-0"
        style={{ width: `${circleSize}px`, height: `${circleSize}px`, zIndex: 0 }}
      >
        <IconBank size={iconSize} color="black" />
      </div>
      <span
        className="bg-[#dddcdc] rounded-full py-[6px] text-[#535353] text-[12px] tracking-[-0.84px] font-['KMR_Waldenburg:Buch',sans-serif]"
        style={{ paddingLeft: `${circleSize * 0.5}px`, paddingRight: "8px", marginLeft: `${-circleSize * 0.5}px`, zIndex: 1 }}
      >
        {name}
      </span>
    </div>
  );
}

/** Gallery row with icon + name + follow button */
export function GalleryRow({
  name,
  iconSize = 13,
  circleSize = 25,
  borderColor = "#414040",
  showFollow = true,
  followLabel = "Follow",
  className = "",
  onFollow,
}: {
  name: string;
  iconSize?: number;
  circleSize?: number;
  borderColor?: string;
  showFollow?: boolean;
  followLabel?: string;
  className?: string;
  onFollow?: () => void;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-[6px]">
        <div
          className="rounded-full flex items-center justify-center"
          style={{ width: `${circleSize}px`, height: `${circleSize}px`, border: `1px solid ${borderColor}` }}
        >
          <IconBank size={iconSize} color="#333333" />
        </div>
        <span className="font-['KMR_Waldenburg:Normal',sans-serif] text-[#333] text-[9px] tracking-[-0.27px]">{name}</span>
      </div>
      {showFollow && <FollowButton label={followLabel} onClick={onFollow} />}
    </div>
  );
}

/** Outline tag pill — used for Medium tags */
export function TagPill({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        borderRadius: "27.024px",
        border: "0.772px solid #282727",
        paddingLeft: "11px",
        paddingRight: "11px",
        paddingTop: "6px",
        paddingBottom: "6px",
      }}
    >
      <span
        style={{
          fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
          fontSize: "11.582px",
          letterSpacing: "-0.3475px",
          color: "#333",
          lineHeight: "normal",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/** Dark tag pill — used inside SmallGalleryCard */
export function DarkTagPill({
  label,
  className = "",
  style,
}: {
  label: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      <div
        className="relative flex items-center justify-center"
        style={{
          backgroundColor: "#383838",
          borderRadius: "20.387px",
          paddingLeft: "4.83px",
          paddingRight: "5.37px",
          paddingTop: "4.25px",
          paddingBottom: "4.25px",
        }}
      >
        <div
          className="absolute pointer-events-none"
          style={{ inset: "-0.5px", border: "0.5px solid #464646", borderRadius: "20.887px" }}
        />
        <span
          style={{
            fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
            fontWeight: 400,
            fontSize: "7.397px",
            letterSpacing: "-0.518px",
            lineHeight: "normal",
            color: "#e8e8e8",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   AVATAR GROUP
   ══════════════════════════════════════════════ */

/** Overlapping avatar circles with optional count and name pill */
export function AvatarGroup({
  avatars,
  extraCount,
  namePillText,
  avatarSize = 19.25,
  overlap = -10,
  borderWidth = 1.1,
  className = "",
}: {
  avatars: string[];
  extraCount?: number;
  namePillText?: string;
  avatarSize?: number;
  overlap?: number;
  borderWidth?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`} style={{ paddingRight: "10px" }}>
      {avatars.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="rounded-full object-cover"
          style={{
            width: `${avatarSize}px`,
            height: `${avatarSize}px`,
            border: `${borderWidth}px solid white`,
            marginRight: `${overlap}px`,
            flexShrink: 0,
          }}
        />
      ))}
      {extraCount != null && (
        <span
          className="rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "#c4c4c4",
            width: `${avatarSize}px`,
            height: `${avatarSize}px`,
            border: `${borderWidth}px solid white`,
            marginRight: `${overlap}px`,
            flexShrink: 0,
            fontSize: "7.5px",
            color: "#f4f4f4",
            lineHeight: "normal",
          }}
        >
          +{extraCount}
        </span>
      )}
      {namePillText && (
        <div
          className="flex items-center justify-center relative"
          style={{
            backgroundColor: "#dddcdc",
            borderRadius: "20.895px",
            paddingLeft: "4.95px",
            paddingRight: "5.5px",
            paddingTop: "5.5px",
            paddingBottom: "5.5px",
            marginRight: `${overlap}px`,
            flexShrink: 0,
          }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              inset: `-${borderWidth}px`,
              border: `${borderWidth}px solid white`,
              borderRadius: "21.995px",
            }}
          />
          <span
            style={{
              fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
              fontSize: "5.521px",
              letterSpacing: "-0.166px",
              lineHeight: "normal",
              color: "#333",
            }}
          >
            {namePillText}
          </span>
        </div>
      )}
    </div>
  );
}

/** Larger avatar group — used in Artists Information section */
export function ArtistAvatarGroup({
  avatars,
  nameText,
  avatarSize = 31.37,
  overlap = -14,
  borderWidth = 1.793,
  className = "",
}: {
  avatars: string[];
  nameText?: string;
  avatarSize?: number;
  overlap?: number;
  borderWidth?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      {avatars.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="rounded-full object-cover"
          style={{
            width: `${avatarSize}px`,
            height: `${avatarSize}px`,
            border: `${borderWidth}px solid white`,
            marginLeft: i > 0 ? `${overlap}px` : undefined,
            flexShrink: 0,
          }}
        />
      ))}
      {nameText && (
        <div
          className="flex items-center justify-center"
          style={{
            backgroundColor: "#dddcdc",
            borderRadius: "34.059px",
            border: `${borderWidth}px solid white`,
            paddingLeft: "8.07px",
            paddingRight: "8.96px",
            paddingTop: "8.96px",
            paddingBottom: "8.96px",
            marginLeft: `${overlap}px`,
            flexShrink: 0,
          }}
        >
          <span
            className="whitespace-nowrap"
            style={{
              fontFamily: "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
              fontSize: "9px",
              letterSpacing: "-0.27px",
              color: "#333",
              lineHeight: "normal",
            }}
          >
            {nameText}
          </span>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   NAVIGATION & INDICATORS
   ══════════════════════════════════════════════ */

/** Carousel dot indicators */
export function CarouselDots({
  total = 4,
  active = 0,
  activeSize = 7,
  inactiveSize = 6,
  activeColor = "white",
  inactiveColor = "#DDDCDC",
  gap = 2.5,
  className = "",
}: {
  total?: number;
  active?: number;
  activeSize?: number;
  inactiveSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  gap?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ gap: `${gap}px` }}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        const s = isActive ? activeSize : inactiveSize;
        return (
          <div
            key={i}
            className="rounded-full"
            style={{ width: `${s}px`, height: `${s}px`, backgroundColor: isActive ? activeColor : inactiveColor }}
          />
        );
      })}
    </div>
  );
}

/** Tab bar — "Info" / "Reviews" style tabs */
export function TabBar({
  tabs,
  activeIndex = 0,
  height = 25,
  className = "",
  onTabChange,
}: {
  tabs: string[];
  activeIndex?: number;
  height?: number;
  className?: string;
  onTabChange?: (index: number) => void;
}) {
  return (
    <div
      className={`rounded-[18px] border border-black flex ${className}`}
      style={{ height: `${height}px` }}
    >
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={tab}
            onClick={() => onTabChange?.(i)}
            className="flex-1 flex items-center justify-center cursor-pointer"
            style={{
              borderRadius: "16.5px",
              backgroundColor: isActive ? "#f3f3f3" : "transparent",
              borderBottom: isActive ? "2px solid black" : "none",
              borderLeft: isActive ? "1px solid black" : "none",
              borderRight: isActive ? "1px solid black" : "none",
              borderTop: isActive ? "1px solid black" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "'KMR Waldenburg Buch', 'KMR_Waldenburg:Buch', sans-serif",
                fontSize: "11.196px",
                letterSpacing: "-0.3359px",
                lineHeight: "normal",
                color: isActive ? "#3f3f3f" : "#545454",
              }}
            >
              {tab}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════
   LAYOUT HELPERS
   ══════════════════════════════════════════════ */

/** Horizontal divider */
export function Divider({ className = "" }: { className?: string }) {
  return <div className={`border-b-[0.5px] border-[#d0d0d0] ${className}`} />;
}

/** Horizontal scroll section — heading + scrollable row of children */
export function ScrollSection({
  title,
  titleFont = "bold",
  gap = 10,
  paddingLeft = 16,
  paddingRight = 16,
  className = "",
  seeAll = false,
  children,
}: {
  title: string;
  titleFont?: "medium" | "bold";
  gap?: number;
  paddingLeft?: number;
  paddingRight?: number;
  className?: string;
  seeAll?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between px-[16px]">
        <SectionHeading font={titleFont}>
          {title}
        </SectionHeading>
        {seeAll && (
          <span
            className="font-['KMR_Waldenburg:Buch',sans-serif] text-[#585a5e] underline cursor-pointer"
            style={{ fontSize: "10px", letterSpacing: "-0.3px", lineHeight: "normal" }}
          >
            See All
          </span>
        )}
      </div>
      <div
        className="flex overflow-x-auto no-scrollbar mt-[10px]"
        style={{ gap: `${gap}px`, paddingLeft: `${paddingLeft}px`, paddingRight: `${paddingRight}px` }}
      >
        {children}
      </div>
    </div>
  );
}

/** Text block with gradient fade + expand button */
export function TruncatedText({
  text,
  className = "",
  onExpand,
}: {
  text: string;
  className?: string;
  onExpand?: () => void;
}) {
  return (
    <div className={`relative ${className}`}>
      <p className="font-['KMR_Waldenburg:Normal',sans-serif] text-[#403d3d] text-[10px] tracking-[-0.3px] leading-[1.39]">
        {text}
      </p>
      <div
        className="absolute bottom-0 left-0 right-0 h-[40px] rounded-t-[20px] flex items-end justify-center pb-[4px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(238,237,237,0.0) 0%, rgba(238,237,237,0.83) 40%, rgb(255,255,255) 100%)",
        }}
      >
        <ExpandButton onClick={onExpand} />
      </div>
    </div>
  );
}
