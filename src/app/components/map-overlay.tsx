/**
 * MapOverlay — Full-screen map view matching Figma "Search" map frame.
 * Uses Leaflet + OpenStreetMap (CartoDB Positron light tiles) for a real NYC map.
 * Luma-style markers: rounded-square image pins with gallery photos.
 * "400+ Crawls" bottom sheet expands into a full CrawlsPage.
 * Supports:
 *   - gallery result cards at bottom when opened from search results
 *   - clickable markers that show a gallery card preview at the bottom
 */
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import svgPaths from "../../imports/svg-nnxzxknuyw";
import { CrawlsPage } from "./crawls-page";
import { CrawlListPage } from "./crawl-list-page";
import type { CrawlListData } from "./crawl-list-page";
import { editorPickCrawlData } from "./crawl-list-page";
import { SmallGalleryCard } from "./cards/small-gallery-card";
import type { SmallGalleryCardProps } from "./cards/small-gallery-card";
import { motion, AnimatePresence } from "motion/react";
import { galleryImages } from "./curated-images";

const [g1, g2, g3, g4, g5, g6, g7] = galleryImages;

/* SVG paths from Figma import svg-qzmyzbq2za */
const backChevronPath =
  "M17.1574 7.7931L15.9876 6.61111L9.44444 13.2222L15.9876 19.8333L17.1574 18.6513L11.7841 13.2222L17.1574 7.7931Z";
const sendArrowPath =
  "M12.6844 3.31556L8.91556 12.32L7.74222 9.28L7.45778 8.54222L6.72889 8.25778L3.68 7.07556L12.6844 3.31556ZM16 0L0 6.69333V7.55556L6.08 9.92L8.44444 16H9.29778L16 0Z";
const expandChevronPath =
  "M15.56 7.78L14.14 9.19L7.78 2.83L1.42 9.19L0 7.78L7.78 0L15.56 7.78Z";
const calendarIconPath =
  "M5.6 6.3H0.7V2.45H5.6M4.55 0V0.7H1.75V0H1.05V0.7H0.7C0.3115 0.7 0 1.0115 0 1.4V6.3C0 6.48565 0.0737498 6.6637 0.205025 6.79498C0.336301 6.92625 0.514348 7 0.7 7H5.6C5.78565 7 5.9637 6.92625 6.09498 6.79498C6.22625 6.6637 6.3 6.48565 6.3 6.3V1.4C6.3 1.0115 5.985 0.7 5.6 0.7H5.25V0";
const starOutlinePath =
  "M6.5708 8.40269L4.53897 9.62936L5.07395 7.31653L3.27988 5.76023L5.64675 5.56029L6.5708 3.37715L7.49485 5.56029L9.86172 5.76023L8.06766 7.31653L8.60263 9.62936M11.9746 5.07935L8.08927 4.74972L6.5708 1.16699L5.05233 4.74972L1.16699 5.07935L4.11207 7.63535L3.23125 11.4342L6.5708 9.41861L9.91035 11.4342L9.02413 7.63535L11.9746 5.07935Z";

/* ── Gallery marker data — includes card props for bottom preview ── */
interface GalleryMarker {
  lat: number;
  lng: number;
  name: string;
  image: string;
  rating: string;
  status: string;
  statusColor: string;
  tag: string;
  thumbnails: string[];
}

const galleryMarkers: GalleryMarker[] = [
  { lat: 40.7243, lng: -74.0018, name: "Gagosian", image: g1, rating: "4.5", status: "Open", statusColor: "#4caf50", tag: "Chelsea", thumbnails: [g1] },
  { lat: 40.7195, lng: -73.9977, name: "Templon", image: g2, rating: "3.6", status: "Closed", statusColor: "#ed2115", tag: "Lower East Side", thumbnails: [g2] },
  { lat: 40.7223, lng: -73.9935, name: "Pace Gallery", image: g3, rating: "4.1", status: "Open", statusColor: "#4caf50", tag: "Chelsea", thumbnails: [g3] },
  { lat: 40.7168, lng: -74.0009, name: "David Zwirner", image: g4, rating: "4.3", status: "Open", statusColor: "#4caf50", tag: "Chelsea", thumbnails: [g4] },
  { lat: 40.7210, lng: -73.9882, name: "Sperone Westwater", image: g5, rating: "3.8", status: "Closed", statusColor: "#ed2115", tag: "Bowery", thumbnails: [g5] },
  { lat: 40.7260, lng: -73.9897, name: "Howl Gallery", image: g6, rating: "3.4", status: "Open", statusColor: "#4caf50", tag: "East Village", thumbnails: [g6] },
  { lat: 40.7185, lng: -73.9912, name: "West Village Arts", image: g7, rating: "3.9", status: "Closed", statusColor: "#ed2115", tag: "West Village", thumbnails: [g7] },
];

/* Convert a GalleryMarker to SmallGalleryCardProps */
function markerToCardProps(m: GalleryMarker): SmallGalleryCardProps {
  return {
    name: m.name,
    thumbnails: m.thumbnails,
    rating: m.rating,
    status: m.status,
    statusColor: m.statusColor,
    tag: m.tag,
  };
}

/**
 * Create a Luma-style Leaflet divIcon:
 * Rounded square with gallery image, white border, drop shadow,
 * and a small downward triangle pointer.
 */
function createImageMarkerIcon(imageUrl: string, selected = false) {
  const size = selected ? 48 : 40;
  const borderWidth = selected ? 3 : 2.5;
  const borderColor = selected ? "#171717" : "white";
  const html = `
    <div style="
      position:relative;
      width:${size}px;
      height:${size + 8}px;
      filter:drop-shadow(0 2px 4px rgba(0,0,0,${selected ? 0.5 : 0.3}));
      transition:all 0.15s ease;
    ">
      <div style="
        width:${size}px;
        height:${size}px;
        border-radius:8px;
        border:${borderWidth}px solid ${borderColor};
        overflow:hidden;
        background:#eee;
      ">
        <img src="${imageUrl}" style="
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        " />
      </div>
      <div style="
        width:0;
        height:0;
        border-left:6px solid transparent;
        border-right:6px solid transparent;
        border-top:8px solid ${borderColor};
        margin:0 auto;
        margin-top:-1px;
      "></div>
    </div>
  `;
  return L.divIcon({
    className: "",
    html,
    iconSize: [size, size + 8],
    iconAnchor: [size / 2, size + 8],
    popupAnchor: [0, -(size + 4)],
  });
}

/* ── Filter Pill ── */
function FilterPill({
  label,
  active = false,
  icon,
}: {
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="shrink-0 flex items-center justify-center gap-[2px] rounded-[21px] cursor-pointer"
      style={{
        background: active ? "#bbb" : "#e7e7e7",
        padding: "4.218px 6.025px",
      }}
    >
      {icon}
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

/* ── Props ── */
export interface MapOverlayProps {
  onClose: () => void;
  /** When provided, show gallery cards at bottom and "Results" header */
  resultCards?: SmallGalleryCardProps[];
  onGallerySelect?: (index: number) => void;
  /** Optional selected marker index for demos/initial state */
  initialSelectedMarkerIdx?: number | null;
  /** Show tap pulse on the selected marker (for flow demos) */
  showSelectedMarkerPulse?: boolean;
}

export function MapOverlay({
  onClose,
  resultCards,
  onGallerySelect,
  initialSelectedMarkerIdx = null,
  showSelectedMarkerPulse = false,
}: MapOverlayProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const leafletMarkersRef = useRef<L.Marker[]>([]);
  const [showCrawls, setShowCrawls] = useState(false);
  const [selectedMarkerIdx, setSelectedMarkerIdx] = useState<number | null>(initialSelectedMarkerIdx);
  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedMarkerPoint, setSelectedMarkerPoint] = useState<{ x: number; y: number } | null>(null);
  const [showCrawlList, setShowCrawlList] = useState(false);
  const [crawlListData, setCrawlListData] = useState<CrawlListData | undefined>(undefined);

  const hasResultCards = resultCards && resultCards.length > 0;
  const hasBottomCards = hasResultCards || selectedMarkerIdx !== null;

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    /* Initialize Leaflet map centered on Lower Manhattan */
    const map = L.map(mapContainerRef.current, {
      center: [40.7195, -73.9974],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    /* CartoDB Positron tiles — light/grey style matching Figma */
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    /* Create Luma-style image markers for galleries */
    const markers: L.Marker[] = [];
    galleryMarkers.forEach((m, idx) => {
      const icon = createImageMarkerIcon(m.image);
      const marker = L.marker([m.lat, m.lng], { icon }).addTo(map);

      /* On marker click — show gallery card at bottom */
      marker.on("click", () => {
        setSelectedMarkerIdx((prev) => (prev === idx ? null : idx));
      });

      markers.push(marker);
    });

    leafletMarkersRef.current = markers;

    /* Clicking the map background deselects marker */
    map.on("click", () => {
      setSelectedMarkerIdx(null);
    });

    mapInstanceRef.current = map;
    setIsMapReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      leafletMarkersRef.current = [];
      setIsMapReady(false);
    };
  }, []);

  /* Update marker icons when selection changes */
  useEffect(() => {
    leafletMarkersRef.current.forEach((marker, idx) => {
      const m = galleryMarkers[idx];
      const isSelected = idx === selectedMarkerIdx;
      marker.setIcon(createImageMarkerIcon(m.image, isSelected));
    });
  }, [selectedMarkerIdx]);

  useEffect(() => {
    setSelectedMarkerIdx(initialSelectedMarkerIdx ?? null);
  }, [initialSelectedMarkerIdx]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isMapReady || selectedMarkerIdx === null) {
      setSelectedMarkerPoint(null);
      return;
    }

    const updatePoint = () => {
      const markerInstance = leafletMarkersRef.current[selectedMarkerIdx];
      const markerEl = markerInstance?.getElement();
      const containerEl = mapContainerRef.current;

      if (markerEl && containerEl) {
        const markerRect = markerEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();
        /* Anchor pulse to the icon body center, not the pointer tip. */
        setSelectedMarkerPoint({
          x: markerRect.left - containerRect.left + markerRect.width / 2,
          y: markerRect.top - containerRect.top + markerRect.height * 0.42,
        });
        return;
      }

      const markerData = galleryMarkers[selectedMarkerIdx];
      if (markerData) {
        const point = map.latLngToContainerPoint([markerData.lat, markerData.lng]);
        setSelectedMarkerPoint({ x: point.x, y: point.y - 16 });
      }
    };

    const raf = window.requestAnimationFrame(updatePoint);
    map.on("move zoom", updatePoint);
    return () => {
      window.cancelAnimationFrame(raf);
      map.off("move zoom", updatePoint);
    };
  }, [isMapReady, selectedMarkerIdx]);

  /* "Near Me" — fly to user approx location (Union Square area) */
  const handleNearMe = () => {
    mapInstanceRef.current?.flyTo([40.7359, -73.9911], 15, {
      duration: 1,
    });
  };

  /* Build the bottom card(s) to display */
  const bottomCards: SmallGalleryCardProps[] = hasResultCards
    ? resultCards
    : selectedMarkerIdx !== null
    ? [markerToCardProps(galleryMarkers[selectedMarkerIdx])]
    : [];

  return (
    <div className="absolute inset-0 z-[20] bg-white flex flex-col">
      {/* ── Map (fills entire area) ── */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0" />

      {/* ── Marker tap pulse (demo assist, anchored to actual marker location) ── */}
      <AnimatePresence>
        {showSelectedMarkerPulse && selectedMarkerPoint && (
          <motion.div
            key={`marker-pulse-${selectedMarkerIdx}`}
            initial={{ opacity: 0, scale: 0.84 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.84 }}
            className="absolute z-[12] pointer-events-none"
            style={{ left: selectedMarkerPoint.x - 8, top: selectedMarkerPoint.y - 8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.28, 1], opacity: [0.72, 1, 0.72] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              className="w-[16px] h-[16px] rounded-full bg-[#f05a28]"
              style={{ boxShadow: "0 0 0 8px rgba(240,90,40,0.24)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating top card ── */}
      <div
        className="absolute left-1/2 z-10 bg-white overflow-hidden"
        style={{
          top: "6px",
          transform: "translateX(-50%)",
          width: "309px",
          borderRadius: "15px",
          boxShadow: "0px 4px 4.5px 0px rgba(0,0,0,0.25)",
          padding: "0",
        }}
      >
        {/* Back button + Search bar row */}
        <div className="flex items-center gap-[4px] px-[10px] pt-[10px]">
          {/* Back button */}
          <div
            className="shrink-0 cursor-pointer flex items-center justify-center"
            style={{ width: "26.602px", height: "26.444px" }}
            onClick={onClose}
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

          {/* Search bar */}
          <div
            className="flex-1 rounded-[52px] flex items-center overflow-hidden"
            style={{ border: "1px solid #373737" }}
          >
            <div className="flex gap-[35px] items-center overflow-hidden pl-[17px] pr-[24px] py-[4px] w-full">
              <div className="flex items-center gap-[8px] shrink-0">
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  viewBox="0 0 13 13"
                  className="shrink-0"
                >
                  <path d={svgPaths.p1e038700} fill="#3E3E3E" />
                </svg>
                <span
                  className="font-['KMR_Waldenburg:Normal',sans-serif]"
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
              {/* Vertical divider */}
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: "0px", height: "17px" }}
              >
                <svg
                  width="17"
                  height="1"
                  fill="none"
                  viewBox="0 0 17 1"
                  style={{ transform: "rotate(90deg)" }}
                >
                  <line
                    stroke="#E2E2E2"
                    strokeLinecap="round"
                    x1="0.5"
                    x2="16.5"
                    y1="0.5"
                    y2="0.5"
                  />
                </svg>
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

        {/* Filter pills row */}
        <div className="flex items-center gap-[5px] px-[10px] mt-[6px] pb-[4px]">
          <FilterPill label="All Galleries" active />
          <FilterPill label="Saved Galleries" />
          <FilterPill
            label="Date"
            icon={
              <svg
                width="6.3"
                height="7"
                fill="none"
                viewBox="0 0 6.3 7"
                className="shrink-0"
              >
                <path d={calendarIconPath} fill="black" />
              </svg>
            }
          />
          <FilterPill
            label="Rating"
            icon={
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
            }
          />
        </div>

        {/* Subtitle + "Results" title (shown when results provided) */}
        <div className="px-[16px] pb-[10px]">
          <p
            className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
            style={{
              fontSize: hasResultCards ? "10px" : "12px",
              letterSpacing: hasResultCards ? "-0.3px" : "-0.36px",
              lineHeight: "normal",
              color: hasResultCards ? "#343333" : "#535252",
            }}
          >
            330 shows in NYC
          </p>
          {hasResultCards && (
            <div className="flex items-center gap-[4px] mt-[-7px]">
              <p
                className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
                style={{
                  fontSize: "35px",
                  letterSpacing: "-1.75px",
                  lineHeight: "56.249px",
                  fontWeight: 600,
                  color: "#494949",
                }}
              >
                Results
              </p>
              <svg width="17" height="15.543" fill="none" viewBox="0 0 17 15.5429">
                <path d={svgPaths.p11c2c680} fill="#4E4E4E" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* ── "Near Me" FAB — hidden when bottom cards visible ── */}
      {!hasBottomCards && (
        <div
          className="absolute z-10 cursor-pointer"
          style={{ right: "10px", bottom: "75px" }}
          onClick={handleNearMe}
        >
          <div className="bg-[#171717] rounded-[14px] relative">
            <div className="flex gap-[8px] items-center justify-center overflow-hidden px-[14px] py-[11px] rounded-[inherit]">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d={sendArrowPath} fill="white" />
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
                Near Me
              </span>
            </div>
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                inset: "-1px",
                border: "1px solid #7f7f7f",
                borderRadius: "15px",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Bottom gallery card(s) — shown when marker clicked or results provided ── */}
      <AnimatePresence>
        {bottomCards.length > 0 && !showCrawls && (
          <motion.div
            key="bottom-cards"
            initial={{ y: 140 }}
            animate={{ y: 0 }}
            exit={{ y: 140 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="absolute left-0 right-0 z-10"
            style={{ bottom: "8px" }}
          >
            <div
              className="flex gap-[10px] overflow-x-auto no-scrollbar px-[13px] pb-[4px]"
            >
              {bottomCards.map((card, i) => (
                <SmallGalleryCard
                  key={`${card.name}-${i}`}
                  {...card}
                  onClick={() => onGallerySelect?.(i)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── "400+ Crawls" bottom peek — only when no bottom cards showing ── */}
      {!hasBottomCards && (
        <div
          className="absolute left-0 right-0 z-10 bg-[#fdfdfd] overflow-hidden cursor-pointer"
          style={{
            bottom: "-1px",
            height: "61px",
            borderRadius: "19px 19px 0 0",
            boxShadow: "0px -1px 2px 1px rgba(0,0,0,0.17)",
          }}
          onClick={() => setShowCrawls(true)}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-[4px]">
            <svg width="54" height="9" fill="none" viewBox="0 0 54 9">
              <path d="M9 3.5H46" stroke="#DCDCDC" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex items-center justify-between px-[27px] pt-[8px]">
            <span
              className="font-['KMR_Waldenburg:Normal',sans-serif]"
              style={{
                fontSize: "15px",
                letterSpacing: "-1.05px",
                lineHeight: "normal",
                fontWeight: 500,
                color: "#3f3f3f",
              }}
            >
              400+ Crawls
            </span>
            <div className="flex items-center gap-[4px]">
              {/* Expand chevron */}
              <svg
                width="15.56"
                height="9.19"
                fill="none"
                viewBox="0 0 15.56 9.19"
              >
                <path d={expandChevronPath} fill="#3F3F3F" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ── Crawls overlay — slides up from bottom, swipe down to dismiss ── */}
      <AnimatePresence>
        {showCrawls && (
          <motion.div
            key="crawls-overlay"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 120 || info.velocity.y > 400) {
                setShowCrawls(false);
              }
            }}
            className="absolute inset-0 z-20 bg-[#fdfdfd] rounded-t-[19px] overflow-hidden flex flex-col"
            style={{ touchAction: "none" }}
          >
            {/* Drag handle bar — always visible at top */}
            <div
              className="shrink-0 flex justify-center pt-[6px] pb-[2px] cursor-grab active:cursor-grabbing"
            >
              <div
                className="rounded-full bg-[#DCDCDC]"
                style={{ width: "36px", height: "4px" }}
              />
            </div>
            {/* Scrollable crawls content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <CrawlsPage
                onClose={() => setShowCrawls(false)}
                onCrawlSelect={() => {
                  setCrawlListData(undefined);
                  setShowCrawlList(true);
                }}
                onEditorPickSelect={() => {
                  setCrawlListData(editorPickCrawlData);
                  setShowCrawlList(true);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Crawl List Page — slides in from right when a crawl card is tapped ── */}
      <AnimatePresence>
        {showCrawlList && (
          <motion.div
            key="crawl-list-overlay"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute inset-0 z-[30]"
          >
            <CrawlListPage data={crawlListData} onBack={() => setShowCrawlList(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
