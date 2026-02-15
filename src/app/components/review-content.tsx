/**
 * ReviewContent — Reviews tab content composition.
 * Fully data-driven: accepts ReviewsData to display rating summary, CTA, filters, and cards.
 */
import {
  RatingDisplay,
  ReviewCount,
  ReviewGalleryButton,
  FilterPill,
  ReviewCard,
} from "./review-ui";
import type { ReviewsData } from "./gallery-data";

export function ReviewContent({
  reviews,
  onWriteReview,
}: {
  reviews: ReviewsData;
  onWriteReview?: () => void;
}) {
  return (
    <div className="bg-white w-full">
      {/* ─── Rating Summary ─── */}
      <div className="px-[22px] pt-[6px]">
        <RatingDisplay rating={reviews.avgRating} suffix="avg" />
        <ReviewCount count={reviews.totalReviews} label={reviews.galleryLabel} className="block mt-[-4px]" />
      </div>

      {/* ─── Review Gallery CTA ─── */}
      <div className="flex justify-center mt-[14px]">
        <ReviewGalleryButton onClick={onWriteReview} />
      </div>

      {/* ─── Filter Pills ─── */}
      <div className="flex items-center gap-[10px] px-[22px] mt-[16px]">
        <FilterPill label="Sort by" />
        <FilterPill label="Filter" />
      </div>

      {/* ─── Review Cards ─── */}
      <div className="px-[27px] mt-[16px] pb-[20px]">
        {reviews.reviewList.map((review, i) => (
          <ReviewCard
            key={review.id}
            review={review}
            showTopBorder={true}
            className={i > 0 ? "mt-[12px]" : ""}
          />
        ))}

        {/* Bottom separator */}
        <div className="mt-[12px]" style={{ borderTop: "0.722px solid #828181" }} />
      </div>
    </div>
  );
}
