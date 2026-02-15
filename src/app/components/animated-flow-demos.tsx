import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BottomNavbar } from "./bottom-navbar";
import { BottomSheet } from "./bottom-sheet";
import { FollowListSheet } from "./follow-list-sheet";
import { GalleryContent } from "./gallery-content";
import { HomePage } from "./home-page";
import { MapOverlay } from "./map-overlay";
import { MyCrawlsSheetContent } from "./my-crawls-sheet";
import { SearchPage } from "./search-page";
import type { ActiveFilter } from "./search-filter-panels";
import { UserProfilePage, defaultUserProfileData } from "./user-profile-page";
import { defaultGalleryData, defaultHomePageData } from "./gallery-data";
import { HeartFab } from "./gallery-ui";
import type { SmallGalleryCardProps } from "./cards/small-gallery-card";

type FlowTab = "home" | "discover" | "user";

interface TapPoint {
  x: number;
  y: number;
}

interface FlowStep {
  id: string;
  label: string;
  view: ReactNode;
  tap?: TapPoint;
  transitionFromPrev?: "none" | "push" | "sheet" | "modal";
}

const NOOP = () => {};

const demoHomePageData = {
  ...defaultHomePageData,
  forYou: defaultHomePageData.forYou.slice(0, 1),
  recentlyViewed: defaultHomePageData.recentlyViewed.slice(0, 1),
  friendsAlsoLike: defaultHomePageData.friendsAlsoLike.slice(0, 1),
  editorsPicks: defaultHomePageData.editorsPicks.slice(0, 1),
  mostPopular: defaultHomePageData.mostPopular.slice(0, 2),
};

const demoUserProfileData = {
  ...defaultUserProfileData,
  crawlCards: defaultUserProfileData.crawlCards.slice(0, 1),
};

const demoMapResultCards: SmallGalleryCardProps[] = [
  {
    name: defaultHomePageData.recentlyViewed[0].name,
    thumbnails: defaultHomePageData.recentlyViewed[0].thumbnails,
    rating: defaultHomePageData.recentlyViewed[0].rating,
    status: defaultHomePageData.recentlyViewed[0].status,
    statusColor: defaultHomePageData.recentlyViewed[0].statusColor,
    tag: defaultHomePageData.recentlyViewed[0].tag,
  },
  {
    name: defaultHomePageData.recentlyViewed[1].name,
    thumbnails: defaultHomePageData.recentlyViewed[1].thumbnails,
    rating: defaultHomePageData.recentlyViewed[1].rating,
    status: defaultHomePageData.recentlyViewed[1].status,
    statusColor: defaultHomePageData.recentlyViewed[1].statusColor,
    tag: defaultHomePageData.recentlyViewed[1].tag,
  },
  {
    name: defaultHomePageData.forYou[0].name,
    thumbnails: [defaultHomePageData.forYou[0].thumbnails[0]],
    rating: defaultHomePageData.forYou[0].rating,
    status: defaultHomePageData.forYou[0].status,
    statusColor: defaultHomePageData.forYou[0].status === "Closed" ? "#ed2115" : "#4caf50",
    tag: defaultHomePageData.forYou[0].tag,
  },
];

function IPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative bg-[#1a1a1a] rounded-[36px] p-[6px]"
      style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.22)" }}
    >
      <div className="relative w-[320px] h-[568px] bg-white rounded-[30px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function TabScreen({
  activeTab,
  children,
  hideHorizontalPeek = false,
}: {
  activeTab: FlowTab;
  children: ReactNode;
  hideHorizontalPeek?: boolean;
}) {
  return (
    <div className={`absolute inset-0 flex flex-col bg-white ${hideHorizontalPeek ? "flow-demo-screen" : ""}`}>
      {hideHorizontalPeek && (
        <style>{`.flow-demo-screen .no-scrollbar { overflow-x: hidden !important; }`}</style>
      )}
      <div className="absolute top-0 left-0 right-0 bottom-[44px] overflow-hidden">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[44px] z-50">
        <BottomNavbar activeId={activeTab} />
      </div>
    </div>
  );
}

function HomeFlowScreen() {
  return (
    <TabScreen activeTab="home" hideHorizontalPeek>
      <HomePage data={demoHomePageData} />
    </TabScreen>
  );
}

function UserFlowScreen({ profileName }: { profileName?: string }) {
  const data = profileName
    ? { ...demoUserProfileData, name: profileName }
    : demoUserProfileData;

  return (
    <TabScreen activeTab="user" hideHorizontalPeek>
      <UserProfilePage data={data} />
    </TabScreen>
  );
}

function FollowersFlowScreen() {
  return (
    <div className="absolute inset-0 bg-white">
      <FollowListSheet variant="friends" onClose={NOOP} />
    </div>
  );
}

function GalleryBrowseScreen({
  scrollTop = 0,
  defaultTabIndex = 0,
}: {
  scrollTop?: number;
  defaultTabIndex?: 0 | 1;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollTop;
  }, [scrollTop]);

  return (
    <div className="absolute inset-0 bg-white">
      <div
        ref={scrollRef}
        className="absolute top-0 left-0 right-0 bottom-[44px] overflow-y-auto overflow-x-hidden no-scrollbar"
      >
        <GalleryContent data={defaultGalleryData} defaultTabIndex={defaultTabIndex} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[44px] z-50">
        <BottomNavbar activeId="home" />
      </div>
    </div>
  );
}

function DiscoverSearchScreen() {
  return (
    <TabScreen activeTab="discover" hideHorizontalPeek>
      <SearchPage />
    </TabScreen>
  );
}

function DiscoverSearchResultsScreen() {
  return (
    <TabScreen activeTab="discover" hideHorizontalPeek>
      <SearchPage initialView="results" initialSearchQuery="chelsea" />
    </TabScreen>
  );
}

function DiscoverSearchResultsFilteredScreen({
  activeFilter,
  galleryScope = "all",
}: {
  activeFilter?: ActiveFilter;
  galleryScope?: "all" | "saved";
}) {
  return (
    <TabScreen activeTab="discover" hideHorizontalPeek>
      <SearchPage
        initialView="results"
        initialSearchQuery="chelsea"
        initialResultsActiveFilter={activeFilter ?? null}
        initialResultsGalleryScope={galleryScope}
      />
    </TabScreen>
  );
}

function DiscoverMapScreen({
  resultCards,
  initialSelectedMarkerIdx = null,
  showSelectedMarkerPulse = false,
}: {
  resultCards?: SmallGalleryCardProps[];
  initialSelectedMarkerIdx?: number | null;
  showSelectedMarkerPulse?: boolean;
}) {
  return (
    <TabScreen activeTab="discover">
      <div className="relative w-full h-full">
        <MapOverlay
          onClose={NOOP}
          resultCards={resultCards}
          initialSelectedMarkerIdx={initialSelectedMarkerIdx}
          showSelectedMarkerPulse={showSelectedMarkerPulse}
        />
      </div>
    </TabScreen>
  );
}

function Flow3SaveSequenceScreen() {
  const selectedId = defaultGalleryData.crawlRows?.[0]?.id;
  const [selected, setSelected] = useState(false);
  const [applyPressed, setApplyPressed] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [liked, setLiked] = useState(false);
  const [tapTarget, setTapTarget] = useState<"gallery" | "apply" | null>(null);

  useEffect(() => {
    let timers: number[] = [];

    const runSequence = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];

      setSelected(false);
      setApplyPressed(false);
      setIsSheetOpen(true);
      setLiked(false);
      setTapTarget(null);

      timers.push(window.setTimeout(() => setTapTarget("gallery"), 360));
      timers.push(window.setTimeout(() => {
        setSelected(true);
        setTapTarget(null);
      }, 560));
      timers.push(window.setTimeout(() => setTapTarget("apply"), 980));
      timers.push(window.setTimeout(() => setApplyPressed(true), 1140));
      timers.push(window.setTimeout(() => setTapTarget(null), 1220));
      timers.push(window.setTimeout(() => setIsSheetOpen(false), 1400));
      timers.push(window.setTimeout(() => setLiked(true), 1700));
    };

    runSequence();
    const loop = window.setInterval(runSequence, 3400);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearInterval(loop);
    };
  }, []);

  const tapPoint =
    tapTarget === "gallery"
      ? { x: 132, y: 338 }
      : tapTarget === "apply"
        ? { x: 156, y: 522 }
        : null;

  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute top-0 left-0 right-0 bottom-[44px] overflow-hidden">
        <GalleryContent data={defaultGalleryData} showHeartFab={false} />
        <div className="absolute right-[16px] top-[190px] z-[55] pointer-events-none">
          <motion.div
            animate={liked ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
          >
            <HeartFab active={liked} />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[44px] z-50">
        <BottomNavbar activeId="home" />
      </div>

      <BottomSheet isOpen={isSheetOpen} onClose={NOOP}>
        <MyCrawlsSheetContent
          crawlRows={defaultGalleryData.crawlRows}
          subtitle="Choose where to save this gallery"
          heading="Add to List"
          sectionLabel="Lists by city"
          selectionMode={true}
          selectedCrawlId={selected ? selectedId : undefined}
          showApplyButton={true}
          isApplyEnabled={selected}
          applyPressed={applyPressed}
          onClose={NOOP}
          onCrawlSelect={NOOP}
          onApply={NOOP}
        />
      </BottomSheet>

      <AnimatePresence>
        {tapPoint && (
          <motion.div
            key={`flow3-seq-tap-${tapTarget}`}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            className="absolute z-[95] pointer-events-none"
            style={{ left: tapPoint.x, top: tapPoint.y }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              className="w-[16px] h-[16px] rounded-full bg-[#f05a28]"
              style={{ boxShadow: "0 0 0 8px rgba(240,90,40,0.24)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FlowCard({
  steps,
  intervalMs = 2600,
}: {
  steps: FlowStep[];
  intervalMs?: number;
}) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, steps.length]);

  const step = steps[stepIndex];

  const getAnimation = (mode: FlowStep["transitionFromPrev"]) => {
    switch (mode) {
      case "push":
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: 0 },
          transition: { type: "spring" as const, damping: 30, stiffness: 300 },
        };
      case "sheet":
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
          transition: { type: "spring" as const, damping: 30, stiffness: 350 },
        };
      case "modal":
        return {
          initial: { scale: 0.92 },
          animate: { scale: 1 },
          exit: { scale: 0.92 },
          transition: { type: "spring" as const, damping: 28, stiffness: 320 },
        };
      default:
        return {
          initial: { x: 0 },
          animate: { x: 0 },
          exit: { x: 0 },
          transition: { duration: 0.01 },
        };
    }
  };

  const animation = getAnimation(step.transitionFromPrev);

  return (
    <div className="w-full flex justify-center">
      <IPhoneFrame>
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={animation.transition}
            className="absolute inset-0"
          >
            {step.view}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {step.tap && (
            <motion.div
              key={`${step.id}-tap`}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.82 }}
              className="absolute z-[90] pointer-events-none"
              style={{ left: step.tap.x, top: step.tap.y }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                className="w-[16px] h-[16px] rounded-full bg-[#f05a28]"
                style={{ boxShadow: "0 0 0 8px rgba(240,90,40,0.24)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </IPhoneFrame>
    </div>
  );
}

export function AnimatedFlowDemos() {
  const flowOneSteps = useMemo<FlowStep[]>(
    () => [
      {
        id: "flow1-home",
        label: "Open app on Home.",
        tap: { x: 266, y: 536 },
        view: <HomeFlowScreen />,
        transitionFromPrev: "none",
      },
      {
        id: "flow1-profile",
        label: "Tap profile tab.",
        tap: { x: 58, y: 172 },
        view: <UserFlowScreen />,
        transitionFromPrev: "none",
      },
      {
        id: "flow1-followers",
        label: "Open Followers.",
        tap: { x: 232, y: 182 },
        view: <FollowersFlowScreen />,
        transitionFromPrev: "none",
      },
      {
        id: "flow1-friend-profile",
        label: "Open a friend profile (success).",
        view: <UserFlowScreen profileName="Sarah Chen" />,
        transitionFromPrev: "push",
      },
    ],
    [],
  );

  const flowTwoSteps = useMemo<FlowStep[]>(
    () => [
      {
        id: "flow2-home",
        label: "Start from Home.",
        tap: { x: 86, y: 196 },
        view: <HomeFlowScreen />,
        transitionFromPrev: "none",
      },
      {
        id: "flow2-open-gallery",
        label: "Tap a gallery card.",
        view: <GalleryBrowseScreen scrollTop={0} />,
        transitionFromPrev: "push",
      },
      {
        id: "flow2-info-top",
        label: "Gallery Info: top content.",
        view: <GalleryBrowseScreen scrollTop={0} />,
        transitionFromPrev: "none",
      },
      {
        id: "flow2-info-mid-a",
        label: "Gallery Info: scroll section 1.",
        tap: { x: 156, y: 392 },
        view: <GalleryBrowseScreen scrollTop={420} />,
        transitionFromPrev: "none",
      },
      {
        id: "flow2-info-mid-b",
        label: "Gallery Info: scroll section 2.",
        tap: { x: 156, y: 392 },
        view: <GalleryBrowseScreen scrollTop={860} />,
        transitionFromPrev: "none",
      },
      {
        id: "flow2-info-bottom",
        label: "Gallery Info: bottom content.",
        tap: { x: 160, y: 380 },
        view: <GalleryBrowseScreen scrollTop={1320} />,
        transitionFromPrev: "none",
      },
      {
        id: "flow2-reviews-open",
        label: "Open Reviews.",
        tap: { x: 198, y: 296 },
        view: <GalleryBrowseScreen defaultTabIndex={1} scrollTop={0} />,
        transitionFromPrev: "none",
      },
      {
        id: "flow2-reviews-mid",
        label: "Reviews: scroll section 1.",
        tap: { x: 158, y: 392 },
        view: <GalleryBrowseScreen defaultTabIndex={1} scrollTop={360} />,
        transitionFromPrev: "none",
      },
      {
        id: "flow2-reviews-bottom",
        label: "Reviews: bottom content.",
        tap: { x: 158, y: 392 },
        view: <GalleryBrowseScreen defaultTabIndex={1} scrollTop={760} />,
        transitionFromPrev: "none",
      },
    ],
    [],
  );

  const flowThreeSteps = useMemo<FlowStep[]>(
    () => [
      {
        id: "flow3-sequence",
        label: "Select a list, tap Apply, and confirm save.",
        view: <Flow3SaveSequenceScreen />,
        transitionFromPrev: "none",
      },
    ],
    [],
  );

  const flowFourSteps = useMemo<FlowStep[]>(
    () => [
      {
        id: "flow4-discover",
        label: "Open Discover map tools.",
        tap: { x: 248, y: 490 },
        view: <DiscoverSearchScreen />,
        transitionFromPrev: "none",
      },
      {
        id: "flow4-open-map",
        label: "Map opens with gallery pins.",
        view: <DiscoverMapScreen />,
        transitionFromPrev: "push",
      },
      {
        id: "flow4-pin-selected",
        label: "Tap pin shows matching gallery card.",
        view: <DiscoverMapScreen initialSelectedMarkerIdx={3} showSelectedMarkerPulse={true} />,
        transitionFromPrev: "none",
      },
    ],
    [],
  );

  const flowFiveSteps = useMemo<FlowStep[]>(
    () => [
      {
        id: "flow5-search-main",
        label: "Search screen with options below the bar.",
        tap: { x: 118, y: 30 },
        view: <DiscoverSearchScreen />,
        transitionFromPrev: "none",
      },
      {
        id: "flow5-search-results",
        label: "Type a search and view results.",
        tap: { x: 154, y: 33 },
        view: <DiscoverSearchResultsScreen />,
        transitionFromPrev: "none",
      },
      {
        id: "flow5-saved",
        label: "Tap Saved Galleries tag.",
        tap: { x: 104, y: 74 },
        view: <DiscoverSearchResultsFilteredScreen galleryScope="saved" />,
        transitionFromPrev: "none",
      },
      {
        id: "flow5-date",
        label: "Tap Date filter.",
        tap: { x: 198, y: 74 },
        view: <DiscoverSearchResultsFilteredScreen galleryScope="saved" activeFilter="date" />,
        transitionFromPrev: "none",
      },
      {
        id: "flow5-rating",
        label: "Tap Rating filter.",
        tap: { x: 253, y: 74 },
        view: <DiscoverSearchResultsFilteredScreen galleryScope="saved" activeFilter="rating" />,
        transitionFromPrev: "none",
      },
      {
        id: "flow5-map-results",
        label: "Open map with three matching results.",
        tap: { x: 250, y: 488 },
        view: <DiscoverMapScreen resultCards={demoMapResultCards} />,
        transitionFromPrev: "push",
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col items-center gap-[45vh] w-full py-[8px]">
      <FlowCard steps={flowOneSteps} />
      <FlowCard steps={flowTwoSteps} intervalMs={2400} />
      <FlowCard steps={flowThreeSteps} intervalMs={3400} />
      <FlowCard steps={flowFourSteps} intervalMs={2200} />
      <FlowCard steps={flowFiveSteps} intervalMs={2000} />
    </div>
  );
}
