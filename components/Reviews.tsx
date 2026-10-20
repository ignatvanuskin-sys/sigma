import { IconArrow, IconStar } from "./Icons";
import { reviews, site } from "@/lib/data";

export default function Reviews() {
  return (
    <div className="reviews__grid">
      <div className="reviews__score">
        <p className="eyebrow" style={{ color: "rgba(245,243,239,0.55)" }}>
          <span className="eyebrow__num">2ГИС</span>
        </p>
        <p className="reviews__num" aria-label={`Рейтинг ${site.rating} из 5`}>
          {site.rating}
        </p>
        <div className="stars" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar key={i} size={15} />
          ))}
        </div>
        <p className="reviews__score-text">
          {site.reviewsCount} оценок в 2ГИС. Отзывы не модерируем и не удаляем — можно прочитать
          все, включая критику.
        </p>
        <div className="reviews__links">
          <a
            href={`${site.twogis}/tab/reviews`}
            className="btn btn--ghost btn--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Все отзывы в 2ГИС
            <IconArrow size={15} />
          </a>
        </div>
      </div>

      <div>
        <div className="reviews__list">
          {reviews.map((review) => (
            <figure
              key={review.name + review.date}
              className="review"
              lang={review.lang === "kz" ? "kk" : undefined}
            >
              <blockquote className="review__text">{review.text}</blockquote>
              <figcaption className="review__meta">
                <span className="review__name">{review.name}</span>
                <span aria-hidden="true">·</span>
                <span>{review.date}</span>
                <span className="review__src">2ГИС</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="reviews__note">
          Цитаты приведены с публичных страниц 2ГИС. Ссылка на карточку — в подвале сайта.
        </p>
      </div>
    </div>
  );
}
