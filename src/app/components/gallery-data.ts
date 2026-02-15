/**
 * GalleryData — Central data model for an entire gallery page.
 * Every field is customizable; default mock data is exported for dev/demo use.
 * When creating a new gallery, just provide a different GalleryData object.
 */

import type { PieceData } from "./piece-detail";
import type { SmallGalleryCardProps } from "./cards/small-gallery-card";
import type { LargeGalleryCardProps } from "./cards/large-gallery-card";
import type { ReviewData } from "./review-ui";
import type { HomePageData } from "./home-page";
import type { HomeGalleryCardData } from "./cards/home-gallery-card";
import type { PopularGalleryRowData } from "./cards/popular-gallery-row";
import type { EditorPickCardData } from "./cards/editor-pick-card";
import { artImages, galleryImages, portraitImages } from "./curated-images";

/* ══════════════════════════════════════════════
   DATA TYPES
   ══════════════════════════════════════════════ */

export interface ArtistInfo {
  id: string;
  name: string;
  avatarSrc?: string;
}

export interface GalleryHoursRow {
  label: string;             // "Days Open:", "Hours:", etc.
  values: string[];          // ["Mon-Fri", "Sat-Sun"] or ["10am-9pm", "10am-9pm"]
}

export interface GalleryInfo {
  name: string;
  showFollow?: boolean;
  followLabel?: string;
}

export interface LocationData {
  mapImage: string;
  address: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  appleMapsUrl?: string;
}

export interface ContactData {
  phone?: string;
  website?: string;
}

export interface ReviewsData {
  avgRating: string;
  totalReviews: number;
  galleryLabel: string;
  reviewList: ReviewData[];
}

export interface CrawlRowData {
  id: string;
  title: string;
  thumbnailSrc: string;
  avatars: string[];
  extraCount?: number;
  namePillText?: string;
}

export interface GalleryProfileData {
  heroImages: string[];
  activeHeroIndex?: number;
  title: string;
  actionPills: string[];
  currentShows: SmallGalleryCardProps[];
  pastShows: SmallGalleryCardProps[];
}

export interface GalleryData {
  /* ── Hero ── */
  heroImages: string[];
  activeHeroIndex?: number;
  backLabel?: string;

  /* ── Gallery header ── */
  name: string;
  dateRange: string;
  badgeName: string;
  location: string;
  status: string;
  statusColor?: string;

  /* ── Info tab sections ── */
  pressRelease: string;

  artists: ArtistInfo[];
  artistAvatarSrcs: string[];
  artistNameText: string;

  galleryDetails: {
    rows: GalleryHoursRow[];
    gallery: GalleryInfo;
  };

  locationData: LocationData;

  contact: ContactData;

  mediumTags: string[];

  pieces: PieceData[];

  similarShows: SmallGalleryCardProps[];

  crawlCards: LargeGalleryCardProps[];

  /* ── Reviews tab ── */
  reviews: ReviewsData;

  /* ── My Crawls sheet ── */
  crawlsSubtitle?: string;
  crawlsHeading?: string;
  crawlsSectionLabel?: string;
  crawlRows?: CrawlRowData[];

  /* ── Gallery Profile page ── */
  galleryProfile?: GalleryProfileData;
}

/* ══════════════════════════════════════════════
   DEFAULT ASSET IMPORTS — used by the default data below
   ══════════════════════════════════════════════ */

/* NOTE: We import assets here so the default data object is self-contained.
   When building a new gallery, you'd replace these with your own asset imports. */

import imgScreenshot20240416At6241 from "figma:asset/bbe27be7264aa64f422323979714b07f12d78766.png";

const [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16] = galleryImages;
const [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14] = artImages;
const [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12] = portraitImages;

/* ══════════════════════════════════════════════
   DEFAULT DATA — the "Gagosian" gallery
   ══════════════════════════════════════════════ */

const defaultPressRelease =
  "Signal to Noise brings together painting, sculpture, and moving-image works that look at how public life is shaped by broadcast media. Across two floors, the exhibition moves from intimate portrait studies to large urban landscapes, with each room anchored by one major commission. The show was developed in collaboration with three New York-based artists and includes weekly conversations with curators and critics.";

const defaultReviewText =
  "Strong curation and great pacing between rooms. The video piece on the second floor is worth planning around, and staff gave helpful context without being overbearing.";

export const defaultGalleryData: GalleryData = {
  /* ── Hero ── */
  heroImages: [g1, g2, g3, g4],
  activeHeroIndex: 0,
  backLabel: "results",

  /* ── Header ── */
  name: "Gagosian",
  dateRange: "Through May 24",
  badgeName: "Gagosian",
  location: "New York",
  status: "Open",
  statusColor: undefined,

  /* ── Press Release ── */
  pressRelease: defaultPressRelease,

  /* ── Artists ── */
  artists: [
    { id: "a1", name: "Eric White", avatarSrc: p1 },
    { id: "a2", name: "Alberta Whittle", avatarSrc: p2 },
    { id: "a3", name: "Sable Elyse Smith", avatarSrc: p3 },
    { id: "a4", name: "Tuan Andrew Nguyen", avatarSrc: p4 },
    { id: "a5", name: "Avery Singer", avatarSrc: p5 },
    { id: "a6", name: "Jordan Casteel", avatarSrc: p6 },
  ],
  artistAvatarSrcs: [p1, p2],
  artistNameText: "Eric White and Alberta Whittle",

  /* ── Gallery Details ── */
  galleryDetails: {
    rows: [
      { label: "Days Open:", values: ["Tue-Sat", "Sun-Mon"] },
      { label: "Hours:", values: ["10am-6pm", "Closed"] },
    ],
    gallery: { name: "Gagosian", showFollow: true, followLabel: "Follow" },
  },

  /* ── Location ── */
  locationData: {
    mapImage: imgScreenshot20240416At6241,
    address: "555 W 24th St, New York, NY 10011",
    latitude: 40.7493,
    longitude: -74.0048,
    googleMapsUrl: "https://maps.google.com",
    appleMapsUrl: "https://maps.apple.com",
  },

  /* ── Contact ── */
  contact: {
    phone: "(212) 741-1111",
    website: "www.gagosian.com",
  },

  /* ── Medium Tags ── */
  mediumTags: ["Painting", "Installation", "Video"],

  /* ── Pieces in Show ── */
  pieces: [
    { id: "piece-1", src: a1, title: "Night Broadcast", artist: "Eric White" },
    { id: "piece-2", src: a2, title: "Public Signal", artist: "Alberta Whittle" },
    { id: "piece-3", src: a3, title: "Street Monitor", artist: "Sable Elyse Smith" },
  ],

  /* ── Similar Shows ── */
  similarShows: [
    {
      name: "Hauser & Wirth",
      thumbnails: [g5, a4, g6],
      rating: "4.4",
      status: "Open",
      statusColor: "#4caf50",
      tag: "Hauser & Wirth",
    },
    {
      name: "Matthew Marks",
      thumbnails: [g7, a5, g8],
      rating: "4.1",
      status: "Closed",
      statusColor: "#ed2115",
      tag: "Matthew Marks",
    },
  ],

  /* ── Shown In Crawls ── */
  crawlCards: [
    {
      name: "Chelsea Saturday Crawl",
      thumbnails: [g9, g10, a6],
      avatars: [p7, p8],
      statusText: "328 likes",
      extraText: "14 galleries",
      extraText2: "NYC",
    },
    {
      name: "Downtown Evenings",
      thumbnails: [g11, g12, a7],
      avatars: [p9, p10],
      statusText: "143 saves",
      extraText: "9 galleries",
      extraText2: "NYC",
    },
  ],

  /* ── Reviews ── */
  reviews: {
    avgRating: "4.3",
    totalReviews: 128,
    galleryLabel: "Gagosian",
    reviewList: [
      {
        id: "1",
        avatarSrc: p11,
        name: "Nina Patel",
        rating: "4.6",
        text: defaultReviewText,
        likes: 84,
        comments: 12,
        isCritic: true,
        criticLabel: "Art Critic",
      },
      {
        id: "2",
        avatarSrc: p12,
        name: "Mason Lee",
        rating: "4.2",
        text: "Beautiful install and smart lighting. Saturday around noon was busy, but lines moved fast and the staff was friendly.",
        likes: 42,
        comments: 7,
      },
      {
        id: "3",
        avatarSrc: p1,
        name: "Camila Torres",
        rating: "4.1",
        text: "Loved the opening room. The final gallery felt slightly crowded, but the overall show was strong and worth a second visit.",
        likes: 31,
        comments: 5,
      },
    ],
  },

  /* ── My Crawls sheet ── */
  crawlsSubtitle: "Choose where to save this gallery",
  crawlsHeading: "Add to List",
  crawlsSectionLabel: "Lists by city",
  crawlRows: [
    { id: "c1", title: "Chelsea Openings", thumbnailSrc: g13, avatars: [p2, p3], extraCount: 6, namePillText: "Nina Patel +2" },
    { id: "c2", title: "Saturday Downtown", thumbnailSrc: g14, avatars: [p4, p5], extraCount: 4, namePillText: "Mason Lee +1" },
    { id: "c3", title: "Photo + Video Day", thumbnailSrc: g15, avatars: [p6, p7], extraCount: 7, namePillText: "Camila Torres +3" },
  ],

  /* ── Gallery Profile ── */
  galleryProfile: {
    heroImages: [g2, g3, g4, g5],
    activeHeroIndex: 0,
    title: "Gagosian NYC",
    actionPills: ["Followers", "Artists"],
    currentShows: [
      {
        name: "Signal to Noise",
        thumbnails: [a8, a9, a10],
        rating: "4.3",
        status: "Open",
        statusColor: "#4caf50",
        tag: "Chelsea",
      },
    ],
    pastShows: [
      {
        name: "Soft Infrastructure",
        thumbnails: [g16, a11, a12],
        rating: "4.0",
        status: "Closed",
        statusColor: "#ed2115",
        tag: "2024",
      },
      {
        name: "American Echoes",
        thumbnails: [g6, a13, a14],
        rating: "4.2",
        status: "Closed",
        statusColor: "#ed2115",
        tag: "2023",
      },
    ],
  },
};

/* ══════════════════════════════════════════════
   DEFAULT HOME PAGE DATA
   ══════════════════════════════════════════════ */

export const defaultHomePageData: HomePageData = {
  greeting: "Welcome back, Jonathan!",
  title: "Home",
  city: "NYC",

  /* ── For you — large gallery cards ── */
  forYou: [
    { id: "fy1", thumbnails: [g1], name: "Pace Gallery", tag: "Chelsea", rating: "4.2", status: "Open", hours: "10am-6pm" },
    { id: "fy2", thumbnails: [g7], name: "Hauser & Wirth", tag: "SoHo", rating: "4.4", status: "Open", hours: "10am-6pm" },
    { id: "fy3", thumbnails: [g9], name: "Gladstone Gallery", tag: "Chelsea", rating: "4.0", status: "Open", hours: "10am-6pm" },
  ],

  /* ── Recently Viewed — small cards ── */
  recentlyViewed: [
    { name: "Gagosian", thumbnails: [g10], rating: "4.3", status: "Open", statusColor: "#4caf50", tag: "Chelsea" },
    { name: "David Zwirner", thumbnails: [g13], rating: "4.2", status: "Open", statusColor: "#4caf50", tag: "Chelsea" },
  ],

  /* ── Friends Also Like — large gallery cards ── */
  friendsAlsoLike: [
    { id: "fl1", thumbnails: [g6], name: "Paula Cooper", tag: "West Village", rating: "4.1", status: "Open", hours: "10am-6pm" },
    { id: "fl2", thumbnails: [g16], name: "Lisson Gallery", tag: "Chelsea", rating: "4.0", status: "Open", hours: "10am-6pm" },
  ],

  /* ── Editors Picks ── */
  editorsPicks: [
    { id: "ep1", backgroundSrc: g5, title: "A one-hour Chelsea route", label: "Editor's Picks" },
    { id: "ep2", backgroundSrc: g8, title: "Best new painting shows in NYC", label: "Editor's Picks" },
  ],

  /* ── Most Popular — row list ── */
  mostPopular: [
    { id: "mp1", thumbnailSrc: g2, name: "Sean Kelly", hours: "10am-6pm", status: "Open", statusColor: "#4caf50", galleryLink: "Chelsea", rating: "4.1" },
    { id: "mp2", thumbnailSrc: g3, name: "Lehmann Maupin", hours: "10am-6pm", status: "Open", statusColor: "#4caf50", galleryLink: "Lower East Side", rating: "4.2" },
    { id: "mp3", thumbnailSrc: g4, name: "Petzel Gallery", hours: "11am-6pm", status: "Open", statusColor: "#4caf50", galleryLink: "Tribeca", rating: "4.0" },
  ],
};
