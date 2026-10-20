import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BranchMapSingle from "@/components/BranchMapSingle";
import LeadForm from "@/components/LeadForm";
import BookButton from "@/components/BookButton";
import JsonLd from "@/components/JsonLd";
import { IconArrow, IconClock, IconPin, IconWhatsapp } from "@/components/Icons";
import { branches, courses, formatPrice, getBranch, site } from "@/lib/data";
import { breadcrumbSchema, siteUrl } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return branches.map((branch) => ({ slug: branch.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) return {};

  return {
    title: `Автошкола на ${branch.short} — ${branch.address}, Астана`,
    description: `Филиал S1gma: ${branch.address}, ${branch.detail}. Обучение на категории B и BC1, модульная теория, запись онлайн. Телефон ${site.phoneDisplay}.`,
    alternates: { canonical: `/branchi/${branch.slug}` },
  };
}

export default async function BranchPage({ params }: Params) {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) notFound();

  const others = branches.filter((b) => b.slug !== branch.slug);
  const local = courses.filter((course) =>
    ["b", "bc1", "b-online", "bc1-online"].includes(course.slug)
  );

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: `S1gma — ${branch.short}`,
    url: `${siteUrl}/branchi/${branch.slug}`,
    telephone: "+7-776-000-93-33",
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: "Астана",
      addressCountry: "KZ",
    },
    openingHours: "Mo-Sa 09:00-20:00",
    parentOrganization: { "@type": "Organization", name: "S1gma", url: siteUrl },
  };

  return (
    <>
      <JsonLd
        data={[
          localBusiness,
          breadcrumbSchema([
            { name: "Главная", href: "/" },
            { name: "Филиалы", href: "/#branches" },
            { name: branch.short, href: `/branchi/${branch.slug}` },
          ]),
        ]}
      />

      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumbs" aria-label="Хлебные крошки">
              <Link href="/">Главная</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#branches">Филиалы</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{branch.short}</span>
            </nav>

            <div className="page-hero__grid">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow__num">Филиал</span>
                  {site.city}
                </p>
                <h1 className="h1" style={{ marginTop: 16 }}>
                  Автошкола S1gma на {branch.short}
                </h1>
                <p className="hero__sub" style={{ marginTop: 18 }}>
                  {branch.address}, {branch.detail}. Модульная теория, практика с инструктором
                  и запись в этом филиале.
                </p>

                <div className="page-hero__cta">
                  <BookButton
                    category="Не знаю"
                    branch={branch.slug}
                    className="btn btn--primary"
                  >
                    Записаться в этот филиал
                    <IconArrow size={17} />
                  </BookButton>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                  >
                    <IconWhatsapp size={18} />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="page-hero__media page-hero__media--map">
                <BranchMapSingle branch={branch} />
              </div>
            </div>
          </div>
        </section>

        <section className="section section--paper">
          <div className="container">
            <div className="branchdetail">
              <div>
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">01</span>
                  Контакты
                </p>
                <h2 className="h2" data-reveal style={{ marginTop: 14, marginBottom: 18 }}>
                  Как нас найти
                </h2>
                <div className="info-list" data-reveal>
                  <div className="info-list__row">
                    <span className="info-list__label">
                      <IconPin size={15} /> Адрес
                    </span>
                    <span className="info-list__value">{branch.address}</span>
                  </div>
                  <div className="info-list__row">
                    <span className="info-list__label">Этаж / офис</span>
                    <span className="info-list__value">{branch.detail}</span>
                  </div>
                  <div className="info-list__row">
                    <span className="info-list__label">
                      <IconClock size={15} /> График
                    </span>
                    <span className="info-list__value">{branch.hours}</span>
                  </div>
                  <div className="info-list__row">
                    <span className="info-list__label">Телефон</span>
                    <a className="info-list__value" href={site.phoneHref}>
                      {site.phoneDisplay}
                    </a>
                  </div>
                  <div className="info-list__row">
                    <span className="info-list__label">2ГИС</span>
                    <a
                      className="info-list__value"
                      href={branch.twogis ?? site.twogis}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Открыть карточку
                    </a>
                  </div>
                </div>

                <p className="muted" style={{ marginTop: 14 }}>
                  График и точный адрес входа уточните у менеджера перед визитом.
                </p>
              </div>

              <div>
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">02</span>
                  Курсы
                </p>
                <h2 className="h2" data-reveal style={{ marginTop: 14, marginBottom: 18 }}>
                  Что можно пройти
                </h2>
                <div data-reveal>
                  {local.map((course) => (
                    <div className="price-row" key={course.slug}>
                      <span className="price-row__name">
                        {course.title}
                        {course.tag === "Онлайн" && (
                          <span className="muted" style={{ marginLeft: 8 }}>
                            онлайн-теория
                          </span>
                        )}
                      </span>
                      <span className="price-row__value">
                        {course.price ? `${formatPrice(course.price)} ₸` : course.priceLabel}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18 }}>
                  <Link href="/#prices" className="link-arrow">
                    Все курсы и цены
                    <IconArrow size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--soft">
          <div className="container">
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__num">03</span>
              Другие филиалы
            </p>
            <h2 className="h2" style={{ marginTop: 14, marginBottom: 22 }} data-reveal>
              Если этот далеко
            </h2>
            <div className="chips">
              {others.map((b) => (
                <Link key={b.slug} href={`/branchi/${b.slug}`} className="chip">
                  <IconPin size={14} />
                  {b.address}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section lead-section" id="zapis" aria-labelledby="zapis-title">
          <div className="container">
            <div className="lead__grid">
              <div className="lead__aside">
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">04</span>
                  Запись
                </p>
                <h2 className="h2" id="zapis-title" data-reveal>
                  Записаться в {branch.short}
                </h2>
                <p className="lead" data-reveal>
                  Филиал уже выбран — осталось имя и телефон. Перезвоним и подтвердим время.
                </p>
              </div>

              <LeadForm compact defaultBranch={branch.slug} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
