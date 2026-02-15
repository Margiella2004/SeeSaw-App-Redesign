/**
 * Reusable SVG icon components extracted from Figma.
 * Every icon accepts `size` and `color` props for easy customization.
 */
import svgPaths from "../../imports/svg-upziid61bw";
import svgPaths2 from "../../imports/svg-yshwks8jnh";

/* ── Types ── */
export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/* ── Location / Map Pin ── */
export function IconPin({ size = 11, color = "#8C9096", className }: IconProps) {
  return (
    <svg width={size} height={size * 1.43} fill="none" viewBox="0 0 10.4724 14.9606" className={className}>
      <path d={svgPaths.p15d50e00} fill={color} />
    </svg>
  );
}

/* ── Clock ── */
export function IconClock({ size = 14, color = "#8C9096", className }: IconProps) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 15.584 15.584" className={className}>
      <path d={svgPaths.p1c64c700} fill={color} />
    </svg>
  );
}

/* ── Phone ── */
export function IconPhone({ size = 16, color = "#676C72", className }: IconProps) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 16 16" className={`shrink-0 ${className ?? ""}`}>
      <path d={svgPaths.p34755f0} fill={color} />
    </svg>
  );
}

/* ── Globe / Website ── */
export function IconGlobe({ size = 16, color = "#676C72", className }: IconProps) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 18 18" className={`shrink-0 ${className ?? ""}`}>
      <path d={svgPaths.p1cf14480} fill={color} />
    </svg>
  );
}

/* ── Location Pin (large, for address) ── */
export function IconLocationPin({ size = 13, color = "#676C72", className }: IconProps) {
  return (
    <svg width={size} height={size * 1.31} fill="none" viewBox="0 0 13 17" className={`shrink-0 ${className ?? ""}`}>
      <path d={svgPaths.p7c91d00} fill={color} />
    </svg>
  );
}

/* ── Bank / Gallery building ── */
export function IconBank({ size = 14, color = "#333333", className }: IconProps) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 13.4663 13.4659" className={className}>
      <path d={svgPaths.p334a7df0} fill={color} />
    </svg>
  );
}

/* ── Plus ── */
export function IconPlus({ size = 7, color = "#C3C3C3", className }: IconProps) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 6.80973 6.80973" className={className}>
      <path d={svgPaths.p47b4e00} fill={color} />
    </svg>
  );
}

/* ── Heart (small, in dark circle) ── */
export function IconHeart({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size * 0.72} fill="none" viewBox="0 0 18.2559 18.2559" className={className}>
      <rect fill="black" height="17.69" rx="8.84" width="17.69" x="0.28" y="0.28" />
      <path d={svgPaths.p167df300} fill="#F8F8F8" />
    </svg>
  );
}

/* ── Chevron Left (for back button) ── */
export function IconChevronLeft({ size = 10.37, color = "black", className }: IconProps) {
  const h = size * (17.778 / 10.37);
  return (
    <svg width={size} height={h} fill="none" viewBox="0 0 10.3704 17.7778" className={className}>
      <path d={svgPaths.p1fb83480} fill={color} />
    </svg>
  );
}

/* ── Chevron Down (for expand button) ── */
export function IconChevronDown({ size = 10, color = "white", className }: IconProps) {
  const h = size * (6.846 / 11.072);
  return (
    <svg width={size} height={h} fill="none" viewBox="0 0 11.0718 6.84607" className={className}>
      <path d={svgPaths.p1e850480} fill={color} />
    </svg>
  );
}

/* ── Share / Upload ── */
export function IconShare({ size = 14.538, color = "black", className }: IconProps) {
  const h = size * (19.989 / 14.538);
  return (
    <svg width={size} height={h} fill="none" viewBox="0 0 14.5377 19.9893" className={className}>
      <path d={svgPaths.p37ff7e80} fill={color} />
    </svg>
  );
}

/* ── Home (bottom nav) ── */
export function IconHome({ size = 22, color = "black", className }: IconProps) {
  const h = size * (20.4 / 24);
  return (
    <svg width={size} height={h} fill="none" viewBox="0 0 24 20.4" className={className}>
      <path d={svgPaths.p3e813400} fill={color} />
    </svg>
  );
}

/* ── Discover / Search (bottom nav circle) ── */
export function IconDiscover({ size = 38, active = true, className }: IconProps & { active?: boolean }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 40 40" className={className}>
      <rect fill={active ? "#060606" : "white"} height="39" rx="19.5" width="39" x="0.5" y="0.5" />
      <rect height="39" rx="19.5" stroke="#060606" width="39" x="0.5" y="0.5" />
      <path d={svgPaths.p12e47700} fill={active ? "white" : "black"} />
    </svg>
  );
}

/* ── User (bottom nav) ── */
export function IconUser({ size = 19, color = "#B4B4B4", className }: IconProps) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 19.2 19.2" className={className}>
      <path d={svgPaths.p2a857280} fill={color} />
    </svg>
  );
}

/* ── Large Heart (hero FAB) ── */
export function IconHeartLarge({
  size = 57,
  color = "#CDC9C9",
  className,
}: IconProps) {
  const h = size * (55.646 / 57.296);
  return (
    <svg width={size} height={h} fill="none" viewBox="0 0 57.2963 55.6463" className={className}>
      <rect fill="#262626" height="54.65" rx="27.32" width="56.3" x="0.5" y="0.5" />
      <rect height="54.65" rx="27.32" stroke="black" width="56.3" x="0.5" y="0.5" />
      <path d={svgPaths.p2623d700} fill={color} />
    </svg>
  );
}

/* ── Bank icon inside small rounded rect (for card tags) ── */
export function IconBankInCircle({ size = 15.88, color = "black", className }: IconProps) {
  const h = size * (17.75 / 15.88);
  return (
    <svg width={size} height={h} fill="none" viewBox="0 0 15.88 17.75" className={className}>
      <rect x="0.25" y="0.25" width="15.38" height="17.25" rx="7.69" stroke={color} strokeWidth="0.5" />
      <g transform="translate(2.5, 2.5) scale(0.8)">
        <path d={svgPaths.p334a7df0} fill={color} />
      </g>
    </svg>
  );
}

/* ── Heart Outline (for review likes) ── */
export function IconHeartOutline({ size = 10, color = "#E2E2E2", className }: IconProps) {
  const h = size * (9.477 / 10.329);
  return (
    <svg width={size} height={h} fill="none" viewBox="0 0 10.3288 9.47664" className={className}>
      <path d={svgPaths2.p6c86800} fill={color} />
    </svg>
  );
}

/* ── Comment Bubble (for review comments) ── */
export function IconComment({ size = 10, color = "#E2E2E2", className }: IconProps) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 10 10" className={className}>
      <path d={svgPaths2.p19cc0100} fill={color} />
    </svg>
  );
}

/* ── Pencil / Edit (for Review Gallery button) ── */
export function IconPencil({ size = 11, color = "#2D2D2D", className }: IconProps) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 10.9124 10.9124" className={className}>
      <path d={svgPaths2.p1f701800} fill={color} />
    </svg>
  );
}

/* ── Small Chevron Down (for filter/sort pills) ── */
export function IconChevronDownSmall({ size = 10, color = "black", className }: IconProps) {
  const h = size * (5 / 10);
  return (
    <svg width={size} height={h} fill="none" viewBox="0 0 10 5" className={className}>
      <path d={svgPaths2.p14883a80} stroke={color} strokeWidth="0.7" />
    </svg>
  );
}
