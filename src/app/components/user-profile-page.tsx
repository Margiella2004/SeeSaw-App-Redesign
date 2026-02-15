/**
 * UserProfilePage — User profile screen matching the Figma "User Profile" frame.
 * Layout: top action buttons (settings, plus, share), avatar, name,
 * action pills (Followers, Artists, Galleries), "My Crawls" section with gallery cards.
 */
import { useState } from "react";
import svgPaths from "../../imports/svg-is14it62k2";
import { SmallGalleryCard } from "./cards/small-gallery-card";
import type { SmallGalleryCardProps } from "./cards/small-gallery-card";
import { FollowListSheet } from "./follow-list-sheet";
import type { FollowListVariant } from "./follow-list-sheet";
import { galleryImages, portraitImages } from "./curated-images";

const [g1, g2, g3, g4, g5, g6] = galleryImages;
const [p1] = portraitImages;

/* ── Types ── */
export interface UserProfileData {
  name: string;
  pills: string[];
  crawlCards: SmallGalleryCardProps[];
}

/* ── Default data ── */
export const defaultUserProfileData: UserProfileData = {
  name: "Jonathan Ramesh",
  pills: ["Followers", "Artists", "Galleries"],
  crawlCards: [
    {
      name: "Chelsea Openings",
      thumbnails: [g1, g2, g3],
      rating: "4.2",
      status: "Open",
      statusColor: "#4caf50",
      tag: "NYC",
    },
    {
      name: "Downtown Saturdays",
      thumbnails: [g4, g5, g6],
      rating: "4.0",
      status: "Open",
      statusColor: "#4caf50",
      tag: "NYC",
    },
  ],
};

/* ── Action Pill (Followers / Artists / Galleries) ── */
function ActionPill({ label, count, onClick }: { label: string; count: string; onClick?: () => void }) {
  return (
    <div
      className="bg-[#2d2d2d] rounded-[10px] flex flex-col items-center gap-[3px] overflow-hidden cursor-pointer"
      style={{
        padding: "9px 13px 12px",
        border: "1px solid #7f7f7f",
        minWidth: "87px",
      }}
      onClick={onClick}
    >
      <span
        className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
        style={{
          fontSize: "13px",
          letterSpacing: "-0.45px",
          lineHeight: "normal",
          color: "#f1f1f1",
          fontWeight: 600,
        }}
      >
        {count}
      </span>
      <span
        className="font-['KMR_Waldenburg:Normal',sans-serif]"
        style={{
          fontSize: "11.834px",
          letterSpacing: "-0.355px",
          lineHeight: "normal",
          color: "#a8a8a8",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Settings Cog Icon ── */
function CogIcon() {
  return (
    <div
      className="bg-[#d9d9d9] rounded-full flex items-center justify-center cursor-pointer"
      style={{ width: "35.8px", height: "35.8px" }}
    >
      <svg width="21.658" height="21.658" fill="none" viewBox="0 0 21.6585 21.6585">
        <path d={svgPaths.p1c36a80} fill="black" />
      </svg>
    </div>
  );
}

/* ── Plus Button ── */
function PlusButton() {
  return (
    <div
      className="bg-[#d9d9d9] rounded-full flex items-center justify-center cursor-pointer"
      style={{ width: "35.8px", height: "35.8px" }}
    >
      <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
        <path d={svgPaths.p38adf480} fill="black" />
      </svg>
    </div>
  );
}

/* ── Share Button ── */
function ShareButton() {
  return (
    <div
      className="bg-[#d9d9d9] rounded-full flex items-center justify-center cursor-pointer"
      style={{ width: "35.8px", height: "35.8px" }}
    >
      <svg width="14.538" height="19.989" fill="none" viewBox="0 0 14.5377 19.9893">
        <path d={svgPaths.p37ff7e80} fill="black" />
      </svg>
    </div>
  );
}

/* ── Avatar Placeholder ── */
function AvatarPlaceholder() {
  return (
    <div
      className="bg-[#ededed] rounded-full flex items-center justify-center overflow-hidden"
      style={{ width: "89px", height: "88.5px" }}
    >
      <img src={p1} alt="Profile" className="w-full h-full object-cover" />
    </div>
  );
}

/* ══════════════════════════════════════════════
   USER PROFILE PAGE COMPONENT
   ══════════════════════════════════════════════ */

export function UserProfilePage({
  data = defaultUserProfileData,
  onGallerySelect,
}: {
  data?: UserProfileData;
  onGallerySelect?: (index: number) => void;
}) {
  const [followListVariant, setFollowListVariant] = useState<FollowListVariant | null>(
    null
  );
  const pillCounts: Record<string, string> = {
    Followers: "248",
    Artists: "93",
    Galleries: "176",
  };

  return (
    <div className="bg-white w-full min-h-full">
      {followListVariant ? (
        <FollowListSheet
          variant={followListVariant}
          onClose={() => setFollowListVariant(null)}
        />
      ) : (
        <>
          {/* ── Top action buttons ── */}
          <div className="flex items-center justify-end gap-[8px] px-[16px] pt-[12px]">
            <CogIcon />
            <PlusButton />
            <ShareButton />
          </div>

          {/* ── Avatar ── */}
          <div className="px-[16px] mt-[8px]">
            <AvatarPlaceholder />
          </div>

          {/* ── Name ── */}
          <p
            className="px-[24px] mt-[10px] font-['KMR_Waldenburg:Halbfett',sans-serif]"
            style={{
              fontSize: "21px",
              letterSpacing: "-1.05px",
              lineHeight: "normal",
              fontWeight: 600,
              color: "#535353",
            }}
          >
            {data.name}
          </p>

          {/* ── Action pills row ── */}
          <div className="flex items-center gap-[8px] px-[18px] mt-[14px]">
            {data.pills.map((pill) => {
              const variantMap: Record<string, FollowListVariant> = {
                Followers: "friends",
                Artists: "artists",
                Galleries: "galleries",
              };
              return (
                <ActionPill
                  key={pill}
                  label={pill}
                  count={pillCounts[pill] ?? "0"}
                  onClick={() => {
                    const v = variantMap[pill];
                    if (v) setFollowListVariant(v);
                  }}
                />
              );
            })}
          </div>

          {/* ── My Crawls section ── */}
          <div className="mt-[20px]">
            <div className="flex items-center justify-between px-[17px]">
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
                My Crawls
              </p>
              <span
                className="font-['KMR_Waldenburg:Buch',sans-serif] underline cursor-pointer"
                style={{
                  fontSize: "10px",
                  letterSpacing: "-0.3px",
                  lineHeight: "normal",
                  color: "#585a5e",
                  textDecorationSkipInk: "none",
                }}
              >
                See All
              </span>
            </div>

            {/* ── Crawl cards (horizontal scroll) ── */}
            <div className="flex gap-[10px] overflow-x-auto no-scrollbar px-[16px] mt-[14px] pb-[16px]">
              {data.crawlCards.map((card, i) => (
                <SmallGalleryCard key={i} {...card} onClick={() => onGallerySelect?.(i)} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
