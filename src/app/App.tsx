/**
 * App — Root component.
 * Manages navigation between HomePage, SearchPage, UserProfilePage, and GalleryPage.
 * BottomNavbar drives switching between home/discover/user tabs.
 * Tapping a gallery card slides in the GalleryPage from the right.
 */
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GalleryContent } from "./components/gallery-content";
import { BottomNavbar } from "./components/bottom-navbar";
import { BottomSheet } from "./components/bottom-sheet";
import { PieceDetailContent } from "./components/piece-detail";
import { WriteReviewContent } from "./components/write-review-sheet";
import { ArtistsSheetContent } from "./components/artists-sheet";
import { GalleryProfilePage } from "./components/gallery-profile-page";
import { MyCrawlsSheetContent } from "./components/my-crawls-sheet";
import { LocationSheetContent } from "./components/location-sheet";
import { HomePage } from "./components/home-page";
import { SearchPage } from "./components/search-page";
import { UserProfilePage } from "./components/user-profile-page";
import { CrawlListPage, editorPickCrawlData } from "./components/crawl-list-page";
import { defaultGalleryData, defaultHomePageData } from "./components/gallery-data";
import { AnimatedFlowDemos } from "./components/animated-flow-demos";
import type { GalleryData } from "./components/gallery-data";

type TabId = "home" | "discover" | "user";

/* ══════════════════════════════════════════════
   GALLERY PAGE — self-contained wrapper with all overlay state.
   ══════════════════════════════════════════════ */

function GalleryPage({
  data,
  onBack,
  activeTab,
  onNavigate,
}: {
  data: GalleryData;
  onBack: () => void;
  activeTab: TabId;
  onNavigate: (id: string) => void;
}) {
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showArtists, setShowArtists] = useState(false);
  const [showGalleryProfile, setShowGalleryProfile] = useState(false);
  const [showMyCrawls, setShowMyCrawls] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [selectedSaveListId, setSelectedSaveListId] = useState<string | undefined>(undefined);
  const [isSavedToList, setIsSavedToList] = useState(false);

  const handlePieceClick = useCallback((index: number) => setSelectedPieceIndex(index), []);
  const handleCloseSheet = useCallback(() => setSelectedPieceIndex(null), []);
  const handlePrev = useCallback(() => {
    setSelectedPieceIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);
  const handleNext = useCallback(() => {
    setSelectedPieceIndex((prev) =>
      prev !== null && prev < data.pieces.length - 1 ? prev + 1 : prev,
    );
  }, [data.pieces.length]);

  const handleOpenWriteReview = useCallback(() => setShowWriteReview(true), []);
  const handleCloseWriteReview = useCallback(() => setShowWriteReview(false), []);
  const handleOpenArtists = useCallback(() => setShowArtists(true), []);
  const handleCloseArtists = useCallback(() => setShowArtists(false), []);
  const handleOpenGalleryProfile = useCallback(() => setShowGalleryProfile(true), []);
  const handleCloseGalleryProfile = useCallback(() => setShowGalleryProfile(false), []);
  const handleOpenMyCrawls = useCallback(() => {
    setSelectedSaveListId(undefined);
    setShowMyCrawls(true);
  }, []);
  const handleCloseMyCrawls = useCallback(() => setShowMyCrawls(false), []);
  const handleOpenLocation = useCallback(() => setShowLocation(true), []);
  const handleCloseLocation = useCallback(() => setShowLocation(false), []);
  const handleSelectSaveList = useCallback((crawlId: string) => {
    setSelectedSaveListId(crawlId);
  }, []);
  const handleApplySaveList = useCallback(() => {
    if (!selectedSaveListId) return;
    setShowMyCrawls(false);
    setIsSavedToList(true);
  }, [selectedSaveListId]);

  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      {/* Scrollable content */}
      <div className="absolute top-0 left-0 right-0 bottom-[44px] overflow-y-auto overflow-x-hidden no-scrollbar">
        <GalleryContent
          data={data}
          onPieceClick={handlePieceClick}
          onWriteReview={handleOpenWriteReview}
          onArtistsClick={handleOpenArtists}
          onGalleryBadgeClick={handleOpenGalleryProfile}
          onHeartClick={handleOpenMyCrawls}
          heartActive={isSavedToList}
          onLocationClick={handleOpenLocation}
          onBack={onBack}
        />
      </div>

      {/* Bottom navbar */}
      <div className="absolute bottom-0 left-0 right-0 h-[44px] z-50">
        <BottomNavbar activeId={activeTab} onNavigate={onNavigate} />
      </div>

      {/* ─── Bottom Sheets ─── */}
      <BottomSheet isOpen={selectedPieceIndex !== null} onClose={handleCloseSheet}>
        {selectedPieceIndex !== null && (
          <PieceDetailContent
            piece={data.pieces[selectedPieceIndex]}
            currentIndex={selectedPieceIndex}
            totalCount={data.pieces.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </BottomSheet>

      <BottomSheet isOpen={showWriteReview} onClose={handleCloseWriteReview}>
        <WriteReviewContent onClose={handleCloseWriteReview} />
      </BottomSheet>

      <BottomSheet isOpen={showArtists} onClose={handleCloseArtists}>
        <ArtistsSheetContent artists={data.artists} onClose={handleCloseArtists} />
      </BottomSheet>

      <BottomSheet isOpen={showMyCrawls} onClose={handleCloseMyCrawls}>
        <MyCrawlsSheetContent
          crawlRows={data.crawlRows}
          subtitle={data.crawlsSubtitle || "Choose where to save this gallery"}
          heading="Add to List"
          sectionLabel={data.crawlsSectionLabel || "Lists by city"}
          selectionMode={true}
          selectedCrawlId={selectedSaveListId}
          showApplyButton={true}
          isApplyEnabled={Boolean(selectedSaveListId)}
          onClose={handleCloseMyCrawls}
          onCrawlSelect={handleSelectSaveList}
          onApply={handleApplySaveList}
        />
      </BottomSheet>

      <BottomSheet isOpen={showLocation} onClose={handleCloseLocation}>
        <LocationSheetContent location={data.locationData} />
      </BottomSheet>

      <GalleryProfilePage
        isOpen={showGalleryProfile}
        onClose={handleCloseGalleryProfile}
        profileData={data.galleryProfile}
      />

    </div>
  );
}

/* ══════════════════════════════════════════════
   ROOT APP — iPhone frame + screen navigation
   ══════════════════════════════════════════════ */

function MainPrototypePhone() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [showGallery, setShowGallery] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [showEditorPickCrawl, setShowEditorPickCrawl] = useState(false);

  /* Preserve scroll positions for each tab */
  const scrollRefs = useRef<Record<TabId, number>>({ home: 0, discover: 0, user: 0 });

  const handleGallerySelect = useCallback((index: number) => {
    setSelectedGalleryIndex(index);
    setShowGallery(true);
  }, []);

  const handleBack = useCallback(() => {
    setShowGallery(false);
  }, []);

  const handleEditorPickSelect = useCallback(() => {
    setShowEditorPickCrawl(true);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    /* If on gallery detail and navigating to a tab, close gallery first */
    if (showGallery) {
      setShowGallery(false);
    }
    setShowEditorPickCrawl(false);
    setActiveTab(id as TabId);
  }, [showGallery]);

  /* Save scroll position when leaving a tab */
  const handleScroll = useCallback((tab: TabId) => (e: React.UIEvent<HTMLDivElement>) => {
    scrollRefs.current[tab] = e.currentTarget.scrollTop;
  }, []);

  /* Restore scroll position when returning to a tab */
  const restoreScroll = useCallback((tab: TabId) => (el: HTMLDivElement | null) => {
    if (el && scrollRefs.current[tab] > 0) {
      el.scrollTop = scrollRefs.current[tab];
    }
  }, []);

  return (
    <div
      className="relative bg-[#1a1a1a] rounded-[36px] p-[6px]"
      style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}
    >
      <div className="relative w-[320px] h-[568px] bg-white rounded-[30px] overflow-hidden">
        {/* ─── Tab Content (always rendered, visibility toggled) ─── */}

        {/* Home Tab */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{ display: activeTab === "home" && !showGallery ? "flex" : "none" }}
        >
          <div
            className="absolute top-0 left-0 right-0 bottom-[44px] overflow-y-auto overflow-x-hidden no-scrollbar"
            onScroll={handleScroll("home")}
            ref={restoreScroll("home")}
          >
            <HomePage
              data={defaultHomePageData}
              onGallerySelect={handleGallerySelect}
              onEditorPickSelect={handleEditorPickSelect}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[44px] z-50">
            <BottomNavbar activeId="home" onNavigate={handleNavigate} />
          </div>
        </div>

        {/* Discover Tab */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{ display: activeTab === "discover" && !showGallery ? "flex" : "none" }}
        >
          <div
            className="absolute top-0 left-0 right-0 bottom-[44px] overflow-y-auto overflow-x-hidden no-scrollbar z-0"
            onScroll={handleScroll("discover")}
            ref={restoreScroll("discover")}
          >
            <SearchPage onGallerySelect={handleGallerySelect} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[44px] z-50">
            <BottomNavbar activeId="discover" onNavigate={handleNavigate} />
          </div>
        </div>

        {/* User Tab */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{ display: activeTab === "user" && !showGallery ? "flex" : "none" }}
        >
          <div
            className="absolute top-0 left-0 right-0 bottom-[44px] overflow-y-auto overflow-x-hidden no-scrollbar"
            onScroll={handleScroll("user")}
            ref={restoreScroll("user")}
          >
            <UserProfilePage onGallerySelect={handleGallerySelect} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[44px] z-50">
            <BottomNavbar activeId="user" onNavigate={handleNavigate} />
          </div>
        </div>

        {/* ─── Gallery Page (slides in from right) ─── */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-0 z-[40]"
            >
              <GalleryPage
                data={defaultGalleryData}
                onBack={handleBack}
                activeTab={activeTab}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Editor Pick Crawl List Page (slides in from right) ─── */}
        <AnimatePresence>
          {showEditorPickCrawl && (
            <motion.div
              key="editor-pick-crawl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-0 z-[45]"
            >
              <CrawlListPage
                data={editorPickCrawlData}
                onBack={() => setShowEditorPickCrawl(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#e5e5e5] py-[24px]">
      <div className="flex flex-col items-center gap-[45vh] px-[16px]">
        <MainPrototypePhone />
        <AnimatedFlowDemos />
      </div>
    </div>
  );
}
