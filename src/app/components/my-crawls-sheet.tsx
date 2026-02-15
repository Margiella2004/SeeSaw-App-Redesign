/**
 * MyCrawlsSheet — Content for the "My Crawls" bottom sheet popup.
 * Fully data-driven: accepts crawl rows, subtitle, heading, and section label.
 */
import svgPaths from "../../imports/svg-fno5xglfpj";
import { AnimatePresence, motion } from "motion/react";
import { AvatarGroup } from "./gallery-ui";
import type { CrawlRowData } from "./gallery-data";

/* ── Close (X) button — dark circle with X ── */
function CloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="cursor-pointer shrink-0"
      style={{ width: "39.28px", height: "38px" }}
      onClick={onClick}
    >
      <svg width="39.28" height="38" fill="none" viewBox="0 0 39.2794 38">
        <rect fill="#171717" height="37" rx="18.5" width="38.28" x="0.5" y="0.5" />
        <rect height="37" rx="18.5" stroke="#D9D9D9" strokeWidth="0.995" width="38.28" x="0.5" y="0.5" />
        <path d={svgPaths.p12eb280} fill="#D6D6D6" />
      </svg>
    </div>
  );
}

/* ── Down chevron ── */
function ChevronDown() {
  return (
    <svg width="8" height="5" fill="none" viewBox="0 0 8 5">
      <path d={svgPaths.p3ad4e400} fill="#333333" />
    </svg>
  );
}

/* ── Arrow icon (next to heading) ── */
function CrawlArrow() {
  return (
    <svg width="17" height="15.54" fill="none" viewBox="0 0 17 15.5429">
      <path d={svgPaths.p11c2c680} fill="#4E4E4E" />
    </svg>
  );
}

/* ── Single crawl row ── */
function CrawlRow({
  crawl,
  selected = false,
  selectionMode = false,
  onClick,
}: {
  crawl: CrawlRowData;
  selected?: boolean;
  selectionMode?: boolean;
  onClick?: (crawlId: string) => void;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[16px] cursor-pointer transition-colors duration-200"
      style={{ width: "282px", height: "90px" }}
      onClick={() => onClick?.(crawl.id)}
    >
      {selectionMode && (
        <div
          className="absolute inset-0 rounded-[16px]"
          style={{
            border: "1px solid transparent",
            background: "transparent",
          }}
        />
      )}

      {/* Title */}
      <p
        className="absolute font-['KMR_Waldenburg:Normal',sans-serif] z-[2]"
        style={{
          fontSize: "15px",
          letterSpacing: "-1.05px",
          lineHeight: "normal",
          color: "#5a5a5a",
          top: "6px",
          left: "96px",
        }}
      >
        {crawl.title}
      </p>

      {/* Avatar group */}
      <div className="absolute z-[2]" style={{ top: "28px", left: "96px", paddingRight: "10px" }}>
        <AvatarGroup
          avatars={crawl.avatars}
          extraCount={crawl.extraCount}
          namePillText={crawl.namePillText}
        />
      </div>

      {/* Thumbnail */}
      <div
        className="absolute overflow-hidden rounded-[10px] z-[2]"
        style={{ left: "10px", top: "5px", width: "80px", height: "77px" }}
      >
        <img
          src={crawl.thumbnailSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[10px]"
        />
      </div>

      {/* Chevron */}
      {selectionMode ? (
        <div className="absolute z-[2] right-[12px] top-[33px] w-[30px] h-[30px] flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: selected ? "#171717" : "#efefef",
              border: selected ? "1px solid #171717" : "1px solid #c6c6c6",
            }}
          />
          <AnimatePresence>
            {selected && (
              <motion.svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative z-[1]"
              >
                <path
                  d="M20 7L10 17L5 12"
                  stroke="white"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="absolute z-[2]" style={{ right: "10px", top: "6px" }}>
          <ChevronDown />
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════ */

export function MyCrawlsSheetContent({
  crawlRows = [],
  subtitle = "8 users in crawls",
  heading = "My Crawls",
  sectionLabel = "NYC (23 shows)",
  selectedCrawlId,
  selectionMode = false,
  showApplyButton = false,
  applyLabel = "Apply",
  isApplyEnabled = false,
  applyPressed = false,
  onClose,
  onCrawlSelect,
  onApply,
}: {
  crawlRows?: CrawlRowData[];
  subtitle?: string;
  heading?: string;
  sectionLabel?: string;
  selectedCrawlId?: string;
  selectionMode?: boolean;
  showApplyButton?: boolean;
  applyLabel?: string;
  isApplyEnabled?: boolean;
  applyPressed?: boolean;
  onClose: () => void;
  onCrawlSelect?: (crawlId: string) => void;
  onApply?: () => void;
}) {
  return (
    <div className="bg-white w-full px-[10px] pt-[16px] pb-[20px]">
      {/* ── Header ── */}
      <div className="flex items-start justify-between px-[8px]">
        <div>
          <p
            className="font-['KMR_Waldenburg:Halbfett',sans-serif] text-[#343333]"
            style={{ fontSize: "10px", letterSpacing: "-0.3px", lineHeight: "normal" }}
          >
            {subtitle}
          </p>
          <div className="flex items-center gap-[4px] mt-[4px]">
            <p
              className="font-['KMR_Waldenburg:Halbfett',sans-serif] text-[#494949]"
              style={{ fontSize: "35px", letterSpacing: "-1.75px", lineHeight: "56.249px" }}
            >
              {heading}
            </p>
            <CrawlArrow />
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <CloseButton onClick={onClose} />
        </div>
      </div>

      {/* ── Section label ── */}
      <p
        className="font-['KMR_Waldenburg:Halbfett',sans-serif] text-[#535353] mt-[10px] px-[12px]"
        style={{ fontSize: "12px", letterSpacing: "-0.6px", lineHeight: "normal" }}
      >
        {sectionLabel}
      </p>

      {/* ── Crawl list ── */}
      <div className="flex flex-col mt-[8px]">
        {crawlRows.map((crawl) => (
          <CrawlRow
            key={crawl.id}
            crawl={crawl}
            selected={selectionMode && crawl.id === selectedCrawlId}
            selectionMode={selectionMode}
            onClick={onCrawlSelect}
          />
        ))}
      </div>

      {showApplyButton ? (
        <div className="px-[8px] mt-[12px] pb-[2px]">
          <button
            type="button"
            onClick={onApply}
            disabled={!isApplyEnabled}
            className="w-full rounded-[12px] py-[11px] font-['KMR_Waldenburg:Halbfett',sans-serif] text-[14px] tracking-[-0.42px] transition-colors duration-150"
            style={{
              background: isApplyEnabled ? "#171717" : "#d6d6d6",
              color: isApplyEnabled ? "#f4f4f4" : "#8b8b8b",
              transform: applyPressed ? "scale(0.985)" : "scale(1)",
              transition: "transform 120ms ease-out",
            }}
          >
            {applyLabel}
          </button>
        </div>
      ) : (
        <div className="flex justify-end px-[10px] mt-[12px]">
          <ChevronDown />
        </div>
      )}
    </div>
  );
}
