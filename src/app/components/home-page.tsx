/**
 * HomePage — Main home/discovery page matching the Figma "Home" frame.
 * Layout: header ("Welcome back / Home / NYC"), then vertical sections:
 * "For you", "Recently Viewed", "Friends Also Like", "Editors Picks", "Most Popular".
 * All data-driven via HomePageData. Reuses ScrollSection, SmallGalleryCard, etc.
 */
import svgPaths from "../../imports/svg-63hltl4ch0";
import { ScrollSection } from "./gallery-ui";
import { SmallGalleryCard } from "./cards/small-gallery-card";
import type { SmallGalleryCardProps } from "./cards/small-gallery-card";
import { HomeGalleryCard } from "./cards/home-gallery-card";
import type { HomeGalleryCardData } from "./cards/home-gallery-card";
import { EditorPickCard } from "./cards/editor-pick-card";
import type { EditorPickCardData } from "./cards/editor-pick-card";
import { PopularGalleryRow } from "./cards/popular-gallery-row";
import type { PopularGalleryRowData } from "./cards/popular-gallery-row";

/* ── Location badge (top right) ── */
function LocationBadge({ city = "NYC" }: { city?: string }) {
  return (
    <div className="flex flex-col items-center gap-[2px]">
      <div
        className="bg-[#d9d9d9] rounded-full flex items-center justify-center"
        style={{ width: "31px", height: "31px" }}
      >
        <svg width="11.876" height="16.966" fill="none" viewBox="0 0 11.8759 16.9656">
          <path d={svgPaths.p2219430} fill="black" />
        </svg>
      </div>
      <span
        className="font-['KMR_Waldenburg:Buch',sans-serif]"
        style={{
          fontSize: "10px",
          letterSpacing: "-0.3px",
          lineHeight: "normal",
          color: "#585a5e",
        }}
      >
        {city}
      </span>
    </div>
  );
}

/* ── Down arrow icon ── */
function DownArrow() {
  return (
    <svg width="17" height="15.543" fill="none" viewBox="0 0 17 15.5429">
      <path d={svgPaths.p11c2c680} fill="#4E4E4E" />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   HOME PAGE DATA
   ══════════════════════════════════════════════ */

export interface HomePageData {
  greeting: string;               // "Welcome back, Jonathan!"
  title: string;                  // "Home"
  city: string;                   // "NYC"
  forYou: HomeGalleryCardData[];
  recentlyViewed: SmallGalleryCardProps[];
  friendsAlsoLike: HomeGalleryCardData[];
  editorsPicks: EditorPickCardData[];
  mostPopular: PopularGalleryRowData[];
}

/* ══════════════════════════════════════════════
   HOME PAGE COMPONENT
   ══════════════════════════════════════════════ */

export function HomePage({
  data,
  onGallerySelect,
  onEditorPickSelect,
}: {
  data: HomePageData;
  onGallerySelect?: (index: number) => void;
  onEditorPickSelect?: () => void;
}) {
  return (
    <div className="bg-white w-full min-h-full">
      {/* ── Header ── */}
      <div className="flex items-start justify-between px-[16px] pt-[14px]">
        <div>
          <p
            className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
            style={{
              fontSize: "10px",
              letterSpacing: "-0.3px",
              lineHeight: "normal",
              color: "#343333",
            }}
          >
            {data.greeting}
          </p>
          <div className="flex items-center gap-[6px]">
            <p
              className="font-['KMR_Waldenburg:Normal',sans-serif]"
              style={{
                fontSize: "35px",
                letterSpacing: "-1.75px",
                lineHeight: "56.249px",
                color: "#494949",
                fontWeight: 500,
              }}
            >
              {data.title}
            </p>
            <DownArrow />
          </div>
        </div>
        <div style={{ marginTop: "4px" }}>
          <LocationBadge city={data.city} />
        </div>
      </div>

      {/* ── For you ── */}
      <ScrollSection title="For you" titleFont="bold" gap={23} paddingLeft={17} className="mt-[4px]" seeAll>
        {data.forYou.map((card, i) => (
          <HomeGalleryCard key={card.id} card={card} onClick={() => onGallerySelect?.(i)} />
        ))}
      </ScrollSection>

      {/* ── Recently Viewed ── */}
      <ScrollSection title="Recently Viewed" titleFont="bold" gap={10} paddingLeft={16} className="mt-[18px]" seeAll>
        {data.recentlyViewed.map((card, i) => (
          <SmallGalleryCard key={i} {...card} onClick={() => onGallerySelect?.(i)} />
        ))}
      </ScrollSection>

      {/* ── Friends Also Like ── */}
      <ScrollSection title="Friends Also Like" titleFont="bold" gap={17} paddingLeft={17} className="mt-[18px]" seeAll>
        {data.friendsAlsoLike.map((card, i) => (
          <HomeGalleryCard key={card.id} card={card} onClick={() => onGallerySelect?.(i)} />
        ))}
      </ScrollSection>

      {/* ── Editors Picks ── */}
      <ScrollSection title="Editors Picks" titleFont="bold" gap={14} paddingLeft={20} className="mt-[18px]" seeAll>
        {data.editorsPicks.map((card) => (
          <EditorPickCard key={card.id} card={card} onClick={onEditorPickSelect} />
        ))}
      </ScrollSection>

      {/* ── Most Popular ── */}
      <div className="mt-[18px] pb-[24px]">
        <div className="flex items-center justify-between px-[20px]">
          <p
            className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
            style={{
              fontSize: "15px",
              letterSpacing: "-0.45px",
              lineHeight: "normal",
              color: "#3f3f3f",
              fontWeight: 500,
            }}
          >
            Most Popular
          </p>
          <span
            className="font-['KMR_Waldenburg:Buch',sans-serif] text-[#8c9096] underline cursor-pointer"
            style={{ fontSize: "10px", letterSpacing: "-0.3px", lineHeight: "normal" }}
          >
            See All
          </span>
        </div>
        <div className="flex flex-col gap-[19px] mt-[14px] px-[7px]">
          {data.mostPopular.map((row, i) => (
            <PopularGalleryRow key={row.id} row={row} onClick={() => onGallerySelect?.(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
