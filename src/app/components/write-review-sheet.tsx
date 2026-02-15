/**
 * WriteReviewContent — Two-view write-review flow rendered inside a BottomSheet.
 * View 1: Review form (gallery card, date, star rating, text area, submit)
 * View 2: Full text editor (slides in from the left when tapping the text box)
 */
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-puoscei497";
import { galleryImages } from "./curated-images";

const [reviewCardImage] = galleryImages;

/* ══════════════════════════════════════════════
   SHARED SUB-COMPONENTS
   ══════════════════════════════════════════════ */

/** X close button */
function CloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="flex items-center justify-center cursor-pointer shrink-0"
      onClick={onClick}
      style={{
        width: "32px",
        height: "32px",
        backgroundColor: "#d9d9d9",
        borderRadius: "50%",
      }}
    >
      <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
        <path
          d="M1 1L11 11M11 1L1 11"
          stroke="black"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/** Dark "Save" pill */
function SavePill({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="relative flex items-center justify-center cursor-pointer shrink-0"
      onClick={onClick}
      style={{
        backgroundColor: "#171717",
        borderRadius: "67.302px",
        paddingLeft: "12.698px",
        paddingRight: "12.698px",
        paddingTop: "8.889px",
        paddingBottom: "8.889px",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "67.302px",
        }}
      />
      <span
        style={{
          fontFamily:
            "'KMR Waldenburg Buch', 'KMR_Waldenburg:Buch', sans-serif",
          fontSize: "15px",
          letterSpacing: "-0.45px",
          lineHeight: "normal",
          color: "#d6d6d6",
        }}
      >
        Save
      </span>
    </div>
  );
}

/** Single star SVG */
function Star({
  filled,
  size = 42,
}: {
  filled: boolean;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * (40.0329 / 42.0931)}
      fill="none"
      viewBox="0 0 42.0931 40.0329"
    >
      <path
        d={svgPaths.p21b2c000}
        fill={filled ? "#F5C518" : "#E6E6E6"}
      />
    </svg>
  );
}

/** Interactive star rating row — 5 tappable stars */
function StarRating({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (r: number) => void;
}) {
  return (
    <div className="flex items-center" style={{ gap: "8px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="cursor-pointer shrink-0"
          onClick={() => onRate(i)}
        >
          <Star filled={i <= rating} size={42} />
        </div>
      ))}
    </div>
  );
}

/** Gallery info card — flexbox row layout */
function GalleryInfoCard() {
  return (
    <div
      className="flex items-center overflow-hidden mx-[16px]"
      style={{
        backgroundColor: "#efeeee",
        borderRadius: "12px",
        height: "105px",
        padding: "13px 10px",
        gap: "8px",
      }}
    >
      {/* Thumbnail */}
      <div
        className="shrink-0 overflow-hidden"
        style={{
          width: "80px",
          height: "77px",
          borderRadius: "10px",
        }}
      >
        <img
          src={reviewCardImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info column */}
      <div className="flex flex-col flex-1 min-w-0">
        <span
          style={{
            fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
            fontWeight: 500,
            fontSize: "15px",
            letterSpacing: "-1.05px",
            lineHeight: "normal",
            color: "#646464",
          }}
        >
          Gagosian Chelsea
        </span>

        {/* Hours + dot + Status */}
        <div className="flex items-center" style={{ gap: "6px", marginTop: "2px" }}>
          <span
            style={{
              fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              letterSpacing: "-0.84px",
              lineHeight: "normal",
              color: "#908a8a",
            }}
          >
            10am-6pm
          </span>
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "#908a8a",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'KMR Waldenburg', 'KMR_Waldenburg:Normal', sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              letterSpacing: "-0.84px",
              lineHeight: "normal",
              color: "#908a8a",
            }}
          >
            Open
          </span>
        </div>

        {/* Neighborhood link */}
        <span
          className="underline"
          style={{
            fontFamily:
              "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
            fontSize: "12px",
            letterSpacing: "-0.36px",
            lineHeight: "normal",
            color: "#9d9d9d",
            marginTop: "4px",
          }}
        >
          Chelsea
        </span>
      </div>

      {/* Checkmark badge */}
      <div className="shrink-0 self-center" style={{ width: "24.28px", height: "24.28px" }}>
        <svg
          width="24.28"
          height="24.28"
          fill="none"
          viewBox="0 0 24.2795 24.2795"
        >
          <rect
            fill="#1F1F1F"
            height="23.522"
            rx="11.761"
            width="23.522"
            x="0.379"
            y="0.379"
          />
          <rect
            height="23.522"
            rx="11.761"
            stroke="#1F1F1F"
            strokeWidth="0.757"
            width="23.522"
            x="0.379"
            y="0.379"
          />
          <path d={svgPaths.p1a0f3880} fill="#EFEEEE" />
        </svg>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   VIEW 1 — REVIEW FORM
   ══════════════════════════════════════════════ */

function ReviewFormView({
  rating,
  reviewText,
  onRate,
  onCancel,
  onTextBoxClick,
  onSubmit,
}: {
  rating: number;
  reviewText: string;
  onRate: (r: number) => void;
  onCancel: () => void;
  onTextBoxClick: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex flex-col">
      {/* ─── Top bar: Cancel ─── */}
      <div className="flex items-center justify-start px-[16px] pt-[10px]">
        <CloseButton onClick={onCancel} />
      </div>

      {/* ─── Heading ─── */}
      <div className="px-[16px] mt-[14px]">
        <span
          style={{
            fontFamily:
              "'KMR Waldenburg Halbfett', 'KMR_Waldenburg:Halbfett', sans-serif",
            fontSize: "18px",
            letterSpacing: "-0.54px",
            lineHeight: "normal",
            color: "#3f3f3f",
          }}
        >
          Leave A Review
        </span>
      </div>

      {/* ─── Gallery info card ─── */}
      <div className="mt-[14px]">
        <GalleryInfoCard />
      </div>

      {/* ─── Date row ─── */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "14px 16px 0" }}
      >
        <span
          style={{
            fontFamily:
              "'KMR Waldenburg Fett', 'KMR_Waldenburg:Fett', sans-serif",
            fontSize: "12px",
            letterSpacing: "-0.36px",
            lineHeight: "normal",
            color: "#2d2d2d",
          }}
        >
          Date
        </span>
        <span
          style={{
            fontFamily:
              "'KMR Waldenburg Fett', 'KMR_Waldenburg:Fett', sans-serif",
            fontSize: "12px",
            letterSpacing: "-0.36px",
            lineHeight: "normal",
            color: "#757575",
          }}
        >
          Sunday, April 28, 2024
        </span>
      </div>

      {/* ─── Star Rating box ─── */}
      <div
        className="flex flex-col mx-[16px] mt-[10px]"
        style={{
          border: "1px solid black",
          borderRadius: "12px",
          padding: "10px 10px 8px",
        }}
      >
        <span
          style={{
            fontFamily:
              "'KMR Waldenburg Fett', 'KMR_Waldenburg:Fett', sans-serif",
            fontSize: "12px",
            letterSpacing: "-0.36px",
            lineHeight: "normal",
            color: "#2d2d2d",
          }}
        >
          Review
        </span>
        <div className="mt-[6px]">
          <StarRating rating={rating} onRate={onRate} />
        </div>
      </div>

      {/* ─── Leave a Review text box ─── */}
      <div
        className="flex flex-col mx-[16px] mt-[10px] cursor-pointer"
        style={{
          border: "1px solid black",
          borderRadius: "12px",
          padding: "12px",
          minHeight: "130px",
        }}
        onClick={onTextBoxClick}
      >
        <span
          style={{
            fontFamily:
              "'KMR Waldenburg Fett', 'KMR_Waldenburg:Fett', sans-serif",
            fontSize: "12px",
            letterSpacing: "-0.36px",
            lineHeight: "normal",
            color: "#2d2d2d",
          }}
        >
          Leave a Review
        </span>
        {reviewText && (
          <p
            className="mt-[6px]"
            style={{
              fontFamily:
                "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
              fontSize: "11px",
              letterSpacing: "-0.33px",
              lineHeight: "1.35",
              color: "#3f3f3f",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
            }}
          >
            {reviewText}
          </p>
        )}
      </div>

      {/* ─── Submit button ─── */}
      <div className="flex justify-center mt-[12px] pb-[14px]">
        <div
          className="relative flex items-center justify-center cursor-pointer"
          onClick={onSubmit}
          style={{
            backgroundColor: "#2d2d2d",
            borderRadius: "5.255px",
            width: "185px",
            height: "38px",
            gap: "7px",
          }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-1.99px",
              border: "1.99px solid white",
              borderRadius: "7.245px",
            }}
          />
          <svg
            width="8.32"
            height="8.32"
            fill="none"
            viewBox="0 0 8.32046 8.32046"
          >
            <path d={svgPaths.p8c35c00} fill="#C3C3C3" />
          </svg>
          <span
            style={{
              fontFamily:
                "'KMR Waldenburg Normal', 'KMR_Waldenburg:Normal', sans-serif",
              fontSize: "10.997px",
              letterSpacing: "-0.3299px",
              lineHeight: "normal",
              color: "#c3c3c3",
            }}
          >
            Review
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   VIEW 2 — TEXT EDITOR (slides from left)
   ══════════════════════════════════════════════ */

function TextEditorView({
  text,
  onTextChange,
  onCancel,
  onSave,
}: {
  text: string;
  onTextChange: (t: string) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col h-full">
      {/* ─── Top bar: Cancel + Save ─── */}
      <div className="flex items-center justify-between px-[16px] pt-[10px]">
        <CloseButton onClick={onCancel} />
        <SavePill onClick={onSave} />
      </div>

      {/* ─── Text area ─── */}
      <div
        className="mx-[16px] mt-[20px] flex-1"
        style={{
          border: "1px solid black",
          borderRadius: "12px",
          minHeight: "387px",
        }}
      >
        <textarea
          ref={textareaRef}
          autoFocus
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Leave a Review"
          className="w-full h-full resize-none outline-none bg-transparent"
          style={{
            fontFamily:
              "'KMR Waldenburg Fett', 'KMR_Waldenburg:Fett', sans-serif",
            fontSize: "12px",
            letterSpacing: "-0.36px",
            lineHeight: "1.5",
            color: "#2d2d2d",
            borderRadius: "12px",
            minHeight: "387px",
            padding: "12px",
          }}
        />
      </div>

      <div className="h-[20px]" />
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT — Orchestrates both views
   ══════════════════════════════════════════════ */

export function WriteReviewContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editorDraft, setEditorDraft] = useState("");

  const handleTextBoxClick = () => {
    setEditorDraft(reviewText);
    setShowEditor(true);
  };

  const handleEditorCancel = () => {
    setShowEditor(false);
  };

  const handleEditorSave = () => {
    setReviewText(editorDraft);
    setShowEditor(false);
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <div className="relative overflow-hidden" style={{ minHeight: "540px" }}>
      {/* ─── Form view ─── */}
      <motion.div
        animate={{ x: showEditor ? "100%" : "0%" }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
        style={{ width: "100%" }}
      >
        <ReviewFormView
          rating={rating}
          reviewText={reviewText}
          onRate={setRating}
          onCancel={onClose}
          onTextBoxClick={handleTextBoxClick}
          onSubmit={handleSubmit}
        />
      </motion.div>

      {/* ─── Text editor view (slides in from left) ─── */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="absolute inset-0 bg-white"
          >
            <TextEditorView
              text={editorDraft}
              onTextChange={setEditorDraft}
              onCancel={handleEditorCancel}
              onSave={handleEditorSave}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
