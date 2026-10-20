"use client";

import { useEffect, useState } from "react";
import { IconWhatsapp } from "./Icons";
import { site } from "@/lib/data";

export default function StickyCta() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("zapis");
    if (!target) {
      setHidden(true);
      return;
    }
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px", threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    document.getElementById("zapis")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`sticky-cta${hidden ? " is-hidden" : ""}`}>
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
    </div>
  );
}
