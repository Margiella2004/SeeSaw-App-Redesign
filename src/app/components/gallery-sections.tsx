/**
 * GallerySections — Every section of the gallery Info tab as its own component.
 * Each accepts only the data it needs, making sections reusable and customizable.
 */
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IconPin, IconClock, IconPhone, IconGlobe, IconLocationPin } from "./icons";
import {
  SectionHeading,
  DetailLabel,
  DetailValue,
  IconLabel,
  GalleryBadge,
  GalleryRow,
  TagPill,
  ArtistAvatarGroup,
  TruncatedText,
  Divider,
  ScrollSection,
} from "./gallery-ui";
import { SmallGalleryCard } from "./cards/small-gallery-card";
import type { SmallGalleryCardProps } from "./cards/small-gallery-card";
import { LargeGalleryCard } from "./cards/large-gallery-card";
import type { LargeGalleryCardProps } from "./cards/large-gallery-card";
import { ArtworkCard } from "./cards/artwork-card";
import type { PieceData } from "./piece-detail";
import type { GalleryHoursRow, GalleryInfo, ContactData } from "./gallery-data";

/* ══════════════════════════════════════════════
   PRESS RELEASE SECTION
   ══════════════════════════════════════════════ */

export function PressReleaseSection({
  text,
  onExpand,
  className = "",
}: {
  text: string;
  onExpand?: () => void;
  className?: string;
}) {
  return (
    <div className={`px-[16px] ${className}`}>
      <SectionHeading font="medium">Press Release</SectionHeading>
      <TruncatedText className="mt-[6px]" text={text} onExpand={onExpand} />
    </div>
  );
}

/* ══════════════════════════════════════════════
   ARTISTS INFORMATION SECTION
   ══════════════════════════════════════════════ */

export function ArtistsInfoSection({
  avatarSrcs,
  nameText,
  onClick,
  className = "",
}: {
  avatarSrcs: string[];
  nameText: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`px-[16px] ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <SectionHeading font="medium">Artists Information</SectionHeading>
      <div
        className="mt-[10px] pl-[4px]"
        style={{
          borderTop: "0.5px solid #d0d0d0",
          borderBottom: "0.5px solid #d0d0d0",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <ArtistAvatarGroup avatars={avatarSrcs} nameText={nameText} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   GALLERY DETAILS SECTION
   ══════════════════════════════════════════════ */

export function GalleryDetailsSection({
  rows,
  gallery,
  className = "",
}: {
  rows: GalleryHoursRow[];
  gallery: GalleryInfo;
  className?: string;
}) {
  return (
    <div className={`px-[16px] ${className}`}>
      <SectionHeading font="medium">Gallery</SectionHeading>

      {rows.map((row, i) => (
        <div key={i} className={`flex items-center justify-between ${i === 0 ? "mt-[8px]" : "mt-[4px]"}`}>
          <DetailLabel>{row.label}</DetailLabel>
          <div className="flex gap-[30px]">
            {row.values.map((v, j) => (
              <DetailValue key={j}>{v}</DetailValue>
            ))}
          </div>
        </div>
      ))}

      <GalleryRow
        name={gallery.name}
        showFollow={gallery.showFollow}
        followLabel={gallery.followLabel}
        className="border-y-[0.5px] border-[#d0d0d0] py-[10px] mt-[10px] px-[4px]"
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   LOCATION SECTION (inline in the Info tab)
   ══════════════════════════════════════════════ */

function LocationMapPreview({
  latitude,
  longitude,
  markerImage,
}: {
  latitude: number;
  longitude: number;
  markerImage?: string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    function createImageMarkerIcon(imageUrl: string) {
      const size = 40;
      const borderWidth = 2.5;
      const borderColor = "white";
      const html = `
        <div style="
          position:relative;
          width:${size}px;
          height:${size + 8}px;
          filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));
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
      });
    }

    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    if (markerImage) {
      L.marker([latitude, longitude], {
        icon: createImageMarkerIcon(markerImage),
        interactive: false,
      }).addTo(map);
    }

    window.requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => {
      map.remove();
    };
  }, [latitude, longitude, markerImage]);

  return <div ref={mapRef} className="absolute inset-0 pointer-events-none" />;
}

export function LocationSection({
  address,
  latitude = 40.7493,
  longitude = -74.0048,
  markerImage,
  onClick,
  className = "",
}: {
  address: string;
  latitude?: number;
  longitude?: number;
  markerImage?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`px-[16px] ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <SectionHeading font="medium">Location</SectionHeading>
      <div className="relative mt-[10px] w-full h-[130px] rounded-[13px] border border-[#767676] overflow-hidden bg-[#f1f1f1]">
        <LocationMapPreview latitude={latitude} longitude={longitude} markerImage={markerImage} />
      </div>
      <IconLabel
        icon={<IconLocationPin size={12} color="#676C72" />}
        text={address}
        gap={8}
        textColor="#676c72"
        textSize="11px"
        textTracking="-0.33px"
        className="mt-[12px]"
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   CONTACT SECTION
   ══════════════════════════════════════════════ */

export function ContactSection({
  phone,
  website,
  className = "",
}: ContactData & { className?: string }) {
  return (
    <div className={`px-[16px] ${className}`}>
      <SectionHeading font="bold">Contact</SectionHeading>
      <div className="flex items-center gap-[20px] mt-[10px]">
        {phone && (
          <IconLabel
            icon={<IconPhone size={14} color="#676C72" />}
            text={phone}
            gap={6}
            textColor="#676c72"
            textSize="9px"
            textTracking="-0.27px"
          />
        )}
        {website && (
          <IconLabel
            icon={<IconGlobe size={14} color="#676C72" />}
            text={website}
            gap={6}
            textColor="#676c72"
            textSize="9px"
            textTracking="-0.27px"
          />
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MEDIUM TAGS SECTION
   ══════════════════════════════════════════════ */

export function MediumTagsSection({
  tags,
  className = "",
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <div className={`px-[20px] ${className}`}>
      <SectionHeading font="bold">Medium</SectionHeading>
      <div className="flex mt-[10px]" style={{ gap: "8px" }}>
        {tags.map((tag, i) => (
          <TagPill key={i} label={tag} />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PIECES IN SHOW SECTION
   ══════════════════════════════════════════════ */

export function PiecesInShowSection({
  pieces,
  onPieceClick,
  className = "",
}: {
  pieces: PieceData[];
  onPieceClick?: (index: number) => void;
  className?: string;
}) {
  return (
    <ScrollSection title="Pieces In Show" gap={8} paddingLeft={20} className={className}>
      {pieces.map((piece, i) => (
        <ArtworkCard
          key={piece.id}
          src={piece.src}
          title={piece.title.toLowerCase()}
          artist={piece.artist}
          onClick={() => onPieceClick?.(i)}
        />
      ))}
    </ScrollSection>
  );
}

/* ══════════════════════════════════════════════
   SIMILAR SHOWS SECTION
   ══════════════════════════════════════════════ */

export function SimilarShowsSection({
  shows,
  onShowClick,
  className = "",
}: {
  shows: SmallGalleryCardProps[];
  onShowClick?: (index: number) => void;
  className?: string;
}) {
  return (
    <ScrollSection title="Similar Shows" gap={10} paddingLeft={17} className={className}>
      {shows.map((show, i) => (
        <SmallGalleryCard
          key={i}
          {...show}
          onClick={() => onShowClick?.(i)}
        />
      ))}
    </ScrollSection>
  );
}

/* ══════════════════════════════════════════════
   SHOWN IN CRAWLS SECTION
   ══════════════════════════════════════════════ */

export function ShownInCrawlsSection({
  cards,
  onCardClick,
  className = "",
}: {
  cards: LargeGalleryCardProps[];
  onCardClick?: (index: number) => void;
  className?: string;
}) {
  return (
    <ScrollSection title="Shown In Crawls" gap={14} paddingLeft={21} className={className}>
      {cards.map((card, i) => (
        <LargeGalleryCard
          key={i}
          {...card}
          onClick={() => onCardClick?.(i)}
        />
      ))}
    </ScrollSection>
  );
}
