import Image from "next/image";
import Link from "next/link";
import { IconArrow, IconWhatsapp } from "./Icons";
import { site } from "@/lib/data";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__grid">
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

          <div className="hero__media">
            <div className="hero__frame">
              <Image
                src="/images/hero-driver.webp"
                alt="Ученик за рулём учебного автомобиля ночью в Астане"
                width={1200}
                height={1500}
                priority
                sizes="(min-width: 1000px) 45vw, 100vw"
              />
              <div className="hero__tag">
                <span className="hero__tag-num">10×1</span>
                <span className="hero__tag-text">
                  модулей по часу
                  <br />
                  старт в любой день
                </span>
              </div>
            </div>

            <svg
              className="hero__route"
              viewBox="0 0 320 220"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M4 214C72 214 96 160 96 120S150 24 236 24h76"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="14 14"
              />
              <circle cx="4" cy="214" r="6" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="hero__marquee" aria-label="Условия обучения">
          <span>Модули 10 × 1 час</span>
          <span>Старт в любой день</span>
          <span>Казахский и русский</span>
          <span>Рассрочка 0%</span>
          <span>Скидка на справку 073</span>
          <span>Мерч</span>
        </div>
      </div>
    </section>
  );
}
