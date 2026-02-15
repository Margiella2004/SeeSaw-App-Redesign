/**
 * SearchFilterPanels — Animated filter panels for the Search/Discover page.
 * When a filter pill is tapped, the title transforms and the corresponding
 * panel animates in (sort options, rating slider, date calendar).
 *
 * Panels:
 *  - Sort: text list (Farthest To Closest, etc.)
 *  - Rating: 0–5 slider with Reset/Apply
 *  - Date: calendar picker (Apr 2024 style)
 *
 * Matches the Figma Frame602 design exactly.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ── Filter type ── */
export type ActiveFilter = null | "sort" | "rating" | "date";

const calendarIconPath =
  "M5.6 6.3H0.7V2.45H5.6M4.55 0V0.7H1.75V0H1.05V0.7H0.7C0.3115 0.7 0 1.0115 0 1.4V6.3C0 6.48565 0.0737498 6.6637 0.205025 6.79498C0.336301 6.92625 0.514348 7 0.7 7H5.6C5.78565 7 5.9637 6.92625 6.09498 6.79498C6.22625 6.6637 6.3 6.48565 6.3 6.3V1.4C6.3 1.0115 5.985 0.7 5.6 0.7H5.25V0";
const starOutlinePath =
  "M6.5708 8.40269L4.53897 9.62936L5.07395 7.31653L3.27988 5.76023L5.64675 5.56029L6.5708 3.37715L7.49485 5.56029L9.86172 5.76023L8.06766 7.31653L8.60263 9.62936M11.9746 5.07935L8.08927 4.74972L6.5708 1.16699L5.05233 4.74972L1.16699 5.07935L4.11207 7.63535L3.23125 11.4342L6.5708 9.41861L9.91035 11.4342L9.02413 7.63535L11.9746 5.07935Z";

/* ── Sort options data ── */
const sortOptions = [
  "Farthest To Closest",
  "Closest To Farthest",
  "Highest Rated To Lowest Rated",
  "Lowest Rated To Highest Rated",
];

/* ── Calendar helpers ── */
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

/* ══════════════════════════════════════════════
   SORT OPTIONS PANEL
   ══════════════════════════════════════════════ */
function SortOptionsPanel({
  selectedSort,
  onSelect,
}: {
  selectedSort: string | null;
  onSelect: (option: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-[15px] pt-[10px] pb-[6px]">
      {sortOptions.map((opt) => (
        <p
          key={opt}
          className="font-['Neue_Haas_Grotesk_Text_Pro:55_Roman',sans-serif] cursor-pointer"
          style={{
            fontSize: "15px",
            letterSpacing: "-0.45px",
            lineHeight: "normal",
            color: selectedSort === opt ? "#171717" : "#4e4e4e",
            fontWeight: selectedSort === opt ? 600 : 400,
          }}
          onClick={() => onSelect(opt)}
        >
          {opt}
        </p>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   RATING / SORT SLIDER PANEL
   ══════════════════════════════════════════════ */
function SliderPanel({
  value,
  onChange,
  onReset,
  onApply,
  isApplyEnabled = true,
}: {
  value: number;
  onChange: (v: number) => void;
  onReset: () => void;
  onApply: () => void;
  isApplyEnabled?: boolean;
}) {
  /* Labels 0–5 */
  const labels = [0, 1, 2, 3, 4, 5];
  const pct = (value / 5) * 100;

  return (
    <div className="flex flex-col pt-[10px] pb-[8px] px-[6px]">
      {/* Number labels */}
      <div className="flex justify-between px-[2px]">
        {labels.map((n) => (
          <span
            key={n}
            className="font-['KMR_Waldenburg:Buch',sans-serif]"
            style={{
              fontSize: "11px",
              letterSpacing: "-0.5px",
              lineHeight: "normal",
              fontWeight: 400,
              color: "#4e4e4e",
              width: "16px",
              textAlign: "center",
            }}
          >
            {n}
          </span>
        ))}
      </div>

      {/* Slider track + thumb */}
      <div
        className="relative mt-[8px]"
        style={{ height: "20px" }}
      >
        {/* Track background */}
        <div
          className="absolute top-[9px] left-0 right-0 bg-[#e2e2e2] rounded-full"
          style={{ height: "2px" }}
        />
        {/* Track fill */}
        <div
          className="absolute top-[9px] left-0 bg-[#171717] rounded-full"
          style={{ height: "2px", width: `${pct}%` }}
        />
        {/* Thumb */}
        <div
          className="absolute top-[2px] bg-[#171717] rounded-full cursor-grab"
          style={{
            width: "16px",
            height: "16px",
            left: `calc(${pct}% - 8px)`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        />
        {/* Invisible range input on top for interaction */}
        <input
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          style={{ height: "20px" }}
        />
      </div>

      {/* Reset + Apply buttons */}
      <div className="flex gap-[10px] mt-[16px]">
        <div
          className="flex-1 flex items-center justify-center rounded-[8px] cursor-pointer"
          style={{
            height: "36px",
            border: "1px solid #d1d1d1",
          }}
          onClick={onReset}
        >
          <span
            className="font-['KMR_Waldenburg:Normal',sans-serif]"
            style={{
              fontSize: "12px",
              letterSpacing: "-0.5px",
              lineHeight: "normal",
              fontWeight: 500,
              color: "#4e4e4e",
            }}
          >
            Reset
          </span>
        </div>
        <div
          className="flex-1 flex items-center justify-center rounded-[8px] bg-[#171717] cursor-pointer"
          style={{
            height: "36px",
            background: isApplyEnabled ? "#171717" : "#d6d6d6",
            cursor: isApplyEnabled ? "pointer" : "default",
          }}
          onClick={() => {
            if (!isApplyEnabled) return;
            onApply();
          }}
        >
          <span
            className="font-['KMR_Waldenburg:Normal',sans-serif]"
            style={{
              fontSize: "12px",
              letterSpacing: "-0.5px",
              lineHeight: "normal",
              fontWeight: 500,
              color: isApplyEnabled ? "#fff" : "#8b8b8b",
            }}
          >
            Apply
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   DATE CALENDAR PANEL
   ══════════════════════════════════════════════ */
function DateCalendarPanel({
  selectedDate,
  onSelect,
  onReset,
  onApply,
  isApplyEnabled = true,
}: {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
  onReset: () => void;
  onApply: () => void;
  isApplyEnabled?: boolean;
}) {
  const [viewYear, setViewYear] = useState(2024);
  const [viewMonth, setViewMonth] = useState(3); // April = 3

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  /* Build grid rows */
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    );
  };

  /* Bold days: 16–19 range for visual matching the Figma design */
  const isBoldDay = (day: number) => day >= 16 && day <= 19;

  return (
    <div className="flex flex-col pt-[6px] pb-[8px]">
      {/* Month header */}
      <p
        className="font-['KMR_Waldenburg:Halbfett',sans-serif] px-[4px]"
        style={{
          fontSize: "12px",
          letterSpacing: "-0.36px",
          lineHeight: "normal",
          color: "#393939",
        }}
      >
        {MONTH_NAMES[viewMonth]} {viewYear}
      </p>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mt-[8px]">
        {DAY_HEADERS.map((d) => (
          <div key={d} className="flex items-center justify-center" style={{ height: "24px" }}>
            <span
              className="font-['KMR_Waldenburg:Normal',sans-serif]"
              style={{
                fontSize: "9px",
                letterSpacing: "-0.3px",
                lineHeight: "normal",
                fontWeight: 500,
                color: "#7a7a7a",
              }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>

      {/* Day grid */}
      {rows.map((row, ri) => (
        <div key={ri} className="grid grid-cols-7">
          {row.map((day, ci) => (
            <div
              key={`${ri}-${ci}`}
              className="flex items-center justify-center cursor-pointer"
              style={{ height: "30px" }}
              onClick={() => {
                if (day) onSelect(new Date(viewYear, viewMonth, day));
              }}
            >
              {day && (
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: "26px",
                    height: "26px",
                    background: isSelected(day) ? "#171717" : "transparent",
                  }}
                >
                  <span
                    className="font-['KMR_Waldenburg:Buch',sans-serif]"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "-0.3px",
                      lineHeight: "normal",
                      fontWeight: isBoldDay(day) ? 700 : 400,
                      color: isSelected(day)
                        ? "#fff"
                        : isBoldDay(day)
                        ? "#171717"
                        : "#4e4e4e",
                    }}
                  >
                    {day}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Bottom month label */}
      <p
        className="font-['KMR_Waldenburg:Halbfett',sans-serif] px-[4px] mt-[6px]"
        style={{
          fontSize: "12px",
          letterSpacing: "-0.36px",
          lineHeight: "normal",
          color: "#393939",
        }}
      >
        {MONTH_NAMES[viewMonth]} {viewYear}
      </p>

      {/* Reset + Apply buttons */}
      <div className="flex gap-[10px] mt-[12px]">
        <div
          className="flex-1 flex items-center justify-center rounded-[8px] cursor-pointer"
          style={{
            height: "36px",
            border: "1px solid #d1d1d1",
          }}
          onClick={onReset}
        >
          <span
            className="font-['KMR_Waldenburg:Normal',sans-serif]"
            style={{
              fontSize: "12px",
              letterSpacing: "-0.5px",
              lineHeight: "normal",
              fontWeight: 500,
              color: "#4e4e4e",
            }}
          >
            Reset
          </span>
        </div>
        <div
          className="flex-1 flex items-center justify-center rounded-[8px] bg-[#171717] cursor-pointer"
          style={{
            height: "36px",
            background: isApplyEnabled ? "#171717" : "#d6d6d6",
            cursor: isApplyEnabled ? "pointer" : "default",
          }}
          onClick={() => {
            if (!isApplyEnabled) return;
            onApply();
          }}
        >
          <span
            className="font-['KMR_Waldenburg:Normal',sans-serif]"
            style={{
              fontSize: "12px",
              letterSpacing: "-0.5px",
              lineHeight: "normal",
              fontWeight: 500,
              color: isApplyEnabled ? "#fff" : "#8b8b8b",
            }}
          >
            Apply
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SEARCH FILTER HEADER — unified header with animated panels
   ══════════════════════════════════════════════ */

export interface SearchFilterHeaderProps {
  /** Current view title when no filter panel is active */
  defaultTitle: string;
  /** Whether to show the back button */
  showBackButton?: boolean;
  onBack?: () => void;
  /** Search input props */
  searchValue: string;
  onSearchChange: (v: string) => void;
  onSearchFocus?: () => void;
  autoFocusSearch?: boolean;
  /** Which pills to show — default is the result set */
  showFilterPill?: boolean;
  /** Active filter state (lifted to parent so parent can read it) */
  activeFilter: ActiveFilter;
  onActiveFilterChange: (f: ActiveFilter) => void;
  /** Active gallery-scope tag state */
  galleryScope?: "all" | "saved";
  onGalleryScopeChange?: (scope: "all" | "saved") => void;
  /** Callbacks from filter actions */
  onSortSelect?: (option: string) => void;
  onRatingApply?: (value: number) => void;
  onDateSelect?: (date: Date) => void;
  /** SVG paths for icons */
  svgPaths: Record<string, string>;
  /** Back chevron path */
  backChevronPath: string;
}

export function SearchFilterHeader({
  defaultTitle,
  showBackButton,
  onBack,
  searchValue,
  onSearchChange,
  onSearchFocus,
  autoFocusSearch,
  showFilterPill = false,
  activeFilter,
  onActiveFilterChange,
  galleryScope = "all",
  onGalleryScopeChange,
  onSortSelect,
  onRatingApply,
  onDateSelect,
  svgPaths: paths,
  backChevronPath,
}: SearchFilterHeaderProps) {
  /* ── Local panel state ── */
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState(4);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  /* ── Derive display title ── */
  const getTitle = () => {
    switch (activeFilter) {
      case "sort":
        return "Search ";
      case "rating":
        return "Rating";
      case "date":
        return selectedDate
          ? `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${String(selectedDate.getFullYear()).slice(2)}`
          : "Date";
      default:
        return defaultTitle;
    }
  };

  /* ── Toggle filter ── */
  const toggleFilter = (f: ActiveFilter) => {
    onActiveFilterChange(activeFilter === f ? null : f);
  };

  /* ── Pill config ── */
  const pills: { id: string; label: string; filter: ActiveFilter | "allGalleries" | "savedGalleries" }[] = [
    { id: "all", label: "All Galleries", filter: "allGalleries" },
    { id: "saved", label: "Saved Galleries", filter: "savedGalleries" },
    { id: "date", label: "Date", filter: "date" },
    { id: "rating", label: "Rating", filter: "rating" },
    ...(showFilterPill ? [{ id: "filter", label: "Filter", filter: "sort" as const }] : []),
  ];

  const isPanelOpen = activeFilter !== null;

  return (
    <div className="relative" style={{ zIndex: 10 }}>
      <motion.div
        className="bg-white"
        animate={{
          borderRadius: isPanelOpen ? "0 0 12px 12px" : "0 0 0 0",
          boxShadow: isPanelOpen
            ? "0px 4px 4px 0px rgba(0,0,0,0.25)"
            : "0px 0px 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* ── Search bar row ── */}
        <div className="flex items-center gap-[4px] px-[14px] pt-[10px]">
          {showBackButton && (
            <div
              className="shrink-0 cursor-pointer flex items-center justify-center"
              style={{ width: "26.602px", height: "26.444px" }}
              onClick={onBack}
            >
              <svg
                width="26.602"
                height="26.444"
                fill="none"
                viewBox="0 0 26.6018 26.4444"
              >
                <rect fill="#171717" height="25.7007" rx="12.8503" width="25.8581" x="0.371875" y="0.371875" />
                <rect height="25.7007" rx="12.8503" stroke="#D9D9D9" strokeWidth="0.74375" width="25.8581" x="0.371875" y="0.371875" />
                <path d={backChevronPath} fill="#D6D6D6" />
              </svg>
            </div>
          )}

          {/* Search input */}
          <div
            className="flex items-center rounded-[52px] overflow-hidden flex-1"
            style={{ border: "1px solid #373737" }}
          >
            <div className="flex gap-[35px] items-center overflow-hidden pl-[17px] pr-[24px] py-[4px] w-full">
              <div className="flex items-center gap-[8px] flex-1">
                <svg width="13" height="13" fill="none" viewBox="0 0 13 13" className="shrink-0">
                  <path d={paths.p1e038700} fill="#3E3E3E" />
                </svg>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={onSearchFocus}
                  autoFocus={autoFocusSearch}
                  placeholder="Search galleries"
                  className="font-['KMR_Waldenburg:Normal',sans-serif] bg-transparent outline-none w-full"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "-0.7px",
                    lineHeight: "normal",
                    fontWeight: 500,
                    color: "#333",
                  }}
                />
              </div>
              {/* Divider + right "Search galleries" label */}
              <div className="flex items-center justify-center shrink-0 w-0" style={{ height: "17px" }}>
                <div className="rotate-90" style={{ width: "17px", height: 0 }}>
                  <svg width="17" height="1" fill="none" viewBox="0 0 17 1" className="block">
                    <line stroke="#E2E2E2" strokeLinecap="round" x1="0.5" x2="16.5" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
              <span
                className="font-['KMR_Waldenburg:Normal',sans-serif] shrink-0"
                style={{
                  fontSize: "10px",
                  letterSpacing: "-0.7px",
                  lineHeight: "normal",
                  fontWeight: 500,
                  color: "#c1c1c1",
                }}
              >
                Search galleries
              </span>
            </div>
          </div>
        </div>

        {/* ── Filter pills ── */}
        <div className="flex items-center gap-[9px] px-[18px] mt-[8px] overflow-x-auto no-scrollbar">
          {pills.map((pill) => {
            const isActive =
              pill.filter === "allGalleries"
                ? galleryScope === "all" && activeFilter === null
                : pill.filter === "savedGalleries"
                ? galleryScope === "saved" && activeFilter === null
                : activeFilter === pill.filter;
            return (
              <div
                key={pill.id}
                className="shrink-0 flex items-center justify-center rounded-[21.088px] cursor-pointer"
                style={{
                  background: isActive ? "#bbb" : "#e7e7e7",
                  padding:
                    pill.label === "Date"
                      ? "4.218px 12px"
                      : "4.218px 6.025px",
                  transition: "background 0.2s ease",
                }}
                onClick={() => {
                  if (pill.filter === "allGalleries") {
                    onGalleryScopeChange?.("all");
                    onActiveFilterChange(null);
                  } else if (pill.filter === "savedGalleries") {
                    onGalleryScopeChange?.("saved");
                    onActiveFilterChange(null);
                  } else {
                    toggleFilter(pill.filter);
                  }
                }}
              >
                {(pill.label === "Date" || pill.label === "Rating") && (
                  <span className="mr-[3px] inline-flex items-center">
                    {pill.label === "Date" ? (
                      <svg
                        width="6.3"
                        height="7"
                        fill="none"
                        viewBox="0 0 6.3 7"
                        className="shrink-0"
                      >
                        <path d={calendarIconPath} fill="black" />
                      </svg>
                    ) : (
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        viewBox="0 0 14 14"
                        className="shrink-0"
                        style={{ width: "14px", height: "14px" }}
                      >
                        <path d={starOutlinePath} fill="black" />
                      </svg>
                    )}
                  </span>
                )}
                <span
                  className="font-['KMR_Waldenburg:Normal',sans-serif]"
                  style={{
                    fontSize: "9.038px",
                    letterSpacing: "-0.2711px",
                    lineHeight: "normal",
                    color: "#333",
                  }}
                >
                  {pill.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Title area ── */}
        <div className="px-[19px] mt-[8px]">
          <p
            className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
            style={{
              fontSize: "10px",
              letterSpacing: "-0.3px",
              lineHeight: "normal",
              color: "#343333",
            }}
          >
            330 shows in NYC
          </p>
          <div
            className="flex items-center gap-[2px] mt-[2px] cursor-pointer"
            onClick={() => toggleFilter("sort")}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={getTitle()}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="font-['KMR_Waldenburg:Normal',sans-serif]"
                style={{
                  fontSize: "35px",
                  letterSpacing: "-1.75px",
                  lineHeight: "56.249px",
                  fontWeight: 500,
                  color: "#494949",
                }}
              >
                {getTitle()}
              </motion.p>
            </AnimatePresence>
            <svg
              width="17"
              height="15.543"
              fill="none"
              viewBox="0 0 17 15.5429"
              className="shrink-0"
            >
              <path d={paths.p11c2c680} fill="#4E4E4E" />
            </svg>
          </div>
        </div>

        {/* ── Animated filter panel content ── */}
        <AnimatePresence>
          {activeFilter === "sort" && (
            <motion.div
              key="sort-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="overflow-hidden px-[19px]"
            >
              <SortOptionsPanel
                selectedSort={selectedSort}
                onSelect={(opt) => {
                  setSelectedSort(opt);
                  onSortSelect?.(opt);
                }}
              />
            </motion.div>
          )}

          {activeFilter === "rating" && (
            <motion.div
              key="rating-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="overflow-hidden px-[19px]"
            >
              <SliderPanel
                value={ratingValue}
                onChange={setRatingValue}
                onReset={() => setRatingValue(0)}
                isApplyEnabled={Math.abs(ratingValue - 4) > 0.001}
                onApply={() => {
                  onRatingApply?.(ratingValue);
                  onActiveFilterChange(null);
                }}
              />
            </motion.div>
          )}

          {activeFilter === "date" && (
            <motion.div
              key="date-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="overflow-hidden px-[19px]"
            >
              <DateCalendarPanel
                selectedDate={selectedDate}
                onSelect={(d) => {
                  setSelectedDate(d);
                  onDateSelect?.(d);
                }}
                onReset={() => setSelectedDate(null)}
                isApplyEnabled={selectedDate !== null}
                onApply={() => onActiveFilterChange(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom padding when panel is open */}
        {isPanelOpen && <div style={{ height: "8px" }} />}
      </motion.div>

      {/* ── Backdrop when panel is open (dimming content below) ── */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/10"
            style={{ zIndex: -1 }}
            onClick={() => onActiveFilterChange(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
