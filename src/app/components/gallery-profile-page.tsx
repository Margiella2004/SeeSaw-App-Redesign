/**
 * GalleryProfilePage — Full-page gallery profile, slides in from the right.
 * Fully data-driven: accepts GalleryProfileData for all content.
 * Reuses existing card/UI components from the shared component system.
 */
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-uumwxnuyyz";
import { BottomNavbar } from "./bottom-navbar";
import { CarouselDots, ScrollSection } from "./gallery-ui";
import { SmallGalleryCard } from "./cards/small-gallery-card";
import type { GalleryProfileData } from "./gallery-data";

/* ── Inline SVG icon helpers (from Figma import svg-uumwxnuyyz) ── */

function BackChevron() {
  return (
    <svg width="10.37" height="17.78" fill="none" viewBox="0 0 10.3704 17.7778">
      <path d={svgPaths.p1fb83480} fill="black" />
    </svg>
  );
}

function CogIcon() {
  return (
    <svg width="21.66" height="21.66" fill="none" viewBox="0 0 21.6585 21.6585">
      <path d={svgPaths.p1c36a80} fill="black" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14.54" height="19.99" fill="none" viewBox="0 0 14.5377 19.9893">
      <path d={svgPaths.p37ff7e80} fill="black" />
    </svg>
  );
}

function PlusIcon({ size = 10, color = "#A6A6A6" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 10 10">
      <path d={svgPaths.p24f6c80} fill={color} />
    </svg>
  );
}

function PlusIconLarge() {
  return (
    <svg width="21" height="21" fill="none" viewBox="0 0 21 21">
      <rect fill="#C3C3C3" height="21" rx="10.5" width="21" />
      <path d={svgPaths.pe363e80} fill="#E9E9E9" />
    </svg>
  );
}

/* ── Hero carousel ── */
function HeroCarousel({ images, activeIndex = 0 }: { images: string[]; activeIndex?: number }) {
  return (
    <div className="relative w-full h-[165px] overflow-hidden">
      <div className="flex h-full">
        {images.map((src, i) => (
          <div key={i} className="relative shrink-0 w-full h-full">
            <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2">
        <CarouselDots total={images.length} active={activeIndex} />
      </div>
    </div>
  );
}

/* ── Avatar circle with + overlay ── */
function AvatarCircle({ avatarSrc }: { avatarSrc?: string }) {
  return (
    <div className="relative" style={{ width: "89px", height: "88.5px" }}>
      <div className="w-full h-full rounded-full bg-[#ededed] overflow-hidden">
        {avatarSrc && (
          <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
        )}
      </div>
      {!avatarSrc && (
        <div className="absolute" style={{ left: "34px", top: "34px" }}>
          <PlusIconLarge />
        </div>
      )}
    </div>
  );
}

/* ── Dark pill button (Followers / Artists) ── */
function ActionPill({ label }: { label: string }) {
  return (
    <div
      className="bg-[#2d2d2d] rounded-[10px] flex flex-col items-center gap-[3px] overflow-hidden relative"
      style={{ paddingTop: "9px", paddingBottom: "12px", paddingLeft: "13px", paddingRight: "13px", minWidth: "87px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-[10px]"
        style={{ border: "1px solid #7f7f7f" }}
      />
      <PlusIcon />
      <span
        className="font-['KMR_Waldenburg:Normal',sans-serif] text-[#a8a8a8]"
        style={{ fontSize: "11.834px", letterSpacing: "-0.355px", lineHeight: "normal" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN GALLERY PROFILE PAGE
   ══════════════════════════════════════════════ */

export function GalleryProfilePage({
  isOpen,
  onClose,
  profileData,
}: {
  isOpen: boolean;
  onClose: () => void;
  profileData?: GalleryProfileData;
}) {
  if (!profileData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="absolute inset-0 z-[80] bg-white flex flex-col"
        >
          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar" style={{ paddingBottom: "44px" }}>

            {/* ── Hero ── */}
            <HeroCarousel images={profileData.heroImages} activeIndex={profileData.activeHeroIndex} />

            {/* ── Top bar overlaid on hero ── */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-[14px] pt-[12px]">
              {/* Cancel button */}
              <div
                className="bg-[#d9d9d9] rounded-full flex items-center gap-[6px] px-[13px] py-[9px] cursor-pointer"
                onClick={onClose}
              >
                <BackChevron />
                <span
                  className="font-['KMR_Waldenburg:Buch',sans-serif] text-black"
                  style={{ fontSize: "15px", letterSpacing: "-0.45px", lineHeight: "normal" }}
                >
                  Cancel
                </span>
              </div>
              {/* Settings + Share */}
              <div className="flex items-center gap-[8px]">
                <div className="bg-[#d9d9d9] rounded-full flex items-center justify-center overflow-hidden" style={{ padding: "7px" }}>
                  <CogIcon />
                </div>
                <div className="bg-[#d9d9d9] rounded-full flex items-center justify-center overflow-hidden" style={{ padding: "8.5px 9px 1.3px 9px" }}>
                  <ShareIcon />
                </div>
              </div>
            </div>

            {/* ── Avatar overlapping hero ── */}
            <div style={{ marginTop: "-44px", marginLeft: "16px" }}>
              <AvatarCircle />
            </div>

            {/* ── Gallery Page title ── */}
            <p
              className="font-['KMR_Waldenburg:Halbfett',sans-serif] text-[#535353] px-[18px]"
              style={{ fontSize: "21px", letterSpacing: "-1.05px", lineHeight: "normal", marginTop: "8px" }}
            >
              {profileData.title}
            </p>

            {/* ── Action pills ── */}
            <div className="flex gap-[10px] px-[18px] mt-[14px]">
              {profileData.actionPills.map((label) => (
                <ActionPill key={label} label={label} />
              ))}
            </div>

            {/* ── Current Shows ── */}
            <ScrollSection title="Current Shows" titleFont="medium" gap={10} paddingLeft={16} className="mt-[20px]" seeAll>
              {profileData.currentShows.map((show, i) => (
                <SmallGalleryCard key={i} {...show} />
              ))}
            </ScrollSection>

            {/* ── Past Shows ── */}
            <ScrollSection title="Past Shows" titleFont="medium" gap={10} paddingLeft={16} className="mt-[20px]" seeAll>
              {profileData.pastShows.map((show, i) => (
                <SmallGalleryCard key={i} {...show} />
              ))}
            </ScrollSection>

            {/* ── Artists Associated ── */}
            <ScrollSection title="Artists Associated" titleFont="medium" gap={10} paddingLeft={16} className="mt-[20px] pb-[20px]" seeAll>
              <div />
            </ScrollSection>
          </div>

          {/* ── Bottom navbar ── */}
          <div className="absolute bottom-0 left-0 right-0 h-[44px] z-50">
            <BottomNavbar activeId="home" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
