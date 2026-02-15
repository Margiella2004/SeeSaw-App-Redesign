/**
 * BottomSheet — Generic reusable bottom sheet overlay.
 * Slides up from the bottom with a dark backdrop.
 * Closes on backdrop click or swipe/drag down on the handle area.
 */
import { useRef, useCallback, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

export function BottomSheet({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number>(0);
  const isDragging = useRef(false);

  /* ── Touch / drag-to-dismiss on the handle area ── */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
    isDragging.current = true;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const diff = e.clientY - dragStartY.current;
      if (diff > 60) onClose(); // dragged down > 60px → dismiss
    },
    [onClose],
  );

  /* ── Escape key ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-[60] bg-black/40"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="absolute bottom-0 left-0 right-0 z-[70] flex justify-center"
            style={{ maxHeight: "calc(100% - 20px)" }}
          >
            <div
              className="bg-[#fefefe] w-[320px] overflow-hidden flex flex-col"
              style={{
                borderRadius: "12.578px 12.578px 0 0",
                boxShadow: "0px -0.74px 7.547px 0.74px rgba(0,0,0,0.25)",
                maxHeight: "100%",
              }}
            >
              {/* Drag handle area */}
              <div
                className="flex items-center justify-center shrink-0 cursor-grab active:cursor-grabbing pt-[5px] pb-[2px]"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
              >
                <svg width="46" height="8" fill="none" viewBox="0 0 46 8">
                  <path
                    d="M5 3H42"
                    stroke="#DCDCDC"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}