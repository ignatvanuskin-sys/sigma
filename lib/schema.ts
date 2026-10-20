import { courses, faq, site, type Course, type Faq } from "./data";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://s1gma.info";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    "@id": `${siteUrl}/#organization`,
    name: "S1gma",
    legalName: site.legalName,
    description:
      "Автошкола в Астане: модульное обучение, 10 уроков по часу, категории A, B, BC1, C, D и с прицепами. Казахский и русский языки.",
    url: siteUrl,
    telephone: "+7-776-000-93-33",
    image: `${siteUrl}/images/hero-driver.webp`,
    priceRange: "9 000 – 160 000 ₸",
    currenciesAccepted: "KZT",
    paymentAccepted: "Наличные, карта, рассрочка 0%",
    address: {
      "@type": "PostalAddress",
      streetAddress: "пр. Сарыарка, 15",
      addressLocality: "Астана",
      addressCountry: "KZ",
    },
    areaServed: { "@type": "City", name: "Астана" },
    sameAs: [site.instagram, site.twogis],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating,
      reviewCount: site.reviewsCount,
      bestRating: "5",
      worstRating: "1",
    },
    makesOffer: courses
      .filter((course) => course.price)
      .map((course) => ({
        "@type": "Offer",
        name: course.title,
        price: course.price,
        priceCurrency: "KZT",
        category: "Обучение в автошколе",
      })),
  };
}

export function courseSchema(course: Course) {
  const mode = course.format === "online" ? "online" : "onsite";
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.title} — S1gma, Астана`,
    description: course.summary,
    inLanguage: ["ru", "kk"],
    provider: {
      "@type": "EducationalOrganization",
      name: "S1gma",
      url: siteUrl,
      telephone: "+7-776-000-93-33",
    },
    ...(course.price
      ? {
          offers: {
            "@type": "Offer",
            price: course.price,
            priceCurrency: "KZT",
            category: "Paid",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/#prices`,
          },
        }
      : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: mode,
      courseWorkload: "PT10H",
      location: {
        "@type": "Place",
        name: "S1gma, Астана",
        address: {
          "@type": "PostalAddress",
          streetAddress: "пр. Сарыарка, 15",
          addressLocality: "Астана",
          addressCountry: "KZ",
        },
      },
    },
  };
}

export function faqSchema(items: Faq[] = faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };
}
