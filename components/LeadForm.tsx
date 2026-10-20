"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { branches, site } from "@/lib/data";
import { IconArrow, IconCheck, IconPhone, IconWhatsapp } from "./Icons";

const CATEGORIES = ["B", "BC1", "C / D", "A / A1", "Не знаю"];
const TIMES = ["Любое", "Утро, 09:00–12:00", "День, 12:00–17:00", "Вечер, 17:00–20:00", "Выходные"];

type FormState = {
  name: string;
  phone: string;
  category: string;
  branch: string;
  time: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  phone: "",
  category: "B",
  branch: "any",
  time: "Любое",
  consent: false,
};

function formatPhone(value: string) {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  // Drop the +7 country code only when it is really present in the input,
  // otherwise backspacing a formatted number duplicates the leading 7.
  if (d.startsWith("7") && (value.trimStart().startsWith("+7") || d.length > 10)) {
    d = d.slice(1);
  }
  d = d.slice(0, 10);
  if (!d) return "";
  let out = "+7";
  if (d.length) out += " " + d.slice(0, 3);
  if (d.length > 3) out += " " + d.slice(3, 6);
  if (d.length > 6) out += " " + d.slice(6, 8);
  if (d.length > 8) out += " " + d.slice(8, 10);
  return out;
}

export default function LeadForm({
  compact = false,
  defaultBranch,
}: {
  compact?: boolean;
  defaultBranch?: string;
}) {
  const [form, setForm] = useState<FormState>({
    ...initial,
    branch: defaultBranch ?? initial.branch,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [waHref, setWaHref] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    const onPreset = (event: Event) => {
      const detail = (event as CustomEvent<{ category?: string; branch?: string }>).detail;
      if (!detail) return;
      setWaHref(null);
      setForm((prev) => ({
        ...prev,
        category: detail.category && CATEGORIES.includes(detail.category) ? detail.category : prev.category,
        branch: detail.branch ?? prev.branch,
      }));
      window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 450);
    };

    window.addEventListener("s1gma:preset", onPreset);
    return () => window.removeEventListener("s1gma:preset", onPreset);
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Укажите имя";
    if (form.phone.replace(/\D/g, "").length !== 11) next.phone = "Введите номер полностью";
    if (!form.consent) next.consent = "Нужно согласие на обработку данных";
    setErrors(next);
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      // Move focus to the first invalid control (aria-invalid is not in the DOM yet).
      if (next.name) nameRef.current?.focus();
      else if (next.phone) phoneRef.current?.focus();
      else if (next.consent) consentRef.current?.focus();
      return;
    }

    const branch = branches.find((b) => b.slug === form.branch);
    const message = [
      "Здравствуйте! Заявка с сайта S1gma.",
      `Имя: ${form.name.trim()}`,
      `Телефон: ${form.phone}`,
      `Категория: ${form.category}`,
      `Филиал: ${branch ? `${branch.address}, ${branch.detail}` : "подскажите ближайший"}`,
      `Удобное время: ${form.time}`,
    ].join("\n");

    const href = `${site.whatsapp}?text=${encodeURIComponent(message)}`;
    setWaHref(href);

    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (waHref) {
    return (
      <div className="form-card" id="lead-form">
        <div className="form-success" role="status">
          <span className="form-success__icon" aria-hidden="true">
            <IconCheck size={24} />
          </span>
          <p className="form-success__title">Сообщение готово</p>
          <p className="form-success__text">
            Открыли WhatsApp с заполненной заявкой — осталось нажать «Отправить». Если мессенджер
            не открылся, используйте кнопку ниже или позвоните.
          </p>
          <div className="form-success__actions">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <IconWhatsapp size={18} />
              Открыть WhatsApp
            </a>
            <a href={site.phoneHref} className="btn btn--outline">
              <IconPhone size={17} />
              Позвонить
            </a>
          </div>
          <button
            type="button"
            className="finder__back"
            onClick={() => setWaHref(null)}
            style={{ marginTop: 4 }}
          >
            Изменить данные
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card" id="lead-form">
      <div className="form-card__head">
        <p className="form-card__title">Записаться на консультацию</p>
        <p className="form-card__sub">
          Перезвоним в рабочее время, подберём категорию и филиал. Без навязывания.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="field-grid field-grid--2">
          <div className="field">
            <label className="field__label" htmlFor={`${id}-name`}>
              Имя
            </label>
            <input
              ref={nameRef}
              id={`${id}-name`}
              className="field__input"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Как к вам обращаться"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${id}-name-err` : undefined}
              required
            />
            {errors.name && (
              <p className="field__error" id={`${id}-name-err`}>
                {errors.name}
              </p>
            )}
          </div>

          <div className="field">
            <label className="field__label" htmlFor={`${id}-phone`}>
              Телефон
            </label>
            <input
              ref={phoneRef}
              id={`${id}-phone`}
              className="field__input"
              type="tel"
              maxLength={18}
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 700 000 00 00"
              value={form.phone}
              onChange={(e) => set("phone", formatPhone(e.target.value))}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
              required
            />
            {errors.phone && (
              <p className="field__error" id={`${id}-phone-err`}>
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="field-grid field-grid--2" style={{ marginTop: 12 }}>
          <div className="field">
            <label className="field__label" htmlFor={`${id}-cat`}>
              Категория
            </label>
            <select
              id={`${id}-cat`}
              className="field__select"
              name="category"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field__label" htmlFor={`${id}-branch`}>
              Филиал
            </label>
            <select
              id={`${id}-branch`}
              className="field__select"
              name="branch"
              value={form.branch}
              onChange={(e) => set("branch", e.target.value)}
            >
              {branches.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.address}
                </option>
              ))}
              <option value="any">Не важно — подскажите</option>
            </select>
          </div>
        </div>

        <div className="field" style={{ marginTop: 12 }}>
          <label className="field__label" htmlFor={`${id}-time`}>
            Удобное время
          </label>
          <select
            id={`${id}-time`}
            className="field__select"
            name="time"
            value={form.time}
            onChange={(e) => set("time", e.target.value)}
          >
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <label className="consent" style={{ marginTop: 16 }}>
          <input
            ref={consentRef}
            type="checkbox"
            name="consent"
            required
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${id}-consent-err` : undefined}
          />
          <span>
            Согласен на обработку персональных данных по{" "}
            <Link href="/politika-konfidencialnosti">политике конфиденциальности</Link>
          </span>
        </label>
        {errors.consent && (
          <p className="field__error" id={`${id}-consent-err`}>
            {errors.consent}
          </p>
        )}

        <button
          type="submit"
          className="btn btn--primary btn--block form-card__submit"
          style={{ marginTop: 16 }}
        >
          Отправить в WhatsApp
          <IconArrow size={17} />
        </button>

        <p className="form-card__note">
          {compact
            ? "Отправка откроет WhatsApp с готовым сообщением."
            : "Нажимая кнопку, вы открываете WhatsApp с готовым сообщением. Данные не сохраняются на сайте."}
        </p>
      </form>
    </div>
  );
}
