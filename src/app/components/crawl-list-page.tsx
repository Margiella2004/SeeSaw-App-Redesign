/**
 * CrawlListPage — Detail view for a single crawl list.
 * Shows hero image, back button, share icon, crawl title, participant avatars,
 * description, stats, action buttons (heart, more), "All Galleries" section.
 * The "..." (more) button opens an EditCrawlSheet popup at the bottom.
 */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PopularGalleryRow } from "./cards/popular-gallery-row";
import type { PopularGalleryRowData } from "./cards/popular-gallery-row";

/* ── Asset imports ── */
import imgFrame127 from "figma:asset/3f37c4f976936bf1ff66b7538ae72d72177bfb60.png";
import imgFrame128 from "figma:asset/060c9b677576285b9b91a8bc91c21312e2196666.png";
import imgScreenshot from "figma:asset/bbe27be7264aa64f422323979714b07f12d78766.png";
import imgEditorPick1 from "figma:asset/7d93da9c324ab275f266ba6eb83e5f64df13bad5.png";
import { galleryImages, portraitImages } from "./curated-images";

/* ── Gallery marker images (reused from map overlay) ── */
import imgImg37 from "figma:asset/1c71df1f5c2350897de8d7ddd21f93ff0c870135.png";
import imgImg0033 from "figma:asset/adff4ffb64b292e48692107c162fb09c3b619a6d.png";
import imgPaceGallery from "figma:asset/c6a495e8fa1b4c67c25c46ced665b4180d0b8b8b.png";
import imgDavidZwirner from "figma:asset/4072138aef73d27606f82a2e733082f498f7f83e.png";
import imgImg38 from "figma:asset/48a56065a50075cfcbcf9ba71f215ce09ca66b38.png";
import imgGalleryClosed from "figma:asset/3656c9acaabde16661883574cb58347d73c106a8.png";
import imgGalleryClosed3 from "figma:asset/9f3f9bb5fc4a5255a1a1af2ec6beb0ef39274c11.png";

const [g1, g2, g3, g4, g5, g6, g7, addGalleryCardImage] = galleryImages;
const [p1, p2] = portraitImages;

/* ── SVG paths (from Figma imports) ── */
/* Back chevron */
const backChevronPath =
  "M10.3704 1.58923L8.79749 0L0 8.88889L8.79749 17.7778L10.3704 16.1886L3.14577 8.88889L10.3704 1.58923Z";
/* Share / export icon */
const shareIconPath =
  "M7.26885 0L3.63443 3.63443H6.36025V11.8119H8.17746V3.63443H10.9033M12.7205 19.9893H1.81721C0.80866 19.9893 0 19.1716 0 18.1721V7.26885C0 6.7869 0.191456 6.32468 0.532249 5.98389C0.873043 5.6431 1.33526 5.45164 1.81721 5.45164H4.54303V7.26885H1.81721V18.1721H12.7205V7.26885H9.99467V5.45164H12.7205C13.2024 5.45164 13.6647 5.6431 14.0055 5.98389C14.3462 6.32468 14.5377 6.7869 14.5377 7.26885V18.1721C14.5377 18.6541 14.3462 19.1163 14.0055 19.4571C13.6647 19.7979 13.2024 19.9893 12.7205 19.9893Z";
/* Heart icon */
const heartPath =
  "M11.9928 17.4928L11.0503 16.6295C7.70275 13.5756 5.49275 11.5549 5.49275 9.08948C5.49275 7.06878 7.06575 5.49275 9.06775 5.49275C10.1988 5.49275 11.2843 6.02245 11.9928 6.85297C12.7013 6.02245 13.7868 5.49275 14.9178 5.49275C16.9198 5.49275 18.4928 7.06878 18.4928 9.08948C18.4928 11.5549 16.2828 13.5756 12.9353 16.6295L11.9928 17.4928Z";
/* Three dots (more) icon */
const moreDotsPath =
  "M16 12C16 11.4696 16.2107 10.9609 16.5858 10.5858C16.9609 10.2107 17.4696 10 18 10C18.5304 10 19.0391 10.2107 19.4142 10.5858C19.7893 10.9609 20 11.4696 20 12C20 12.5304 19.7893 13.0391 19.4142 13.4142C19.0391 13.7893 18.5304 14 18 14C17.4696 14 16.9609 13.7893 16.5858 13.4142C16.2107 13.0391 16 12.5304 16 12ZM10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12ZM4 12C4 11.4696 4.21071 10.9609 4.58579 10.5858C4.96086 10.2107 5.46957 10 6 10C6.53043 10 7.03914 10.2107 7.41421 10.5858C7.78929 10.9609 8 11.4696 8 12C8 12.5304 7.78929 13.0391 7.41421 13.4142C7.03914 13.7893 6.53043 14 6 14C5.46957 14 4.96086 13.7893 4.58579 13.4142C4.21071 13.0391 4 12.5304 4 12Z";
/* Plus icon */
const plusPath =
  "M15.75 11.25H11.25V15.75H9.75V11.25H5.25V9.75H9.75V5.25H11.25V9.75H15.75V11.25Z";
/* Car icon (transport/ride) */
const carIconPath =
  "M24.5 29.1667L26.25 23.9167H39.0833L40.8333 29.1667M39.0833 35C38.6192 35 38.1741 34.8156 37.8459 34.4874C37.5177 34.1592 37.3333 33.7141 37.3333 33.25C37.3333 32.7859 37.5177 32.3408 37.8459 32.0126C38.1741 31.6844 38.6192 31.5 39.0833 31.5C39.5475 31.5 39.9926 31.6844 40.3208 32.0126C40.649 32.3408 40.8333 32.7859 40.8333 33.25C40.8333 33.7141 40.649 34.1592 40.3208 34.4874C39.9926 34.8156 39.5475 35 39.0833 35ZM26.25 35C25.7859 35 25.3408 34.8156 25.0126 34.4874C24.6844 34.1592 24.5 33.7141 24.5 33.25C24.5 32.7859 24.6844 32.3408 25.0126 32.0126C25.3408 31.6844 25.7859 31.5 26.25 31.5C26.7141 31.5 27.1592 31.6844 27.4874 32.0126C27.8156 32.3408 28 32.7859 28 33.25C28 33.7141 27.8156 34.1592 27.4874 34.4874C27.1592 34.8156 26.7141 35 26.25 35ZM40.74 23.3333C40.5067 22.6567 39.8533 22.1667 39.0833 22.1667H26.25C25.48 22.1667 24.8267 22.6567 24.5933 23.3333L22.1667 30.3333V39.6667C22.1667 39.9761 22.2896 40.2728 22.5084 40.4916C22.7272 40.7104 23.0239 40.8333 23.3333 40.8333H24.5C24.8094 40.8333 25.1062 40.7104 25.325 40.4916C25.5438 40.2728 25.6667 39.9761 25.6667 39.6667V38.5H39.6667V39.6667C39.6667 39.9761 39.7896 40.2728 40.0084 40.4916C40.2272 40.7104 40.5239 40.8333 40.8333 40.8333H42C42.3094 40.8333 42.6062 40.7104 42.825 40.4916C43.0438 40.2728 43.1667 39.9761 43.1667 39.6667V30.3333L40.74 23.3333Z";
/* Delete (minus circle) icon */
const deleteCirclePath =
  "M10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM5 11H15V9H5";
/* Edit (pencil) icon */
const editPencilPath =
  "M17.71 4.0425C18.1 3.6525 18.1 3.0025 17.71 2.6325L15.37 0.2925C15 -0.0975 14.35 -0.0975 13.96 0.2925L12.12 2.1225L15.87 5.8725M0 14.2525V18.0025H3.75L14.81 6.9325L11.06 3.1825L0 14.2525Z";

/* ── Crawl map marker data ── */
function createCrawlMarkerIcon(imageUrl: string) {
  const size = 36;
  const html = `
    <div style="
      position:relative;
      width:${size}px;
      height:${size + 7}px;
      filter:drop-shadow(0 2px 3px rgba(0,0,0,0.25));
    ">
      <div style="
        width:${size}px;
        height:${size}px;
        border-radius:7px;
        border:2.5px solid white;
        overflow:hidden;
        background:#ddd;
      ">
        <img src="${imageUrl}" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div style="
        width:0;
        height:0;
        border-left:5px solid transparent;
        border-right:5px solid transparent;
        border-top:6px solid white;
        margin:0 auto;
        margin-top:-1px;
      "></div>
    </div>
  `;
  return L.divIcon({
    className: "",
    html,
    iconSize: [size, size + 7],
    iconAnchor: [size / 2, size + 7],
  });
}

/* ── Crawl data type ── */
export interface CrawlMapMarker {
  lat: number;
  lng: number;
  image: string;
}

export interface CrawlListData {
  id: string;
  title: string;
  heroImage?: string;
  description: string;
  showCount: number;
  likeCount: number;
  location: string;
  participants: { name: string; avatar?: string }[];
  /** Optional gallery rows displayed in the "All Galleries" section */
  galleryRows?: PopularGalleryRowData[];
  /** Optional map markers — falls back to default set if not provided */
  mapMarkers?: CrawlMapMarker[];
}

/* ── Default map markers (used when crawl doesn't specify its own) ── */
const defaultMapMarkers: CrawlMapMarker[] = [
  { lat: 40.7243, lng: -74.0018, image: g1 },
  { lat: 40.7195, lng: -73.9977, image: g2 },
  { lat: 40.7223, lng: -73.9935, image: g3 },
  { lat: 40.7168, lng: -74.0009, image: g4 },
  { lat: 40.7210, lng: -73.9882, image: g5 },
  { lat: 40.7260, lng: -73.9897, image: g6 },
  { lat: 40.7185, lng: -73.9912, image: g7 },
];

/* ── Default crawl data ── */
export const defaultCrawlListData: CrawlListData = {
  id: "crawl-1",
  title: "Chelsea Openings",
  heroImage: imgScreenshot,
  description:
    "A tight route for first-time visitors to Chelsea. Start on 24th Street, then work south toward 19th to catch the late-afternoon openings. Most galleries on this list are walkable within ten minutes.",
  showCount: 14,
  likeCount: 328,
  location: "NYC",
  participants: [
    { name: "Nina Patel", avatar: p1 },
    { name: "Marco Dunn", avatar: p2 },
  ],
  mapMarkers: [
    { lat: 40.7243, lng: -74.0018, image: g1 },
    { lat: 40.7195, lng: -73.9977, image: g2 },
    { lat: 40.7223, lng: -73.9935, image: g3 },
    { lat: 40.7168, lng: -74.0009, image: g4 },
  ],
};

/* ── Editor's Pick crawl data ── */
export const editorPickCrawlData: CrawlListData = {
  id: "editor-pick-1",
  title: "Editor's Weekend Route",
  heroImage: imgEditorPick1,
  description:
    "A balanced Saturday route with painting-heavy shows, one major institutional stop, and two small project spaces. Designed for a 3-4 hour visit with coffee breaks in between.",
  showCount: 10,
  likeCount: 187,
  location: "NYC",
  participants: [
    { name: "Samira Noor", avatar: imgFrame127 },
    { name: "Theo Park", avatar: imgFrame128 },
  ],
  mapMarkers: [
    { lat: 40.7248, lng: -74.0005, image: imgImg38 },
    { lat: 40.7200, lng: -73.9960, image: imgGalleryClosed },
    { lat: 40.7218, lng: -73.9910, image: imgGalleryClosed3 },
    { lat: 40.7175, lng: -73.9985, image: imgPaceGallery },
    { lat: 40.7255, lng: -73.9930, image: imgDavidZwirner },
  ],
  galleryRows: [
    { id: "ep-g1", thumbnailSrc: imgImg37, name: "Gagosian", hours: "10am-6pm", status: "Open", statusColor: "#4caf50", galleryLink: "Chelsea", rating: "4.5" },
    { id: "ep-g2", thumbnailSrc: imgImg0033, name: "David Zwirner", hours: "10am-6pm", status: "Open", statusColor: "#4caf50", galleryLink: "Chelsea", rating: "4.3" },
    { id: "ep-g3", thumbnailSrc: imgPaceGallery, name: "Pace Gallery", hours: "10am-6pm", status: "Open", statusColor: "#4caf50", galleryLink: "Chelsea", rating: "4.2" },
    { id: "ep-g4", thumbnailSrc: imgDavidZwirner, name: "Matthew Marks", hours: "11am-6pm", status: "Open", statusColor: "#4caf50", galleryLink: "Chelsea", rating: "4.1" },
    { id: "ep-g5", thumbnailSrc: imgGalleryClosed, name: "Petzel", hours: "11am-6pm", status: "Closed", statusColor: "#ed2115", galleryLink: "Tribeca", rating: "4.0" },
  ],
};

/* ══════════════════════════════════════════════
   EDIT CRAWL SHEET — bottom popup
   ══════════════════════════════════════════════ */

function EditCrawlSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-[70]"
            onClick={onClose}
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 z-[80] bg-white overflow-hidden"
            style={{
              borderRadius: "15px 15px 0 0",
              boxShadow: "0px -2px 4.5px 0px rgba(0,0,0,0.25)",
            }}
          >
            {/* Title */}
            <div className="flex items-center justify-between px-[20px] pt-[16px]">
              <p
                className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
                style={{
                  fontSize: "15px",
                  letterSpacing: "-0.45px",
                  lineHeight: "normal",
                  color: "#3f3f3f",
                }}
              >
                Edit Crawl
              </p>
            </div>

            {/* Edit the crawl option */}
            <div
              className="flex items-center gap-[12px] mx-[13px] mt-[14px] rounded-[7px] cursor-pointer"
              style={{ height: "34px", padding: "0 8px" }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 18.0025 18.0025" className="shrink-0">
                <path d={editPencilPath} fill="#B8B8B8" />
              </svg>
              <p
                className="font-['KMR_Waldenburg:Normal',sans-serif]"
                style={{
                  fontSize: "12px",
                  letterSpacing: "-0.84px",
                  lineHeight: "normal",
                  fontWeight: 500,
                  color: "#828181",
                }}
              >
                Edit the crawl
              </p>
            </div>

            {/* Delete the crawl option */}
            <div
              className="flex items-center gap-[12px] mx-[13px] mt-[4px] rounded-[7px] bg-[#efeeee] cursor-pointer"
              style={{ height: "34px", padding: "0 8px" }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="shrink-0">
                <path d={deleteCirclePath} fill="#B8B8B8" />
              </svg>
              <p
                className="font-['KMR_Waldenburg:Normal',sans-serif]"
                style={{
                  fontSize: "12px",
                  letterSpacing: "-0.84px",
                  lineHeight: "normal",
                  fontWeight: 500,
                  color: "#828181",
                }}
              >
                Delete the crawl
              </p>
            </div>

            {/* Drag handle bar at bottom */}
            <div className="flex justify-center py-[14px]">
              <svg width="48" height="2" fill="none" viewBox="0 0 48 2">
                <path d="M1 1H47" stroke="#DCDCDC" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════
   CRAWL LIST PAGE — main detail view
   ══════════════════════════════════════════════ */

export function CrawlListPage({
  data = defaultCrawlListData,
  onBack,
}: {
  data?: CrawlListData;
  onBack: () => void;
}) {
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likePulseTick, setLikePulseTick] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  /* Auto-scroll past the hidden map section on mount */
  const MAP_HEIGHT = 220;
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = MAP_HEIGHT;
    }
  }, []);

  /* Initialize Leaflet map for the hidden reveal section */
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [40.7215, -73.9960],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      { maxZoom: 19 }
    ).addTo(map);

    const markers = data.mapMarkers || defaultMapMarkers;
    markers.forEach((m) => {
      L.marker([m.lat, m.lng], { icon: createCrawlMarkerIcon(m.image) }).addTo(map);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const extraCount =
    data.participants.length > 2 ? data.participants.length - 2 : 8;
  const displayNames =
    data.participants.length > 0
      ? data.participants.map((p) => p.name).join(" and ")
      : "Eric White and Alberta Whittle";
  const displayedLikeCount = data.likeCount + (isLiked ? 1 : 0);

  const handleHeartToggle = () => {
    setIsLiked((prev) => {
      const next = !prev;
      if (next) {
        setLikePulseTick((tick) => tick + 1);
      }
      return next;
    });
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* ── Map layer — pinned behind scroll content ── */}
      <div
        ref={mapContainerRef}
        className="absolute top-0 left-0 right-0"
        style={{ height: `${MAP_HEIGHT}px`, zIndex: 0 }}
      />

      {/* ── Scrollable content layer — slides over the map ── */}
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden no-scrollbar"
        style={{ zIndex: 1 }}
      >
        {/* Transparent spacer — map shows through here */}
        <div style={{ height: `${MAP_HEIGHT}px` }} />

        {/* White content block — covers the map when scrolled down */}
        <div
          className="bg-white relative"
          style={{
            minHeight: "100%",
            boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
            borderRadius: "12px 12px 0 0",
          }}
        >
          {/* ── Hero image area ── */}
          <div className="relative w-full overflow-hidden" style={{ height: "200px", borderRadius: "12px 12px 0 0" }}>
            {data.heroImage ? (
              <img
                src={data.heroImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[#c4c4c4]" />
            )}

            {/* ── "results" back button (dark pill) ── */}
            <div
              className="absolute bg-[#171717] rounded-[67px] cursor-pointer"
              style={{ left: "12px", top: "13px" }}
              onClick={onBack}
            >
              <div className="flex gap-[6px] items-center justify-center overflow-hidden px-[13px] py-[9px] rounded-[inherit]">
                <svg
                  width="10.37"
                  height="17.78"
                  fill="none"
                  viewBox="0 0 10.3704 17.7778"
                  className="shrink-0"
                >
                  <path d={backChevronPath} fill="#D6D6D6" />
                </svg>
                <p
                  className="font-['KMR_Waldenburg:Buch',sans-serif]"
                  style={{
                    fontSize: "15px",
                    letterSpacing: "-0.45px",
                    lineHeight: "normal",
                    color: "#d6d6d6",
                  }}
                >
                  results
                </p>
              </div>
              <div
                aria-hidden="true"
                className="absolute border border-[#d9d9d9] inset-0 pointer-events-none rounded-[67px]"
              />
            </div>

            {/* ── Share icon (top right) ── */}
            <div
              className="absolute bg-[#d9d9d9] flex items-center justify-center rounded-[37px] cursor-pointer"
              style={{
                right: "20px",
                top: "8px",
                padding: "6px 9px 7px 9px",
              }}
            >
              <svg
                width="14.5"
                height="20"
                fill="none"
                viewBox="0 0 14.5377 19.9893"
                className="shrink-0"
              >
                <path d={shareIconPath} fill="black" />
              </svg>
            </div>

            {/* ── Car / transport icon (overlapping hero bottom-right) ── */}
            <div
              className="absolute z-10"
              style={{ right: "20px", bottom: "-30px" }}
            >
              <svg
                width="65"
                height="63"
                fill="none"
                viewBox="0 0 65.3333 63"
              >
                <rect
                  fill="#F3F3F3"
                  height="61.833"
                  rx="30.917"
                  width="64.167"
                  x="0.583"
                  y="0.583"
                />
                <rect
                  height="61.833"
                  rx="30.917"
                  stroke="#D9D9D9"
                  strokeWidth="1.167"
                  width="64.167"
                  x="0.583"
                  y="0.583"
                />
                <path d={carIconPath} fill="#D6D6D6" />
              </svg>
            </div>
          </div>

          {/* ── Title ── */}
          <p
            className="font-['KMR_Waldenburg:Halbfett',sans-serif] px-[19px]"
            style={{
              fontSize: "24px",
              letterSpacing: "-1.2px",
              lineHeight: "normal",
              fontWeight: 600,
              color: "#535353",
              marginTop: "16px",
            }}
          >
            {data.title}
          </p>

          {/* ── Participant avatars ── */}
          <div className="flex items-center px-[19px] mt-[8px]">
            <div className="flex items-center">
              {/* Avatar 1 */}
              {data.participants[0]?.avatar && (
                <div
                  className="relative rounded-full shrink-0"
                  style={{
                    width: "31.37px",
                    height: "31.37px",
                    marginRight: "-14px",
                  }}
                >
                  <img
                    src={data.participants[0].avatar}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border-[1.79px] border-white"
                  />
                </div>
              )}
              {/* Avatar 2 */}
              {data.participants[1]?.avatar && (
                <div
                  className="relative rounded-full shrink-0"
                  style={{
                    width: "31.37px",
                    height: "31.37px",
                    marginRight: "-14px",
                  }}
                >
                  <img
                    src={data.participants[1].avatar}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border-[1.79px] border-white"
                  />
                </div>
              )}
              {/* +N circle */}
              <div
                className="relative bg-[#c4c4c4] rounded-full shrink-0 flex items-center justify-center"
                style={{
                  width: "31.37px",
                  height: "31.37px",
                  marginRight: "-14px",
                }}
              >
                <p
                  className="font-['KMR_Waldenburg:Normal',sans-serif]"
                  style={{
                    fontSize: "12.273px",
                    letterSpacing: "-0.368px",
                    lineHeight: "normal",
                    color: "#f4f4f4",
                  }}
                >
                  +{extraCount}
                </p>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border-[1.79px] border-white pointer-events-none"
                />
              </div>
              {/* Name pill */}
              <div
                className="relative bg-[#dddcdc] rounded-[34px] flex items-center justify-center shrink-0"
                style={{
                  padding: "9px 9px 9px 8px",
                  marginRight: "-14px",
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute rounded-[36px] border-[1.79px] border-white pointer-events-none"
                  style={{ inset: "-1.79px" }}
                />
                <p
                  className="font-['KMR_Waldenburg:Normal',sans-serif]"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "-0.27px",
                    lineHeight: "normal",
                    color: "#333",
                  }}
                >
                  {displayNames}
                </p>
              </div>
            </div>
          </div>

          {/* ── Description text ── */}
          <p
            className="font-['KMR_Waldenburg:Normal',sans-serif] px-[19px]"
            style={{
              fontSize: "10px",
              letterSpacing: "-0.3px",
              lineHeight: "1.39",
              color: "#403d3d",
              marginTop: "16px",
              whiteSpace: "pre-wrap",
            }}
          >
            {data.description}
          </p>

          {/* ── Stats row ── */}
          <div
            className="flex items-center gap-[0px] px-[26px]"
            style={{ marginTop: "14px" }}
          >
            <span
              className="font-['KMR_Waldenburg:Normal',sans-serif]"
              style={{
                fontSize: "10px",
                letterSpacing: "-0.7px",
                lineHeight: "normal",
                fontWeight: 500,
                color: "#b0b0b0",
              }}
            >
              {data.showCount} shows
            </span>
            <div
              className="rounded-full bg-[#c5c5c5] mx-[10px]"
              style={{ width: "4px", height: "4px" }}
            />
            <span
              className="font-['KMR_Waldenburg:Normal',sans-serif]"
              style={{
                fontSize: "10px",
                letterSpacing: "-0.7px",
                lineHeight: "normal",
                fontWeight: 500,
                color: "#b0b0b0",
              }}
            >
              {displayedLikeCount} likes
            </span>
            <div
              className="rounded-full bg-[#c5c5c5] mx-[10px]"
              style={{ width: "4px", height: "4px" }}
            />
            <span
              className="font-['KMR_Waldenburg:Normal',sans-serif] underline"
              style={{
                fontSize: "10px",
                letterSpacing: "-0.7px",
                lineHeight: "normal",
                fontWeight: 500,
                color: "#b0b0b0",
              }}
            >
              {data.location}
            </span>
          </div>

          {/* ── Action buttons: Heart + More ── */}
          <div
            className="flex items-center gap-[4px] px-[23px]"
            style={{ marginTop: "10px" }}
          >
            {/* Heart button */}
            <motion.button
              type="button"
              className="relative shrink-0 cursor-pointer"
              style={{ width: "24px", height: "23px" }}
              onClick={handleHeartToggle}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence>
                {isLiked && (
                  <motion.span
                    key={`like-ripple-${likePulseTick}`}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: "1px solid #ed4b75" }}
                    initial={{ opacity: 0.7, scale: 0.9 }}
                    animate={{ opacity: 0, scale: 1.45 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
              <svg width="24" height="23" fill="none" viewBox="0 0 23.9855 22.9855">
                <rect
                  height="22.178"
                  rx="11.089"
                  stroke={isLiked ? "#e46484" : "#7D7C7C"}
                  strokeWidth="0.808"
                  width="23.178"
                  x="0.404"
                  y="0.404"
                />
                <motion.path
                  d={heartPath}
                  fill={isLiked ? "#ed4b75" : "#B5B5B5"}
                  animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  style={{ transformOrigin: "50% 50%" }}
                />
              </svg>
            </motion.button>
            {/* More (three dots) button */}
            <div
              className="shrink-0 cursor-pointer"
              style={{ width: "24px", height: "24px" }}
              onClick={() => setShowEditSheet(true)}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect
                  height="23.192"
                  rx="11.596"
                  stroke="#919191"
                  strokeWidth="0.808"
                  width="23.192"
                  x="0.404"
                  y="0.404"
                />
                <path d={moreDotsPath} fill="#8F8F8F" />
              </svg>
            </div>
          </div>

          {/* ── "All Galleries" section ── */}
          <p
            className="font-['KMR_Waldenburg:Halbfett',sans-serif] px-[22px]"
            style={{
              fontSize: "15px",
              letterSpacing: "-0.45px",
              lineHeight: "normal",
              color: "#3f3f3f",
              marginTop: "20px",
            }}
          >
            All Galleries
          </p>

          {/* ── Add gallery card ── */}
          <div className="flex items-center gap-[16px] px-[18px] mt-[12px]">
            <div
              className="relative rounded-[14px] overflow-hidden shrink-0"
              style={{ width: "80px", height: "80px" }}
            >
              <img src={addGalleryCardImage} alt="" className="w-full h-full object-cover" />
              <div
                className="absolute right-[6px] bottom-[6px] w-[20px] h-[20px] rounded-full bg-[#1f1f1f] flex items-center justify-center"
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 21 21">
                  <path d={plusPath} fill="#E9E9E9" />
                </svg>
              </div>
            </div>
            <p
              className="font-['KMR_Waldenburg:Normal',sans-serif]"
              style={{
                fontSize: "15px",
                letterSpacing: "-1.05px",
                lineHeight: "normal",
                fontWeight: 500,
                color: "#646464",
              }}
            >
              Add nearby galleries
            </p>
          </div>

          {/* ── Gallery rows list ── */}
          <div className="px-[7px] pb-[30px]">
            {data.galleryRows?.map((galleryRow) => (
              <PopularGalleryRow key={galleryRow.id} row={galleryRow} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Edit Crawl Sheet ── */}
      <EditCrawlSheet
        isOpen={showEditSheet}
        onClose={() => setShowEditSheet(false)}
      />
    </div>
  );
}
