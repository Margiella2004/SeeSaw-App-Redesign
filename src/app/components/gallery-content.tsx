/**
 * GalleryContent — Main gallery page composition.
 * Fully data-driven: accepts a GalleryData object for all content.
 * Assembles section components into the full page layout with Info/Reviews tabs.
 * To create a new gallery page, just pass a different GalleryData object.
 */

import { useState } from "react";
import { IconPin, IconClock } from "./icons";
import {
  BackButton,
  ShareButton,
  HeartFab,
  CarouselDots,
  TabBar,
  GalleryBadge,
  IconLabel,
  Divider,
} from "./gallery-ui";

/* ── Section components ── */
import {
  PressReleaseSection,
  ArtistsInfoSection,
  GalleryDetailsSection,
  LocationSection,
  ContactSection,
  MediumTagsSection,
  PiecesInShowSection,
  SimilarShowsSection,
  ShownInCrawlsSection,
} from "./gallery-sections";

/* ── Reviews content ── */
import { ReviewContent } from "./review-content";

/* ── Data type ── */
import type { GalleryData } from "./gallery-data";

/* ══════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════ */

function HeroSection({
  images,
  activeIndex = 0,
  backLabel = "results",
  onBack,
  onShare,
}: {
  images: string[];
  activeIndex?: number;
  backLabel?: string;
  onBack?: () => void;
  onShare?: () => void;
}) {
  return (
    <div className="relative w-full h-[218px] overflow-hidden">
      <img src={images[activeIndex]} alt="" className="absolute inset-0 w-full h-full object-cover" />

      {/* Carousel dots */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2">
        <CarouselDots total={images.length} active={activeIndex} />
      </div>

      {/* Back button */}
      <BackButton
        label={backLabel}
        className="absolute"
        style={{ left: "16px", top: "14px" }}
        onClick={onBack}
      />

      {/* Share button */}
      <ShareButton
        className="absolute"
        style={{ top: "11px", right: "19px" }}
        onClick={onShare}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   GALLERY HEADER (name, date, badge, location/status)
   ══════════════════════════════════════════════ */

function GalleryHeader({
  name,
  dateRange,
  badgeName,
  location,
  status,
  onBadgeClick,
}: {
  name: string;
  dateRange: string;
  badgeName: string;
  location: string;
  status: string;
  onBadgeClick?: () => void;
}) {
  return (
    <div className="px-[14px] pt-[10px]">
      <h1 className="font-['KMR_Waldenburg:Halbfett',sans-serif] text-[#535353] text-[24px] tracking-[-1.2px]">
        {name}
      </h1>
      <p className="font-['KMR_Waldenburg:Buch',sans-serif] text-[#6e6e6e] text-[15px] tracking-[-0.45px] mt-[2px]">
        {dateRange}
      </p>

      {/* Badge row */}
      <GalleryBadge name={badgeName} className="mt-[12px]" onClick={onBadgeClick} />

      {/* Location + Status row */}
      <div className="flex items-center gap-[24px] mt-[12px]">
        <IconLabel icon={<IconPin size={10} color="#8C9096" />} text={location} />
        <IconLabel icon={<IconClock size={14} color="#8C9096" />} text={status} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   INFO TAB CONTENT — composed from section components
   ══════════════════════════════════════════════ */

function InfoContent({
  data,
  onPieceClick,
  onArtistsClick,
  onLocationClick,
}: {
  data: GalleryData;
  onPieceClick?: (index: number) => void;
  onArtistsClick?: () => void;
  onLocationClick?: () => void;
}) {
  return (
    <>
      <PressReleaseSection text={data.pressRelease} className="mt-[18px]" />

      <ArtistsInfoSection
        avatarSrcs={data.artistAvatarSrcs}
        nameText={data.artistNameText}
        onClick={onArtistsClick}
        className="mt-[18px]"
      />

      <GalleryDetailsSection
        rows={data.galleryDetails.rows}
        gallery={data.galleryDetails.gallery}
        className="mt-[16px]"
      />

      <LocationSection
        address={data.locationData.address}
        latitude={data.locationData.latitude}
        longitude={data.locationData.longitude}
        markerImage={data.heroImages[0]}
        onClick={onLocationClick}
        className="mt-[16px]"
      />

      <Divider className="mx-[24px] mt-[10px]" />

      <ContactSection
        phone={data.contact.phone}
        website={data.contact.website}
        className="mt-[12px]"
      />

      <Divider className="mx-[24px] mt-[10px]" />

      <MediumTagsSection tags={data.mediumTags} className="mt-[12px]" />

      <PiecesInShowSection
        pieces={data.pieces}
        onPieceClick={onPieceClick}
        className="mt-[18px]"
      />

      <SimilarShowsSection shows={data.similarShows} className="mt-[18px]" />

      <ShownInCrawlsSection cards={data.crawlCards} className="mt-[18px] pb-[20px]" />
    </>
  );
}

/* ══════════════════════════════════════════════
   GALLERY PAGE COMPOSITION — the main export
   ══════════════════════════════════════════════ */

export interface GalleryContentCallbacks {
  onPieceClick?: (index: number) => void;
  onWriteReview?: () => void;
  onArtistsClick?: () => void;
  onGalleryBadgeClick?: () => void;
  onHeartClick?: () => void;
  onLocationClick?: () => void;
  onBack?: () => void;
  onShare?: () => void;
  showHeartFab?: boolean;
  heartActive?: boolean;
  defaultTabIndex?: number;
}

export function GalleryContent({
  data,
  onPieceClick,
  onWriteReview,
  onArtistsClick,
  onGalleryBadgeClick,
  onHeartClick,
  onLocationClick,
  onBack,
  onShare,
  showHeartFab = true,
  heartActive = false,
  defaultTabIndex = 0,
}: { data: GalleryData } & GalleryContentCallbacks) {
  const [activeTab, setActiveTab] = useState(defaultTabIndex);

  return (
    <div className="bg-white w-full">
      {/* ─── Hero Image ─── */}
      <HeroSection
        images={data.heroImages}
        activeIndex={data.activeHeroIndex}
        backLabel={data.backLabel}
        onBack={onBack}
        onShare={onShare}
      />

      {/* ─── Heart FAB (overlapping hero bottom) ─── */}
      {showHeartFab && (
        <div className="relative">
          <HeartFab
            className="absolute -top-[28px] right-[16px] z-10"
            onClick={onHeartClick}
            active={heartActive}
          />
        </div>
      )}

      {/* ─── Gallery Header ─── */}
      <GalleryHeader
        name={data.name}
        dateRange={data.dateRange}
        badgeName={data.badgeName}
        location={data.location}
        status={data.status}
        onBadgeClick={onGalleryBadgeClick}
      />

      {/* ─── Info / Reviews Tabs ─── */}
      <TabBar
        tabs={["Info", "Reviews"]}
        activeIndex={activeTab}
        onTabChange={setActiveTab}
        className="mx-[14px] mt-[16px]"
      />

      {/* ─── Tab Content ─── */}
      {activeTab === 0 ? (
        <InfoContent
          data={data}
          onPieceClick={onPieceClick}
          onArtistsClick={onArtistsClick}
          onLocationClick={onLocationClick}
        />
      ) : (
        <ReviewContent
          reviews={data.reviews}
          onWriteReview={onWriteReview}
        />
      )}
    </div>
  );
}
