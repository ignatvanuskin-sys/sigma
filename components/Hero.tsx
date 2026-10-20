import Link from "next/link";
import { IconArrow, IconWhatsapp } from "./Icons";
import { site } from "@/lib/data";

export default function Hero() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero-driver.webp"
        media="(max-width: 999px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-wide.webp"
        media="(min-width: 1000px)"
        fetchPriority="high"
      />

      <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg">
        <picture>
          <source media="(min-width: 1000px)" srcSet="/images/hero-wide.webp" />
          <img
            className="hero__img"
            src="/images/hero-driver.webp"
            alt=""
            width={1200}
            height={1500}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="container hero__container">
        <div className="hero__copy">
          <p className="hero__badge-line">
            <span className="hero__badge-dot" aria-hidden="true" />
            Автошкола нового поколения · {site.city}
          </p>

          <h1 id="hero-title" className="h1">
            Права категории <em>B</em> в Астане — без зубрёжки и пропущенных тем
          </h1>

          <p className="hero__sub">
            Модульное обучение: 10 уроков по часу. Старт в любой день, пропуск не ломает
            программу. На казахском и русском.
          </p>

          <div className="hero__cta">
            <Link href="#podbor" className="btn btn--primary">
              Подобрать курс
              <IconArrow size={17} />
            </Link>
            <a
              href={site.whatsapp}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsapp size={18} />
              Написать в WhatsApp
            </a>
          </div>

          <ul className="trust">
            <li className="trust__item">
              <span className="trust__value trust__value--accent">{site.rating}</span>
              <span>в 2ГИС</span>
            </li>
            <li className="trust__item">
              <span className="trust__value">{site.reviewsCount}</span>
              <span>отзывов</span>
            </li>
            <li className="trust__item">
              <span className="trust__value">{site.branchesCount}</span>
              <span>филиалов</span>
            </li>
            <li className="trust__item">
              <span className="trust__value">с {site.since}</span>
              <span>года</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="hero__strip">
        <div className="container hero__strip-inner">
          <span>Модули 10 × 1 час</span>
          <span>Старт в любой день</span>
          <span>Казахский и русский</span>
          <span>Рассрочка 0%</span>
          <span>Скидка на справку 073</span>
          <span>Мерч</span>
        </div>
      </div>
      </section>
    </>
  );
}
