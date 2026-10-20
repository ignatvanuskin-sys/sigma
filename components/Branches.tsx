"use client";

import { useState } from "react";
import Link from "next/link";
import BookButton from "./BookButton";
import { IconArrow, IconClock, IconPin } from "./Icons";
import { branches, site } from "@/lib/data";

export default function Branches() {
  const [active, setActive] = useState<string>(branches[0].slug);

  return (
    <div className="branches__grid">
      <div className="branch-map">
        <svg viewBox="0 0 800 520" aria-hidden="true" focusable="false">
          <rect width="800" height="520" fill="#17181b" rx="16" />

          <g stroke="rgba(245,243,239,0.1)" strokeWidth="30">
            <path d="M-40 118H840" />
            <path d="M-40 300H840" />
            <path d="M-40 442H840" />
            <path d="M182 -40V560" />
            <path d="M520 -40V560" />
            <path d="M700 -40V560" />
          </g>

          <g stroke="rgba(245,243,239,0.2)" strokeWidth="2" strokeDasharray="12 12">
            <path d="M-40 210H840" />
            <path d="M640 -40V560" />
          </g>

          <g fill="rgba(245,243,239,0.035)">
            <rect x="34" y="146" width="112" height="44" rx="5" />
            <rect x="212" y="140" width="64" height="52" rx="5" />
            <rect x="300" y="60" width="96" height="36" rx="5" />
            <rect x="392" y="146" width="88" height="40" rx="5" />
            <rect x="546" y="60" width="72" height="58" rx="5" />
            <rect x="726" y="146" width="58" height="44" rx="5" />
            <rect x="40" y="330" width="80" height="46" rx="5" />
            <rect x="228" y="330" width="104" height="40" rx="5" />
            <rect x="440" y="330" width="60" height="46" rx="5" />
            <rect x="620" y="352" width="86" height="42" rx="5" />
            <rect x="292" y="470" width="92" height="36" rx="5" />
            <rect x="600" y="474" width="72" height="34" rx="5" />
          </g>

          <path
            d="M-30 386C150 340 250 470 420 438S660 316 830 344"
            stroke="rgba(255,212,0,0.3)"
            strokeWidth="3"
            strokeDasharray="12 14"
            fill="none"
          />
          <path
            d="M-30 60C120 96 220 76 320 110S520 176 640 150"
            stroke="rgba(245,243,239,0.05)"
            strokeWidth="40"
            fill="none"
          />

          {branches.map((b, i) => {
            const isActive = active === b.slug;
            return (
              <g
                key={b.slug}
                transform={`translate(${b.pin.x}, ${b.pin.y})`}
                className={`map-pin${isActive ? " is-active" : ""}`}
                onMouseEnter={() => setActive(b.slug)}
              >
                {isActive && <circle r="30" fill="rgba(255,212,0,0.12)" />}
                <circle
                  r="17"
                  fill={isActive ? "#FFD400" : "#111214"}
                  stroke={isActive ? "#FFD400" : "rgba(245,243,239,0.55)"}
                  strokeWidth="2"
                />
                <text
                  textAnchor="middle"
                  dy="4.5"
                  fontSize="13"
                  fontWeight="700"
                  fill={isActive ? "#111214" : "#F5F3EF"}
                  fontFamily="Onest, sans-serif"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="branch-map__caption">
          <span>Схема филиалов · не в масштабе</span>
          <a
            href={site.twogis}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow"
            style={{ minHeight: 0, fontSize: "0.72rem", color: "var(--accent)" }}
          >
            Открыть в 2ГИС
            <IconArrow size={13} />
          </a>
        </div>
      </div>

      <div>
        <ul className="branch-list">
          {branches.map((b, i) => (
            <li key={b.slug}>
              <article
                className={`branch-card${active === b.slug ? " is-active" : ""}`}
                onMouseEnter={() => setActive(b.slug)}
                onFocus={() => setActive(b.slug)}
              >
                <div className="branch-card__head">
                  <span className="branch-card__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="branch-card__name">{b.short}</h3>
                </div>
                <p className="branch-card__addr">
                  <span className="sr-only">Адрес: </span>
                  {b.address}
                </p>
                <p className="branch-card__meta">
                  <span>{b.detail}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <IconClock size={13} />
                    {b.hours}
                  </span>
                </p>
                <div className="branch-card__actions">
                  <BookButton
                    category="Не знаю"
                    branch={b.slug}
                    className="link-arrow"
                    ariaLabel={`Выбрать филиал ${b.address}`}
                  >
                    Выбрать филиал
                    <IconArrow size={14} />
                  </BookButton>
                  <Link href={`/branchi/${b.slug}`} className="link-arrow">
                    <IconPin size={13} />
                    О филиале
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="branches__note">
          6 филиалов в Астане. На карте — четыре основных адреса. Записаться можно в любой:
          менеджер подскажет ближайший к вам.
        </p>
      </div>
    </div>
  );
}
