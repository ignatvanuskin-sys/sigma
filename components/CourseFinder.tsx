"use client";

import { useState } from "react";
import { branches, courses, formatPrice, site } from "@/lib/data";
import { IconArrow, IconWhatsapp } from "./Icons";

type Cat = "B" | "BC1" | "CD" | "A" | "unknown";
type Fmt = "offline" | "online";

const categoryOptions: { value: Cat; title: string; desc: string; price: string }[] = [
  { value: "B", title: "Категория B", desc: "Легковой автомобиль", price: "90 000 ₸" },
  { value: "BC1", title: "Категория BC1", desc: "Легковой с прицепом", price: "110 000 ₸" },
  { value: "CD", title: "C и D", desc: "Грузовик, автобус, с прицепом", price: "по запросу" },
  { value: "A", title: "A и A1", desc: "Мотоцикл", price: "по запросу" },
  { value: "unknown", title: "Не знаю", desc: "Подскажите, что подойдёт", price: "" },
];

const formatOptions: { value: Fmt; title: string; desc: string }[] = [
  { value: "offline", title: "Офлайн", desc: "Теория в филиале, в группе" },
  { value: "online", title: "Онлайн", desc: "Теория из дома, вождение — на площадке" },
];

function pickCourse(cat: Cat, fmt: Fmt | null) {
  if (cat === "B") return courses.find((c) => c.slug === (fmt === "online" ? "b-online" : "b")) ?? null;
  if (cat === "BC1") return courses.find((c) => c.slug === (fmt === "online" ? "bc1-online" : "bc1")) ?? null;
  return null;
}

function preset(category: string, branch: string) {
  window.dispatchEvent(
    new CustomEvent("s1gma:preset", { detail: { category, branch } })
  );
  document.getElementById("zapis")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CourseFinder() {
  const [step, setStep] = useState(0);
  const [cat, setCat] = useState<Cat | null>(null);
  const [fmt, setFmt] = useState<Fmt | null>(null);
  const [br, setBr] = useState<string | null>(null);

  const course = cat ? pickCourse(cat, fmt) : null;
  const branch = branches.find((b) => b.slug === br);

  const categoryForForm =
    cat === "B" ? "B" : cat === "BC1" ? "BC1" : cat === "CD" ? "C / D" : cat === "A" ? "A / A1" : "Не знаю";

  const waText = course
    ? `Здравствуйте! Интересует «${course.title}»${
        course.price ? ` (${formatPrice(course.price)} ₸)` : ""
      }. Филиал: ${branch ? branch.address : "любой"}. Подскажите, как записаться.`
    : `Здравствуйте! Помогите подобрать категорию обучения. Филиал: ${
        branch ? branch.address : "любой"
      }.`;

  const waLink = `${site.whatsapp}?text=${encodeURIComponent(waText)}`;

  const goBack = () => {
    if (step === 3) {
      setStep(cat === "B" || cat === "BC1" ? 2 : 0);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const reset = () => {
    setStep(0);
    setCat(null);
    setFmt(null);
    setBr(null);
  };

  const stepLabel = step === 3 ? "Готово" : `Шаг ${step + 1} из 3`;

  return (
    <div className="finder__panel" id="finder-panel">
      <div className="finder__panel-head">
        <p className="finder__q" aria-live="polite">
          {step === 0 && "Какая категория нужна?"}
          {step === 1 && "Как удобнее учиться?"}
          {step === 2 && "Ближе какой филиал?"}
          {step === 3 && "Ваш вариант"}
        </p>
        <span className="finder__counter">{stepLabel}</span>
      </div>

      {step === 0 && (
        <div className="finder__options">
          {categoryOptions.map((opt) => (
            <label key={opt.value} className="opt">
              <input
                type="radio"
                name="finder-category"
                value={opt.value}
                checked={cat === opt.value}
                onChange={() => {
                  setCat(opt.value);
                  setStep(opt.value === "B" || opt.value === "BC1" ? 1 : 3);
                }}
              />
              <span className="opt__mark" aria-hidden="true" />
              <span className="opt__body">
                <span className="opt__title">{opt.title}</span>
                <span className="opt__desc">{opt.desc}</span>
              </span>
              {opt.price && <span className="opt__price">{opt.price}</span>}
            </label>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="finder__options finder__options--2">
          {formatOptions.map((opt) => (
            <label key={opt.value} className="opt">
              <input
                type="radio"
                name="finder-format"
                value={opt.value}
                checked={fmt === opt.value}
                onChange={() => {
                  setFmt(opt.value);
                  setStep(2);
                }}
              />
              <span className="opt__mark" aria-hidden="true" />
              <span className="opt__body">
                <span className="opt__title">{opt.title}</span>
                <span className="opt__desc">{opt.desc}</span>
              </span>
            </label>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="finder__options">
          {branches.map((b) => (
            <label key={b.slug} className="opt">
              <input
                type="radio"
                name="finder-branch"
                value={b.slug}
                checked={br === b.slug}
                onChange={() => {
                  setBr(b.slug);
                  setStep(3);
                }}
              />
              <span className="opt__mark" aria-hidden="true" />
              <span className="opt__body">
                <span className="opt__title">{b.address}</span>
                <span className="opt__desc">{b.detail}</span>
              </span>
            </label>
          ))}
          <label className="opt">
            <input
              type="radio"
              name="finder-branch"
              value="any"
              checked={br === "any"}
              onChange={() => {
                setBr("any");
                setStep(3);
              }}
            />
            <span className="opt__mark" aria-hidden="true" />
            <span className="opt__body">
              <span className="opt__title">Не важно</span>
              <span className="opt__desc">Выберите сами — ближе к работе или дому</span>
            </span>
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="finder__result">
          <div className="finder__result-top">
            <div>
              <p className="finder__result-label">Рекомендация</p>
              <p className="finder__result-name">
                {course ? course.title : cat === "CD" ? "Грузовые и автобусные категории" : cat === "A" ? "Категории A и A1" : "Подберём на консультации"}
              </p>
            </div>
            <p className="finder__result-price">
              {course && course.price ? (
                <>
                  {formatPrice(course.price)}
                  <small> ₸</small>
                </>
              ) : (
                <span style={{ fontSize: "0.55em", letterSpacing: "-0.02em" }}>по запросу</span>
              )}
            </p>
          </div>

          <ul className="finder__result-list">
            {course ? (
              course.includes.slice(0, 4).map((item) => <li key={item}>{item}</li>)
            ) : (
              <>
                <li>
                  {cat === "CD"
                    ? "Категории C, C1, C1E, CE, D, D1, DE — программа и стоимость по запросу"
                    : cat === "A"
                      ? "Категории A и A1 — программа и стоимость по запросу"
                      : "Подберём категорию под вашу задачу"}
                </li>
                <li>Модульная теория и практика с инструктором</li>
                <li>Филиал подберём рядом с работой</li>
              </>
            )}
            {branch && <li>Филиал: {branch.address}, {branch.detail}</li>}
          </ul>

          <div className="finder__result-actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => preset(categoryForForm, br ?? "any")}
            >
              Записаться
              <IconArrow size={17} />
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              <IconWhatsapp size={18} />
              WhatsApp
            </a>
          </div>

          <p className="finder__note">
            Цена фиксированная, рассрочка 0%. Оплата — в филиале или онлайн.
          </p>
        </div>
      )}

      <div className="finder__nav">
        {step > 0 ? (
          <button type="button" className="finder__back" onClick={goBack}>
            <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
              <IconArrow size={15} />
            </span>
            Назад
          </button>
        ) : (
          <span />
        )}
        {step === 3 && (
          <button type="button" className="finder__back" onClick={reset}>
            Начать заново
          </button>
        )}
      </div>
    </div>
  );
}
