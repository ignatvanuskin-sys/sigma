import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import Hero from "@/components/Hero";
import CourseFinder from "@/components/CourseFinder";
import CourseCard from "@/components/CourseCard";
import Advantages from "@/components/Advantages";
import Steps from "@/components/Steps";
import Branches from "@/components/Branches";
import Reviews from "@/components/Reviews";
import FaqList from "@/components/FaqList";
import LeadForm from "@/components/LeadForm";
import Rail from "@/components/Rail";
import JsonLd from "@/components/JsonLd";
import BookButton from "@/components/BookButton";
import { IconArrow, IconClock, IconWhatsapp } from "@/components/Icons";
import { categories, courses, faq, site } from "@/lib/data";
import { courseSchema, faqSchema, localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Автошкола S1gma в Астане — права категории B и BC1",
  description:
    "Права категории B в Астане без зубрёжки: 10 модулей по часу, старт в любой день, 5 вождений. B — 90 000 ₸, BC1 — 110 000 ₸. Рассрочка 0%, 4.9 в 2ГИС.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          faqSchema(),
          ...courses.filter((c) => c.price).map((c) => courseSchema(c)),
        ]}
      />

      <main id="main">
        <Hero />
        <Rail />

        {/* 01 — подбор курса */}
        <section className="section section--paper" id="podbor" aria-labelledby="podbor-title">
          <div className="container">
            <div className="finder__grid">
              <div className="finder__aside">
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">01</span>
                  Подбор курса
                </p>
                <h2 className="h2" id="podbor-title" data-reveal>
                  Три вопроса — и видно цену
                </h2>
                <p className="lead" data-reveal>
                  Выберите категорию, формат и филиал. Покажем курс, стоимость и что входит.
                  Записаться можно сразу — без звонка.
                </p>
                <ul className="finder__result-list" data-reveal>
                  <li>20 секунд, без регистрации</li>
                  <li>Цены из прайса, а не «от»</li>
                  <li>Ответ сразу уходит в WhatsApp</li>
                </ul>
              </div>

              <CourseFinder />
            </div>
          </div>
        </section>

        {/* 02 — категории и цены */}
        <section className="section section--paper" id="prices" aria-labelledby="prices-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">02</span>
                  Курсы и цены
                </p>
                <h2 className="h2" id="prices-title" data-reveal>
                  Фиксированная цена. Без «доплатите за вождение»
                </h2>
              </div>
              <p className="lead" data-reveal>
                В стоимость уже входят тесты ПДД, часы преподавателя и вождения. Рассрочка — 0%,
                внутренний экзамен — бесплатно.
              </p>
            </div>

            <div id="categories" style={{ marginBottom: 28 }}>
              <p
                className="muted"
                style={{ marginBottom: 12, fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Все категории
              </p>
              <div className="chips">
                {categories.map((category) =>
                  category.href ? (
                    <Link key={category.code} href={category.href} className="chip">
                      <span className="chip__code">{category.code}</span>
                      {category.label}
                    </Link>
                  ) : (
                    <BookButton
                      key={category.code}
                      category={category.group === "A" ? "A / A1" : category.group === "C/D" ? "C / D" : "B"}
                      className="chip"
                    >
                      <span className="chip__code">{category.code}</span>
                      {category.label}
                    </BookButton>
                  )
                )}
              </div>
            </div>

            <div className="courses__grid">
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>

            <div className="courses__foot">
              <p className="courses__foot-text">
                Рассрочка без процентов на все курсы. Скидка на медсправку 073 и мерч — при записи.
                Цены указаны в тенге.
              </p>
              <BookButton category="Не знаю" className="btn btn--outline btn--sm">
                Не знаю, что выбрать
                <IconArrow size={16} />
              </BookButton>
            </div>
          </div>
        </section>

        {/* 03 — почему */}
        <section className="section section--dark" id="why" aria-labelledby="why-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">03</span>
                  Почему S1gma
                </p>
                <h2 className="h2" id="why-title" data-reveal>
                  Модули вместо потока
                </h2>
              </div>
              <p className="lead" data-reveal>
                Школа работает с 2007 года. Вместо «догнать группу» — десять независимых модулей:
                берёте в любом порядке и в любые дни.
              </p>
            </div>

            <Advantages />
          </div>
        </section>

        {/* 04 — как проходит обучение */}
        <section className="section section--paper" id="process" aria-labelledby="process-title">
          <div className="container">
            <div className="process__top">
              <div className="process__media" data-reveal>
                <Image
                  src="/images/classroom.webp"
                  alt="Учебный класс автошколы: разметка на полу и схема перекрёстка на экране"
                  width={1600}
                  height={1067}
                  sizes="(min-width: 1000px) 45vw, 100vw"
                />
                <p className="process__caption">
                  <IconClock size={14} />
                  Модуль — один час. Дальше — ваш темп.
                </p>
              </div>

              <div className="process__copy">
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">04</span>
                  Как проходит обучение
                </p>
                <h2 className="h2" id="process-title" data-reveal>
                  Четыре шага до экзамена
                </h2>
                <p className="lead" data-reveal>
                  Без привязки к потоку и без обещаний «сдадите с первого раза». Программу
                  проходите вы — школа даёт модули, инструктора и практику.
                </p>
                <div className="chips" data-reveal style={{ marginTop: 4 }}>
                  <span className="chip">10 модулей</span>
                  <span className="chip">5 вождений</span>
                  <span className="chip">2 языка</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <Steps />
            </div>
          </div>
        </section>

        {/* 05 — филиалы */}
        <section className="section section--soft" id="branches" aria-labelledby="branches-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">05</span>
                  Филиалы
                </p>
                <h2 className="h2" id="branches-title" data-reveal>
                  Четыре адреса в Астане
                </h2>
              </div>
              <p className="lead" data-reveal>
                Сарыарка, Туркестан, Сауран, Сатпаева. Выберите ближний к дому или работе — запишем
                сразу в него.
              </p>
            </div>

            <Branches />
          </div>
        </section>

        {/* 06 — отзывы */}
        <section className="section section--dark" id="reviews" aria-labelledby="reviews-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>
                <span className="eyebrow__num">06</span>
                Отзывы
              </p>
              <h2 className="h2" id="reviews-title" data-reveal style={{ maxWidth: "18ch" }}>
                Что говорят ученики
              </h2>
            </div>

            <Reviews />
          </div>
        </section>

        {/* 07 — FAQ */}
        <section className="section section--paper" id="faq" aria-labelledby="faq-title">
          <div className="container">
            <div className="faq__grid">
              <div className="faq__aside">
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">07</span>
                  Вопросы
                </p>
                <h2 className="h2" id="faq-title" data-reveal>
                  Отвечаем до записи
                </h2>
                <p className="lead" data-reveal>
                  Возраст, документы, медсправка, пропуски, рассрочка и язык. Если ответа нет —
                  напишите в WhatsApp.
                </p>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm"
                  style={{ justifySelf: "start" }}
                >
                  <IconWhatsapp size={17} />
                  Задать вопрос
                </a>
              </div>

              <FaqList items={faq} />
            </div>
          </div>
        </section>

        {/* 08 — форма */}
        <section className="section lead-section" id="zapis" aria-labelledby="zapis-title">
          <div className="container">
            <div className="lead__grid">
              <div className="lead__aside">
                <p className="eyebrow" data-reveal>
                  <span className="eyebrow__num">08</span>
                  Запись
                </p>
                <h2 className="h2" id="zapis-title" data-reveal>
                  Записаться на консультацию
                </h2>
                <p className="lead" data-reveal>
                  Оставьте имя и телефон — перезвоним в рабочее время, подберём курс и филиал.
                  Или напишите в WhatsApp, так быстрее.
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
                  <a href={site.phoneHref} className="lead__contact">
                    <span className="lead__contact-label">Телефон</span>
                    <span className="lead__contact-value">{site.phoneDisplay}</span>
                  </a>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lead__contact"
                  >
                    <span className="lead__contact-label">Instagram</span>
                    <span className="lead__contact-value">@s1gma.kz</span>
                  </a>
                  <div className="lead__contact" style={{ borderBottom: 0 }}>
                    <span className="lead__contact-label">Приём</span>
                    <span className="lead__contact-value">{site.hours}</span>
                  </div>
                </div>
              </div>

              <LeadForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
