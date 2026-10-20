import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import LeadForm from "@/components/LeadForm";
import FaqList from "@/components/FaqList";
import BookButton from "@/components/BookButton";
import JsonLd from "@/components/JsonLd";
import { IconArrow, IconWhatsapp } from "@/components/Icons";
import { categoryPages, getCategoryPage } from "@/lib/category-content";
import { formatPrice, site } from "@/lib/data";
import { breadcrumbSchema, faqSchema, siteUrl } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getCategoryPage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/kategorii/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/kategorii/${page.slug}`,
      images: [{ url: page.image, alt: page.imageAlt }],
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const page = getCategoryPage(slug);
  if (!page) notFound();

  const formCategory = page.code === "BC1" ? "BC1" : page.code === "B" ? "B" : "C / D";
  const others = categoryPages.filter((item) => item.slug !== page.slug);

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: page.h1,
    description: page.summary,
    inLanguage: ["ru", "kk"],
    provider: {
      "@type": "EducationalOrganization",
      name: "S1gma",
      url: siteUrl,
      telephone: "+7-776-000-93-33",
    },
    ...(page.price
      ? {
          offers: {
            "@type": "Offer",
            price: page.price,
            priceCurrency: "KZT",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/kategorii/${page.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd
        data={[
          courseLd,
          faqSchema(page.faq),
          breadcrumbSchema([
            { name: "Главная", href: "/" },
            { name: "Категории", href: "/#prices" },
            { name: page.code, href: `/kategorii/${page.slug}` },
          ]),
        ]}
      />

      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumbs" aria-label="Хлебные крошки">
              <Link href="/">Главная</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#prices">Категории</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.code}</span>
            </nav>

            <div className="page-hero__grid">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow__num">{page.code}</span>
                  {page.tagline}
                </p>
                <h1 className="h1" style={{ marginTop: 16 }}>
                  {page.h1}
                </h1>
                <p className="hero__sub" style={{ marginTop: 18 }}>
                  {page.intro}
                </p>

                <p className="page-hero__price">
                  {page.price ? (
                    <>
                      {formatPrice(page.price)}
                      <small>₸</small>
                    </>
                  ) : (
                    <span style={{ fontSize: "0.62em" }}>Стоимость по запросу</span>
                  )}
                </p>
                {page.priceNote && <p className="muted">{page.priceNote}</p>}
                {page.extraPrice && (
                  <p className="muted" style={{ marginTop: 6 }}>
                    {page.extraPrice.label} — {page.extraPrice.value}
                  </p>
                )}

                <div className="page-hero__cta">
                  <BookButton category={formCategory} className="btn btn--primary">
                    Записаться
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

              <div className="page-hero__media">
                <Image
                  src={page.image}
                  alt={page.imageAlt}
                  width={1600}
                  height={1067}
                  sizes="(min-width: 1000px) 42vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section section--paper" aria-labelledby="includes-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">01</span>
                  Что входит
                </p>
                <h2 className="h2" id="includes-title" data-reveal>
                  Всё в одной цене
                </h2>
              </div>
              <p className="lead" data-reveal>
                Без доплат за «обязательные» дополнительные занятия. Рассрочка — без процентов.
              </p>
            </div>

            <ul className="includes">
              {page.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--soft" aria-labelledby="modules-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">02</span>
                  Программа
                </p>
                <h2 className="h2" id="modules-title" data-reveal>
                  10 модулей по часу
                </h2>
              </div>
              <p className="lead" data-reveal>
                Каждый модуль самостоятельный: порядок не важен, пропуск не ломает программу.
                Старт — в любой день.
              </p>
            </div>

            <div className="modules">
              {page.modules.map((module, i) => (
                <div className="module" key={module.title} data-reveal>
                  <span className="module__n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="module__title">{module.title}</p>
                    <p className="module__text">{module.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--paper" aria-labelledby="cat-faq-title">
          <div className="container">
            <div className="faq__grid">
              <div className="faq__aside">
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">03</span>
                  Вопросы
                </p>
                <h2 className="h2" id="cat-faq-title" data-reveal>
                  Коротко о курсе
                </h2>
                <div className="chips" data-reveal style={{ marginTop: 8 }}>
                  {others.map((item) => (
                    <Link key={item.slug} href={`/kategorii/${item.slug}`} className="chip">
                      <span className="chip__code">{item.code}</span>
                      {item.tagline}
                    </Link>
                  ))}
                  <Link href="/#prices" className="chip">
                    Все курсы
                  </Link>
                </div>
              </div>

              <FaqList items={page.faq} />
            </div>

            <div className="cta-band mt-32" data-reveal>
              <div>
                <p className="cta-band__title">Не уверены, что это ваша категория?</p>
                <p className="cta-band__text">
                  Напишите в WhatsApp — подскажем по возрасту, документам и формату обучения.
                </p>
              </div>
              <div className="cta-band__actions">
                <BookButton category={formCategory} className="btn btn--primary">
                  Оставить заявку
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
                  Записаться на {page.code}
                </h2>
                <p className="lead" data-reveal>
                  Оставьте имя и телефон — перезвоним, подберём филиал и удобное время.
                </p>
                <div className="lead__contacts" data-reveal>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lead__contact"
                  >
                    <span className="lead__contact-label">
                      <IconWhatsapp size={16} /> WhatsApp
                    </span>
                    <span className="lead__contact-value">{site.phoneDisplay}</span>
                  </a>
                  <a href={site.phoneHref} className="lead__contact" style={{ borderBottom: 0 }}>
                    <span className="lead__contact-label">Телефон</span>
                    <span className="lead__contact-value">{site.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <LeadForm compact />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
