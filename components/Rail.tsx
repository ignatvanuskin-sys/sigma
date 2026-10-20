"use client";

import { useEffect, useState } from "react";

const items = [
  { id: "podbor", label: "Подбор курса" },
  { id: "prices", label: "Курсы и цены" },
  { id: "why", label: "Почему S1gma" },
  { id: "process", label: "Как проходит обучение" },
  { id: "branches", label: "Филиалы" },
  { id: "reviews", label: "Отзывы" },
  { id: "faq", label: "Вопросы" },
  { id: "zapis", label: "Запись" },
];

export default function Rail() {
  const [active, setActive] = useState<string>("");
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            setOnDark(Boolean(entry.target.closest(".section--dark, .lead-section, .hero")));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      if (window.scrollY < 240) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className={`rail${onDark ? " rail--on-dark" : ""}`} aria-label="Разделы страницы">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`rail__dot${active === item.id ? " is-active" : ""}`}
          aria-label={item.label}
          title={item.label}
        />
      ))}
    </nav>
  );
}
