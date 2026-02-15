/**
 * CrawlsPage — Full "400+ Crawls" page.
 * Mirrors the HomePage structure exactly, reusing the same components:
 *  - ScrollSection (horizontal scroll wrapper)
 *  - HomeGalleryCard (For You, Friends Also Like)
 *  - EditorPickCard (Editor's Picks)
 *  - PopularGalleryRow (Most Popular)
 * Just with crawl-specific images and data.
 */
import { ScrollSection } from "./gallery-ui";
import { HomeGalleryCard } from "./cards/home-gallery-card";
import type { HomeGalleryCardData } from "./cards/home-gallery-card";
import { EditorPickCard } from "./cards/editor-pick-card";
import type { EditorPickCardData } from "./cards/editor-pick-card";
import { PopularGalleryRow } from "./cards/popular-gallery-row";
import type { PopularGalleryRowData } from "./cards/popular-gallery-row";
import svgPaths from "../../imports/svg-bragbjw2ty";
import { galleryImages } from "./curated-images";

const [g1, g2, g3, g4, g5, g6, g7, g8, g9] = galleryImages;

/* ── SVG paths ── */
const locationPinPath = svgPaths.p2219430;
const crawlArrowPath = svgPaths.p11c2c680;

/* ══════════════════════════════════════════════
   CRAWL DATA — same types as home page, different images
   ══════════════════════════════════════════════ */

const forYouCards: HomeGalleryCardData[] = [
  { id: "cfy1", heroImage: g1, thumbnails: [g1], name: "Chelsea in 90 Minutes", tag: "Crawl", rating: "4.4", status: "Open", hours: "10am-6pm" },
  { id: "cfy2", heroImage: g2, thumbnails: [g2], name: "Lower East Side Loop", tag: "Crawl", rating: "4.1", status: "Open", hours: "11am-7pm" },
];

const friendsCards: HomeGalleryCardData[] = [
  { id: "cfl1", heroImage: g3, thumbnails: [g3], name: "Bushwick Photo Day", tag: "Crawl", rating: "4.0", status: "Open", hours: "12pm-8pm" },
  { id: "cfl2", heroImage: g4, thumbnails: [g4], name: "Tribeca Saturday", tag: "Crawl", rating: "4.2", status: "Open", hours: "10am-6pm" },
];

const editorPickCards: EditorPickCardData[] = [
  { id: "cep1", backgroundSrc: g8, title: "Julie's top picks for\nChelsea", label: "Editor's Picks" },
  { id: "cep2", backgroundSrc: g9, title: "Julie's top picks for\nDowntown", label: "Editor's Picks" },
];

const popularRows: PopularGalleryRowData[] = [
  { id: "cp1", thumbnailSrc: g5, name: "My Brooklyn Crawl", hours: "12 galleries", status: "NYC", statusColor: "#908a8a", galleryLink: "Friends route", rating: "4.2" },
  { id: "cp2", thumbnailSrc: g6, name: "After Work West Side", hours: "8 galleries", status: "NYC", statusColor: "#908a8a", galleryLink: "Saved list", rating: "4.0" },
  { id: "cp3", thumbnailSrc: g7, name: "Uptown Weekend", hours: "10 galleries", status: "NYC", statusColor: "#908a8a", galleryLink: "Community", rating: "3.9" },
];

/* ══════════════════════════════════════════════
   CRAWLS PAGE — mirrors HomePage layout exactly
   ══════════════════════════════════════════════ */
export function CrawlsPage({ onClose, onCrawlSelect, onEditorPickSelect }: { onClose: () => void; onCrawlSelect?: () => void; onEditorPickSelect?: () => void }) {
  return (
    <div className="bg-white w-full min-h-full pb-[24px]">
      {/* ── Header — same pattern as HomePage ── */}
      <div className="flex items-start justify-between px-[16px] pt-[8px]">
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
            Welcome back, Jonathan!
          </p>
          <div className="flex items-center gap-[6px]">
            <p
              className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
              style={{
                fontSize: "35px",
                letterSpacing: "-1.75px",
                lineHeight: "56.249px",
                color: "#494949",
                fontWeight: 600,
              }}
            >
              Crawls
            </p>
            <svg width="17" height="15.543" fill="none" viewBox="0 0 17 15.5429">
              <path d={crawlArrowPath} fill="#4E4E4E" />
            </svg>
          </div>
        </div>
        {/* Location badge — same as HomePage LocationBadge */}
        <div className="flex flex-col items-center gap-[2px]" style={{ marginTop: "4px" }}>
          <div
            className="bg-[#d9d9d9] rounded-full flex items-center justify-center cursor-pointer"
            style={{ width: "31px", height: "31px" }}
            onClick={onClose}
          >
            <svg width="11.876" height="16.966" fill="none" viewBox="0 0 11.8759 16.9656">
              <path d={locationPinPath} fill="black" />
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
            NYC
          </span>
        </div>
      </div>

      {/* ── Featured — just the first HomeGalleryCard full-width ── */}
      <ScrollSection title="Featured" titleFont="bold" gap={23} paddingLeft={17} className="mt-[4px]" seeAll>
        <HomeGalleryCard card={forYouCards[0]} onClick={onCrawlSelect} />
      </ScrollSection>

      {/* ── For you ── */}
      <ScrollSection title="For you" titleFont="bold" gap={23} paddingLeft={17} className="mt-[18px]" seeAll>
        {forYouCards.map((card) => (
          <HomeGalleryCard key={card.id} card={card} onClick={onCrawlSelect} />
        ))}
      </ScrollSection>

      {/* ── Friends Also Like ── */}
      <ScrollSection title="Friends Also Like" titleFont="bold" gap={17} paddingLeft={17} className="mt-[18px]" seeAll>
        {friendsCards.map((card) => (
          <HomeGalleryCard key={card.id} card={card} onClick={onCrawlSelect} />
        ))}
      </ScrollSection>

      {/* ── Editors Picks ── */}
      <ScrollSection title="Editors Picks" titleFont="bold" gap={14} paddingLeft={20} className="mt-[18px]" seeAll>
        {editorPickCards.map((card) => (
          <EditorPickCard key={card.id} card={card} onClick={onEditorPickSelect} />
        ))}
      </ScrollSection>

      {/* ── Most Popular — same list layout as HomePage ── */}
      <div className="mt-[18px]">
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
          {popularRows.map((row) => (
            <PopularGalleryRow key={row.id} row={row} onClick={onCrawlSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}
