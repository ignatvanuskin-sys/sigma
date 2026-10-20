"use client";

import { useEffect, useState } from "react";
import { IconWhatsapp } from "./Icons";
import { site } from "@/lib/data";

export default function StickyCta() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [noForm, setNoForm] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const hero = document.querySelector(".hero");
    const form = document.getElementById("zapis");

    if (!form) setNoForm(true);

    const heroObserver = hero
      ? new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
          threshold: 0.25,
        })
      : null;
    heroObserver?.observe(hero as Element);

    const formObserver = form
      ? new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
          rootMargin: "0px 0px -20% 0px",
          threshold: 0,
        })
      : null;
    formObserver?.observe(form as Element);

    return () => {
      heroObserver?.disconnect();
      formObserver?.disconnect();
    };
  }, []);

  const hidden = noForm || heroVisible || formVisible;

  const scrollToForm = () => {
    document.getElementById("zapis")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (noForm) return null;

  return (
    <aside
      aria-label="Быстрая запись"
      className={`sticky-cta${hidden ? " is-hidden" : ""}`}
    >
      <button type="button" className="btn btn--primary sticky-cta__main" onClick={scrollToForm}>
        Записаться на консультацию
      </button>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-cta__wa"
        aria-label="Написать в WhatsApp"
      >
        <IconWhatsapp size={22} />
      </a>
    </aside>
  );
}
