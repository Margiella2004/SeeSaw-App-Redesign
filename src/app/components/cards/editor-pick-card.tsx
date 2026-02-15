/**
 * EditorPickCard — Card for "Editors Picks" section.
 * Structure: full background image (map + person photo + logo composite),
 * white rounded-top overlay at bottom ~42%, "Editor's Picks" label + bold title,
 * thick black bottom border with thin black side/top borders.
 * Matches Figma GalleryClosed2/3 and the reference screenshot.
 */

export interface EditorPickCardData {
  id: string;
  backgroundSrc: string;
  title: string;              // e.g. "Chelsea gallery picks for NYC"
  label?: string;             // e.g. "Editor's Picks"
}

export function EditorPickCard({
  card,
  onClick,
  className = "",
}: {
  card: EditorPickCardData;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`shrink-0 relative cursor-pointer ${className}`}
      style={{ width: "188px", height: "224px" }}
      onClick={onClick}
    >
      {/* ── Outer rounded clip container ── */}
      <div className="absolute inset-0 rounded-[12px] overflow-hidden">
        {/* ── Background image (map + person photo + logo baked in) ── */}
        <img
          src={card.backgroundSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ── White rounded-top overlay at bottom ── */}
        <div
          className="absolute bg-white"
          style={{
            left: "-12px",
            right: "-12px",
            bottom: "-6px",
            height: "100px",
            borderRadius: "20px 20px 0 0",
          }}
        />

        {/* ── "Editor's Picks" label ── */}
        <p
          className="absolute font-['KMR_Waldenburg:Normal',sans-serif]"
          style={{
            fontSize: "12px",
            letterSpacing: "-0.84px",
            lineHeight: "normal",
            color: "#888787",
            fontWeight: 500,
            left: "12px",
            top: "142px",
          }}
        >
          {card.label || "Editor's Picks"}
        </p>

        {/* ── Title text ── */}
        <p
          className="absolute font-['KMR_Waldenburg:Halbfett',sans-serif]"
          style={{
            fontSize: "15px",
            letterSpacing: "-0.6px",
            lineHeight: "normal",
            color: "#646363",
            fontWeight: 600,
            left: "12px",
            right: "6px",
            top: "164px",
          }}
        >
          {card.title}
        </p>
      </div>

      {/* ── Border overlay (thick black bottom, thin sides/top) ── */}
      <div
        className="absolute inset-0 rounded-[12px] pointer-events-none"
        style={{
          borderTop: "0.5px solid rgba(0,0,0,0.9)",
          borderLeft: "0.5px solid rgba(0,0,0,0.9)",
          borderRight: "0.5px solid rgba(0,0,0,0.9)",
          borderBottom: "2px solid rgba(0,0,0,0.9)",
        }}
      />
    </div>
  );
}
