"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { IconArrow, IconWhatsapp } from "./Icons";
import { site } from "@/lib/data";

const nav = [
  { href: "/#categories", label: "Категории" },
  { href: "/#prices", label: "Цены" },
  { href: "/#branches", label: "Филиалы" },
  { href: "/#reviews", label: "Отзывы" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
        <div className="container header__inner">
          <Logo />

          <nav className="nav" aria-label="Основная навигация">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="nav__link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <a href={site.phoneHref} className="header__phone">
              {site.phoneDisplay}
            </a>
            <Link href="/#zapis" className="btn btn--primary btn--sm">
              Записаться
            </Link>
          </div>

          <button
            type="button"
            className="burger"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="burger__lines" />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="mobile-menu__nav" aria-label="Мобильная навигация">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-menu__link"
              onClick={() => setOpen(false)}
            >
              {item.label}
              <span>{String(i + 1).padStart(2, "0")}</span>
            </Link>
          ))}
          <Link href="/#zapis" className="mobile-menu__link" onClick={() => setOpen(false)}>
            Записаться
            <span>05</span>
          </Link>
        </nav>

        <div className="mobile-menu__footer">
          <a href={site.phoneHref} className="mobile-menu__phone">
            {site.phoneDisplay}
          </a>
          <div className="mobile-menu__meta">
            <span>{site.city}</span>
            <span>Пн–Сб, 09:00–20:00</span>
          </div>
          <a
            href={site.whatsapp}
            className="btn btn--primary btn--block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsapp size={18} />
            Написать в WhatsApp
            <IconArrow size={16} />
          </a>
        </div>
      </div>
    </>
  );
}
