/**
 * ArtworkCard — 110×136px image card used in "Piece In Show" section.
 * Displays artwork image with title and artist name below.
 */

export interface ArtworkCardProps {
  src: string;
  title?: string;
  artist?: string;
  imageWidth?: number;
  imageHeight?: number;
  borderRadius?: number;
  className?: string;
  onClick?: () => void;
}

export function ArtworkCard({
  src,
  title = "untitled 1",
  artist = "Artist 1",
  imageWidth = 110,
  imageHeight = 136,
  borderRadius = 12,
  className = "",
  onClick,
}: ArtworkCardProps) {
  return (
    <div
      className={`flex flex-col items-center gap-[9px] shrink-0 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div
        className="overflow-hidden"
        style={{
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          borderRadius: `${borderRadius}px`,
        }}
      >
        <img src={src} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col items-center text-[10.4px] tracking-[-0.31px]">
        <span className="text-[#313131] font-['KMR_Waldenburg:Normal',sans-serif]">{title}</span>
        <span className="text-[#847a7a] font-['KMR_Waldenburg:Buch',sans-serif]">{artist}</span>
      </div>
    </div>
  );
}
