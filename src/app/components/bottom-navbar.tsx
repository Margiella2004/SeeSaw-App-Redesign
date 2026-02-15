/**
 * BottomNavbar — Reusable bottom navigation bar with Home, Discover, User tabs.
 * Supports customizable active tab and click handlers.
 */
import { IconHome, IconDiscover, IconUser } from "./icons";

export interface NavItem {
  id: string;
  label: string;
  icon: "home" | "discover" | "user";
}

const defaultItems: NavItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "discover", label: "Discover", icon: "discover" },
  { id: "user", label: "user", icon: "user" },
];

export function BottomNavbar({
  items = defaultItems,
  activeId = "home",
  className = "",
  onNavigate,
}: {
  items?: NavItem[];
  activeId?: string;
  className?: string;
  onNavigate?: (id: string) => void;
}) {
  return (
    <div className={`relative w-full h-full bg-white border-t border-black ${className}`}>
      {items.map((item) => {
        const isActive = item.id === activeId;

        if (item.icon === "discover") {
          return (
            <div
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className="absolute left-1/2 -translate-x-1/2 -top-[18px] flex flex-col items-center cursor-pointer"
            >
              <div className="w-[38px] h-[38px]">
                <IconDiscover size={38} active={isActive} />
              </div>
              <span
                className="font-['KMR_Waldenburg:Normal',sans-serif] text-[9px] tracking-[-0.27px] mt-[2px]"
                style={{ color: isActive ? "#2d2d2d" : "#2d2d2d" }}
              >
                {item.label}
              </span>
            </div>
          );
        }

        if (item.icon === "home") {
          return (
            <div
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className="absolute flex flex-col items-center left-[50px] top-[4px] cursor-pointer"
            >
              <IconHome size={22} color={isActive ? "black" : "#B4B4B4"} />
              <span
                className="font-['KMR_Waldenburg:Normal',sans-serif] text-[9px] tracking-[-0.27px] mt-[2px]"
                style={{ color: isActive ? "#2d2d2d" : "#b4b4b4" }}
              >
                {item.label}
              </span>
            </div>
          );
        }

        if (item.icon === "user") {
          return (
            <div
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className="absolute flex flex-col items-center right-[45px] top-[4px] cursor-pointer"
            >
              <IconUser size={19} color={isActive ? "black" : "#B4B4B4"} />
              <span
                className="font-['KMR_Waldenburg:Normal',sans-serif] text-[9px] tracking-[-0.27px] mt-[2px]"
                style={{ color: isActive ? "#2d2d2d" : "#b4b4b4" }}
              >
                {item.label}
              </span>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}