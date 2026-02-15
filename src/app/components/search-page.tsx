/**
 * SearchPage — Discover / Search page matching the Figma "Search" frame.
 * Three views:
 *  1. Main — search bar, filter pills, neighborhood grid
 *  2. Borough — tapping a neighborhood card shows gallery results for that borough
 *  3. Results — typing in the search bar shows search results
 *  4. Map — full-screen Leaflet map of NYC galleries
 */
import { MapOverlay } from "./map-overlay";
import type { SmallGalleryCardProps } from "./cards/small-gallery-card";
import { useState, useEffect } from "react";
import svgPaths from "../../imports/svg-nnxzxknuyw";
import { HomeGalleryCard } from "./cards/home-gallery-card";
import type { HomeGalleryCardData } from "./cards/home-gallery-card";
import { SearchFilterHeader } from "./search-filter-panels";
import type { ActiveFilter } from "./search-filter-panels";
import { galleryImages } from "./curated-images";

/* ── Neighborhood card images ── */
import imgGreenwichVillage from "../../assets/neighborhoods/greenwich-village.jpg";
import imgChelsea from "../../assets/neighborhoods/chelsea.jpg";
import imgLowerEastSide from "../../assets/neighborhoods/lower-east-side.jpg";
import imgEastVillage from "../../assets/neighborhoods/east-village.jpg";
import imgTribeca from "../../assets/neighborhoods/tribeca.jpg";
import imgBronx from "../../assets/neighborhoods/bronx.jpg";
import imgWilliamsburg from "../../assets/neighborhoods/williamsburg.jpg";
import imgSoho from "../../assets/neighborhoods/soho.jpg";

const [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12] = galleryImages;

/* SVG back chevron path (from Figma svg-2a1yhkjgft) */
const backChevronPath =
  "M17.1574 7.7931L15.9876 6.61111L9.44444 13.2222L15.9876 19.8333L17.1574 18.6513L11.7841 13.2222L17.1574 7.7931Z";

/* ── Types ── */
interface NeighborhoodCard {
  id: string;
  imageSrc: string;
  name: string;
  shows: string;
}

type SearchView = "main" | "borough" | "results" | "map";

/* ── Default neighborhood data ── */
const defaultNeighborhoods: NeighborhoodCard[] = [
  { id: "n1", imageSrc: imgGreenwichVillage, name: "Greenwich Village", shows: "40 shows" },
  { id: "n2", imageSrc: imgChelsea, name: "Chelsea", shows: "52 shows" },
  { id: "n3", imageSrc: imgLowerEastSide, name: "Lower East Side", shows: "28 shows" },
  { id: "n4", imageSrc: imgEastVillage, name: "East Village", shows: "35 shows" },
  { id: "n5", imageSrc: imgTribeca, name: "Tribeca", shows: "22 shows" },
  { id: "n6", imageSrc: imgBronx, name: "Bronx", shows: "15 shows" },
  { id: "n7", imageSrc: imgWilliamsburg, name: "Williamsburg", shows: "31 shows" },
  { id: "n8", imageSrc: imgSoho, name: "SoHo", shows: "45 shows" },
];

/* ── Mock gallery result data per borough ── */
const galleryResultsByBorough: Record<string, HomeGalleryCardData[]> = {
  "Greenwich Village": [
    { id: "gv1", name: "James Cohan", rating: "4.1", tag: "West Village", status: "Open", hours: "10am-6pm", heroImage: g1, thumbnails: [] },
    { id: "gv2", name: "West Village Arts", rating: "4.0", tag: "Greenwich Village", status: "Open", hours: "11am-6pm", heroImage: g2, thumbnails: [] },
    { id: "gv3", name: "MacDougal Gallery", rating: "3.9", tag: "Greenwich Village", status: "Closed", hours: "11am-7pm", heroImage: g3, thumbnails: [] },
  ],
  Chelsea: [
    { id: "ch1", name: "Gagosian Chelsea", rating: "4.5", tag: "Gagosian", status: "Open", hours: "10am-6pm", heroImage: g4, thumbnails: [] },
    { id: "ch2", name: "David Zwirner", rating: "4.3", tag: "Zwirner", status: "Open", hours: "10am-6pm", heroImage: g5, thumbnails: [] },
    { id: "ch3", name: "Pace Gallery", rating: "4.2", tag: "Pace", status: "Open", hours: "10am-6pm", heroImage: g6, thumbnails: [] },
  ],
  "Lower East Side": [
    { id: "les1", name: "Sperone Westwater", rating: "4.0", tag: "Lower East Side", status: "Open", hours: "10am-6pm", heroImage: g6, thumbnails: [] },
    { id: "les2", name: "Canada Gallery", rating: "3.8", tag: "Lower East Side", status: "Closed", hours: "11am-6pm", heroImage: g7, thumbnails: [] },
  ],
  "East Village": [
    { id: "ev1", name: "Howl! Happening", rating: "3.7", tag: "East Village", status: "Open", hours: "12pm-8pm", heroImage: g8, thumbnails: [] },
    { id: "ev2", name: "Sargent's Daughters", rating: "4.0", tag: "East Village", status: "Open", hours: "11am-7pm", heroImage: g9, thumbnails: [] },
  ],
};

/* Fallback gallery results for any borough not explicitly listed */
const defaultGalleryResults: HomeGalleryCardData[] = [
  { id: "d1", name: "Petzel", rating: "4.0", tag: "Tribeca", status: "Open", hours: "10am-6pm", heroImage: g10, thumbnails: [] },
  { id: "d2", name: "Jack Shainman", rating: "4.1", tag: "Tribeca", status: "Open", hours: "10am-6pm", heroImage: g11, thumbnails: [] },
  { id: "d3", name: "Chapter NY", rating: "3.8", tag: "Chinatown", status: "Closed", hours: "11am-7pm", heroImage: g12, thumbnails: [] },
];

/* ── All gallery results for search (all boroughs combined) ── */
const allGalleryResults: HomeGalleryCardData[] = [
  ...galleryResultsByBorough["Greenwich Village"],
  ...galleryResultsByBorough["Chelsea"],
  ...galleryResultsByBorough["Lower East Side"],
  ...galleryResultsByBorough["East Village"],
  ...defaultGalleryResults.map((g, i) => ({ ...g, id: `all-${i}` })),
];

/* ══════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════ */

/* ── Neighborhood Card Component ── */
function NeighborhoodCardItem({
  card,
  onClick,
}: {
  card: NeighborhoodCard;
  onClick?: () => void;
}) {
  return (
    <div
      className="relative rounded-[6px] overflow-hidden bg-white cursor-pointer w-full"
      style={{ height: "139px" }}
      onClick={onClick}
    >
      <img
        src={card.imageSrc}
        alt={card.name}
        className="absolute inset-0 w-full h-full object-cover rounded-[6px]"
      />
      <div
        className="absolute left-0 right-0 bottom-0 bg-white overflow-hidden rounded-bl-[6px] rounded-br-[6px] flex flex-col justify-center"
        style={{
          height: "34.48%",
          borderLeft: "0.5px solid rgba(0,0,0,0.9)",
          borderRight: "0.5px solid rgba(0,0,0,0.9)",
          borderBottom: "1.5px solid rgba(0,0,0,0.9)",
          padding: "4px 8px",
        }}
      >
        <p
          className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
          style={{
            fontSize: "12px",
            letterSpacing: "-0.36px",
            lineHeight: "normal",
            color: "#393939",
          }}
        >
          {card.name}
        </p>
        <p
          className="font-['KMR_Waldenburg:Buch',sans-serif]"
          style={{
            fontSize: "9px",
            letterSpacing: "-0.63px",
            lineHeight: "normal",
            fontWeight: 400,
            color: "#908a8a",
            marginTop: "2px",
          }}
        >
          {card.shows}
        </p>
      </div>
    </div>
  );
}

/* ── Filter Pill ── */
function FilterPill({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-[21px] cursor-pointer"
      style={{
        background: active ? "#bbb" : "#e7e7e7",
        padding: "4.218px 6.025px",
      }}
    >
      <span
        className="font-['KMR_Waldenburg:Normal',sans-serif]"
        style={{
          fontSize: "9.038px",
          letterSpacing: "-0.2711px",
          lineHeight: "normal",
          color: "#333",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Open Map FAB ── */
function OpenMapFab({ onClick }: { onClick?: () => void }) {
  return (
    <div className="sticky bottom-[8px] flex justify-end pr-[10px] mt-[16px] pointer-events-none">
      <div
        className="bg-[#171717] rounded-[14px] flex items-center gap-[8px] px-[14px] py-[11px] cursor-pointer pointer-events-auto"
        style={{ border: "1px solid #7f7f7f" }}
        onClick={onClick}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
          <path d={svgPaths.p5282c40} fill="white" />
        </svg>
        <span
          className="font-['KMR_Waldenburg:Normal',sans-serif]"
          style={{
            fontSize: "14px",
            letterSpacing: "-0.98px",
            lineHeight: "normal",
            fontWeight: 500,
            color: "#f9f9f9",
          }}
        >
          Open Map
        </span>
      </div>
    </div>
  );
}

/* ── Back Button (dark circle with chevron) ── */
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="shrink-0 cursor-pointer flex items-center justify-center"
      style={{
        width: "26.602px",
        height: "26.444px",
      }}
      onClick={onClick}
    >
      <svg
        width="26.602"
        height="26.444"
        fill="none"
        viewBox="0 0 26.6018 26.4444"
      >
        <rect
          fill="#171717"
          height="25.7007"
          rx="12.8503"
          width="25.8581"
          x="0.371875"
          y="0.371875"
        />
        <rect
          height="25.7007"
          rx="12.8503"
          stroke="#D9D9D9"
          strokeWidth="0.74375"
          width="25.8581"
          x="0.371875"
          y="0.371875"
        />
        <path d={backChevronPath} fill="#D6D6D6" />
      </svg>
    </div>
  );
}

/* ── Search Bar (for detail views — functional input) ── */
function DetailSearchBar({
  value,
  onChange,
  onFocus,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  onFocus?: () => void;
  autoFocus?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-[8px] rounded-[52px] overflow-hidden pl-[17px] pr-[24px] py-[4px] flex-1"
      style={{ border: "1px solid #373737" }}
    >
      <div className="flex items-center gap-[8px] flex-1">
        <svg
          width="13"
          height="13"
          fill="none"
          viewBox="0 0 13 13"
          className="shrink-0"
        >
          <path d={svgPaths.p1e038700} fill="#3E3E3E" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          autoFocus={autoFocus}
          placeholder="Search galleries, artists, or neighborhoods"
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
    </div>
  );
}

/* ══════════════════════════════════════════════
   GALLERY RESULTS VIEW (used for both Borough + Search Results)
   ══════════════════════════════════════════════ */

function GalleryResultsView({
  title,
  results,
  onBack,
  onGallerySelect,
  searchValue,
  onSearchChange,
  onSearchFocus,
  showExtraPills,
  onOpenMap,
  initialActiveFilter = null,
  initialGalleryScope = "all",
}: {
  title: string;
  results: HomeGalleryCardData[];
  onBack: () => void;
  onGallerySelect?: (card: HomeGalleryCardData, index: number) => void;
  searchValue: string;
  onSearchChange: (v: string) => void;
  onSearchFocus?: () => void;
  showExtraPills?: boolean;
  onOpenMap?: () => void;
  initialActiveFilter?: ActiveFilter;
  initialGalleryScope?: "all" | "saved";
}) {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(initialActiveFilter);
  const [galleryScope, setGalleryScope] = useState<"all" | "saved">(initialGalleryScope);

  const visibleResults =
    galleryScope === "saved"
      ? results.filter((card) => card.rating && Number(card.rating) >= 4).slice(0, 4)
      : results;

  return (
    <div className="bg-white w-full min-h-full pb-[20px]">
      {/* ── Animated filter header ── */}
      <SearchFilterHeader
        defaultTitle={title}
        showBackButton
        onBack={onBack}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onSearchFocus={onSearchFocus}
        showFilterPill={true}
        activeFilter={activeFilter}
        onActiveFilterChange={setActiveFilter}
        galleryScope={galleryScope}
        onGalleryScopeChange={setGalleryScope}
        svgPaths={svgPaths}
        backChevronPath={backChevronPath}
      />

      {/* ── Gallery result cards ── */}
      <div className="flex flex-col items-center gap-[17px] mt-[10px] px-[22px]">
        {visibleResults.length > 0 ? (
          visibleResults.map((card, index) => (
            <HomeGalleryCard
              key={card.id}
              card={card}
              onClick={() => onGallerySelect?.(card, index)}
            />
          ))
        ) : (
          <p
            className="font-['KMR_Waldenburg:Buch',sans-serif] mt-[40px]"
            style={{
              fontSize: "13px",
              letterSpacing: "-0.5px",
              color: "#908a8a",
            }}
          >
            No results found
          </p>
        )}
      </div>

      {/* ── Open Map FAB ── */}
      <OpenMapFab onClick={onOpenMap} />
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN SEARCH PAGE COMPONENT
   ═════════════════════════════════════════════ */

export interface SearchPageProps {
  onGallerySelect?: (index: number) => void;
  initialView?: SearchView;
  initialSelectedBorough?: string;
  initialSearchQuery?: string;
  initialMapResultCards?: SmallGalleryCardProps[];
  initialResultsActiveFilter?: ActiveFilter;
  initialResultsGalleryScope?: "all" | "saved";
}

export function SearchPage({
  onGallerySelect,
  initialView = "main",
  initialSelectedBorough = "",
  initialSearchQuery = "",
  initialMapResultCards = [],
  initialResultsActiveFilter = null,
  initialResultsGalleryScope = "all",
}: SearchPageProps) {
  const [view, setView] = useState<SearchView>(initialView);
  const [selectedBorough, setSelectedBorough] = useState(initialSelectedBorough);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [mainSearchFocused, setMainSearchFocused] = useState(false);
  const [mapResultCards, setMapResultCards] = useState<SmallGalleryCardProps[]>(initialMapResultCards);
  const [mainActiveFilter, setMainActiveFilter] = useState<ActiveFilter>(null);

  /* Convert HomeGalleryCardData to SmallGalleryCardProps for map bottom cards */
  const toSmallCards = (results: HomeGalleryCardData[]): SmallGalleryCardProps[] => {
    return results.map((g) => ({
      name: g.name,
      thumbnails: g.heroImage ? [g.heroImage] : [imgImg0033],
      rating: g.rating,
      status: g.status,
      statusColor: g.status === "Closed" ? "#ed2115" : "#4caf50",
      tag: g.tag,
    }));
  };

  /* Open map with current result cards */
  const openMapWithResults = (results: HomeGalleryCardData[]) => {
    setMapResultCards(toSmallCards(results));
    setView("map");
  };

  /* Navigate to borough detail */
  const handleBoroughClick = (name: string) => {
    setSelectedBorough(name);
    setSearchQuery("");
    setView("borough");
  };

  /* Navigate back to main */
  const handleBack = () => {
    setView("main");
    setSearchQuery("");
    setSelectedBorough("");
    setMainSearchFocused(false);
  };

  /* Get filtered results for search */
  const getSearchResults = (): HomeGalleryCardData[] => {
    if (!searchQuery.trim()) return allGalleryResults;
    const q = searchQuery.toLowerCase();
    return allGalleryResults.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.tag.toLowerCase().includes(q) ||
        g.status.toLowerCase().includes(q)
    );
  };

  /* Get results for selected borough */
  const getBoroughResults = (): HomeGalleryCardData[] => {
    return galleryResultsByBorough[selectedBorough] || defaultGalleryResults;
  };

  /* Auto-transition to results view when typing in main search */
  useEffect(() => {
    if (mainSearchFocused && searchQuery.length > 0 && view === "main") {
      setView("results");
    }
  }, [searchQuery, mainSearchFocused, view]);

  /* ── Borough Detail View ── */
  if (view === "borough") {
    return (
      <GalleryResultsView
        title={selectedBorough}
        results={getBoroughResults()}
        onBack={handleBack}
        onGallerySelect={(_, index) => onGallerySelect?.(index)}
        searchValue={searchQuery}
        onSearchChange={(v) => {
          setSearchQuery(v);
          if (v.length > 0) {
            setView("results");
          }
        }}
        showExtraPills
        onOpenMap={() => openMapWithResults(getBoroughResults())}
        initialActiveFilter={initialResultsActiveFilter}
        initialGalleryScope={initialResultsGalleryScope}
      />
    );
  }

  /* ── Search Results View ── */
  if (view === "results") {
    return (
      <GalleryResultsView
        title="Results"
        results={getSearchResults()}
        onBack={handleBack}
        onGallerySelect={(_, index) => onGallerySelect?.(index)}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        showExtraPills
        onOpenMap={() => openMapWithResults(getSearchResults())}
        initialActiveFilter={initialResultsActiveFilter}
        initialGalleryScope={initialResultsGalleryScope}
      />
    );
  }

  /* ── Map View ── */
  if (view === "map") {
    return (
      <MapOverlay
        onClose={handleBack}
        resultCards={mapResultCards}
      />
    );
  }

  /* ── Main View (neighborhood grid) ── */
  return (
    <div className="bg-white w-full min-h-full pb-[20px]">
      {/* ── Animated filter header (with "Filter" pill on main) ── */}
      <SearchFilterHeader
        defaultTitle="Search "
        showBackButton={false}
        searchValue={searchQuery}
        onSearchChange={(v) => {
          setSearchQuery(v);
          if (v.length > 0) {
            setMainActiveFilter(null);
            setView("results");
          }
        }}
        onSearchFocus={() => setMainSearchFocused(true)}
        showFilterPill
        activeFilter={mainActiveFilter}
        onActiveFilterChange={setMainActiveFilter}
        svgPaths={svgPaths}
        backChevronPath={backChevronPath}
      />

      {/* ── 2-column grid of neighborhood cards ── */}
      <div className="grid grid-cols-2 gap-x-[7px] gap-y-[14px] px-[20px] mt-[10px]">
        {defaultNeighborhoods.map((card) => (
          <NeighborhoodCardItem
            key={card.id}
            card={card}
            onClick={() => handleBoroughClick(card.name)}
          />
        ))}
      </div>

      {/* ── Open Map FAB ── */}
      <OpenMapFab onClick={() => setView("map")} />
    </div>
  );
}
