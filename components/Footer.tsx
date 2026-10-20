import Link from "next/link";
import Logo from "./Logo";
import { IconInstagram, IconPhone, IconPin, IconWhatsapp } from "./Icons";
import { branches, site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__desc">
              Автошкола нового поколения в Астане. Модульное обучение, старт в любой день,
              казахский и русский языки.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp S1gma"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "1px solid rgba(245,243,239,0.18)",
                }}
              >
                <IconWhatsapp size={19} />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram S1gma"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "1px solid rgba(245,243,239,0.18)",
                }}
              >
                <IconInstagram size={19} />
              </a>
            </div>
          </div>

          <div>
            <p className="footer__title">Обучение</p>
            <ul className="footer__list">
              <li>
                <Link href="/kategorii/b">Категория B</Link>
              </li>
              <li>
                <Link href="/kategorii/bc1">Категория BC1</Link>
              </li>
              <li>
                <Link href="/kategorii/c-d">C, D и с прицепом</Link>
              </li>
              <li>
                <Link href="/#prices">Цены и рассрочка</Link>
              </li>
              <li>
                <Link href="/#reviews">Отзывы</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="footer__title">Филиалы</p>
            <ul className="footer__list">
              {branches.map((b) => (
                <li key={b.slug}>
                  <Link href={`/branchi/${b.slug}`}>{b.address}</Link>
                  <br />
                  <span className="muted">{b.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer__title">Контакты</p>
            <ul className="footer__list">
              <li>
                <a href={site.phoneHref} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <IconPhone size={15} />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram @s1gma.kz
                </a>
              </li>
              <li>
                <a href={site.twogis} target="_blank" rel="noopener noreferrer">
                  <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                    <IconPin size={15} />
                    Карточка в 2ГИС
                  </span>
                </a>
              </li>
              <li className="muted">Пн–Сб, 09:00–20:00</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © 2026 {site.legalName} · БИН {site.bin}
          </span>
          <span style={{ display: "inline-flex", gap: 18 }}>
            <Link href="/politika-konfidencialnosti">Политика конфиденциальности</Link>
            <span>Астана, Казахстан</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
