/**
 * FollowListSheet — Overlay sheet showing "My Friends" / "My Galleries" / "My Artists"
 * list views. Matches the Figma Search-24-2679 / Search-24-2792 / Search-24-2905 frames.
 * Reusable: pass `variant` to control which title/subtitle to display.
 */
import { useState } from "react";
import svgPaths from "../../imports/svg-nswh9ns5db";
import { galleryImages, portraitImages } from "./curated-images";

const [g1, g2, g3, g4, g5, g6] = galleryImages;
const [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12] = portraitImages;

export type FollowListVariant = "friends" | "galleries" | "artists";

interface FollowListSheetProps {
  variant: FollowListVariant;
  onClose: () => void;
}

/* ── Config per variant ── */
const variantConfig: Record<
  FollowListVariant,
  { title: string; subtitle: string }
> = {
  friends: { title: "My Friends", subtitle: "6 people in your network" },
  galleries: { title: "My Galleries", subtitle: "6 followed galleries" },
  artists: { title: "My Artists", subtitle: "6 followed artists" },
};

interface ProfileEntry {
  name: string;
  avatarSrc?: string;
}

/* ── Mock profile rows ── */
const friendProfiles: ProfileEntry[] = [
  { name: "Sarah Chen", avatarSrc: p2 },
  { name: "Alex Rivera", avatarSrc: p2 },
  { name: "Mia Tanaka", avatarSrc: p3 },
  { name: "James Wilson", avatarSrc: p4 },
  { name: "Priya Sharma", avatarSrc: p5 },
  { name: "Lucas Garcia", avatarSrc: p6 },
];

const galleryProfiles: ProfileEntry[] = [
  { name: "Gagosian", avatarSrc: g1 },
  { name: "Pace Gallery", avatarSrc: g2 },
  { name: "David Zwirner", avatarSrc: g3 },
  { name: "Hauser & Wirth", avatarSrc: g4 },
  { name: "White Cube", avatarSrc: g5 },
  { name: "Perrotin", avatarSrc: g6 },
];

const artistProfiles: ProfileEntry[] = [
  { name: "Yayoi Kusama", avatarSrc: p7 },
  { name: "Banksy", avatarSrc: p8 },
  { name: "Kaws", avatarSrc: p9 },
  { name: "Jean-Michel Basquiat", avatarSrc: p10 },
  { name: "Keith Haring", avatarSrc: p11 },
  { name: "Takashi Murakami", avatarSrc: p12 },
];

const profilesByVariant: Record<FollowListVariant, ProfileEntry[]> = {
  friends: friendProfiles,
  galleries: galleryProfiles,
  artists: artistProfiles,
};

/* ── Avatar placeholder — grey circle with small plus icon ── */
function AvatarCircle({ avatarSrc }: { avatarSrc?: string }) {
  return (
    <div
      className="bg-[#ededed] overflow-hidden shrink-0 relative"
      style={{ width: "49.78px", height: "49.5px", borderRadius: "49.78px" }}
    >
      {avatarSrc ? (
        <img src={avatarSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div
          className="absolute"
          style={{ left: "19.02px", top: "19.02px", width: "11.746px", height: "11.746px" }}
        >
          <svg
            className="block"
            width="11.7458"
            height="11.7458"
            fill="none"
            viewBox="0 0 11.7458 11.7458"
          >
            <rect fill="#C3C3C3" height="11.7458" rx="5.87288" width="11.7458" />
            <path d={svgPaths.p4e61c00} fill="#E9E9E9" />
          </svg>
        </div>
      )}
    </div>
  );
}

/* ── Follow button — dark pill with + icon ── */
function FollowButton({ following, onToggle }: { following: boolean; onToggle: () => void }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center gap-[5.735px] cursor-pointer"
      style={{
        background: following ? "#e7e7e7" : "#2d2d2d",
        borderRadius: "4.301px",
        paddingLeft: "7.329px",
        paddingRight: "10px",
        paddingTop: "6.451px",
        paddingBottom: "6.451px",
        position: "relative",
      }}
      onClick={onToggle}
    >
      {!following && (
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            inset: "-1.629px",
            border: "1.629px solid white",
            borderRadius: "5.93px",
          }}
        />
      )}
      {!following && (
        <svg width="6.81" height="6.81" fill="none" viewBox="0 0 6.80973 6.80973">
          <path d={svgPaths.p47b4e00} fill="#C3C3C3" />
        </svg>
      )}
      <span
        className="font-['KMR_Waldenburg:Normal',sans-serif]"
        style={{
          fontSize: "9px",
          letterSpacing: "-0.27px",
          lineHeight: "normal",
          color: following ? "#535353" : "#c3c3c3",
        }}
      >
        {following ? "Following" : "Follow"}
      </span>
    </div>
  );
}

/* ── Single profile row ── */
function ProfileRow({
  name,
  avatarSrc,
  following,
  onToggle,
}: {
  name: string;
  avatarSrc?: string;
  following: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-[3px] w-full">
      <div className="flex items-center gap-[9px]">
        <AvatarCircle avatarSrc={avatarSrc} />
        <p
          className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
          style={{
            fontSize: "12px",
            letterSpacing: "-0.6px",
            lineHeight: "normal",
            fontWeight: 600,
            color: "#535353",
          }}
        >
          {name}
        </p>
      </div>
      <FollowButton following={following} onToggle={onToggle} />
    </div>
  );
}

/* ══════════════════════════════════════════════
   FOLLOW LIST SHEET COMPONENT
   ══════════════════════════════════════════════ */
export function FollowListSheet({ variant, onClose }: FollowListSheetProps) {
  const config = variantConfig[variant];
  const profiles = profilesByVariant[variant];
  const [followState, setFollowState] = useState<Record<number, boolean>>({});

  const toggleFollow = (idx: number) => {
    setFollowState((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="bg-white w-full min-h-full relative">
      {/* ── Drag handle ── */}
      <div className="flex justify-center pt-[4px]">
        <svg width="54" height="9" fill="none" viewBox="0 0 54 9">
          <path d="M9 3.5H46" stroke="#DCDCDC" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>

      {/* ── Subtitle ── */}
      <p
        className="font-['KMR_Waldenburg:Halbfett',sans-serif] px-[17px] pt-[14px]"
        style={{
          fontSize: "10px",
          letterSpacing: "-0.3px",
          lineHeight: "normal",
          color: "#343333",
        }}
      >
        {config.subtitle}
      </p>

      {/* ── Title row with back button ── */}
      <div className="flex items-center justify-between px-[16px] mt-[0px]">
        <div className="flex items-center gap-[4px]">
          <p
            className="font-['KMR_Waldenburg:Halbfett',sans-serif]"
            style={{
              fontSize: "35px",
              letterSpacing: "-1.75px",
              lineHeight: "56.249px",
              fontWeight: 600,
              color: "#494949",
            }}
          >
            {config.title}
          </p>
          {/* Down-arrow icon */}
          <svg width="17" height="15.54" fill="none" viewBox="0 0 17 15.5429">
            <path d={svgPaths.p11c2c680} fill="#4E4E4E" />
          </svg>
        </div>
        {/* Close button — dark circle with X */}
        <div
          className="shrink-0 cursor-pointer bg-[#171717] rounded-full flex items-center justify-center"
          style={{ width: "35.6px", height: "35.4px" }}
          onClick={onClose}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
            <path d="M1 1L13 13M13 1L1 13" stroke="#D6D6D6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* ── Profile list ── */}
      <div className="flex flex-col gap-[12px] px-[12px] mt-[16px]">
        {profiles.map((profile, idx) => (
          <ProfileRow
            key={`${variant}-${idx}`}
            name={profile.name}
            avatarSrc={profile.avatarSrc}
            following={!!followState[idx]}
            onToggle={() => toggleFollow(idx)}
          />
        ))}
      </div>
    </div>
  );
}
