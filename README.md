# S1gma — сайт автошколы

Продающий сайт автошколы S1gma (Астана): модульное обучение, категории B, BC1, C, D, запись через WhatsApp без бэкенда.

## Стек

- Next.js 15.5 (App Router), React 19, TypeScript
- Обычный CSS (`app/globals.css`), без UI-библиотек
- Локальные шрифты Onest + Inter (`public/fonts`, woff2)
- `next/image`, статическая генерация всех страниц

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

Переменная окружения (необязательно): `NEXT_PUBLIC_SITE_URL` — канонический домен для metadata, sitemap, robots. По умолчанию `https://s1gma.info`.

## Структура

```text
app/
  page.tsx                        главная (9 секций)
  kategorii/[slug]/page.tsx       B, BC1, C/D
  branchi/[slug]/page.tsx         4 филиала
  politika-konfidencialnosti/     политика
  sitemap.ts, robots.ts, icon.svg
components/                       Header, Hero, CourseFinder, CourseCard,
                                  Advantages, Steps, Branches, Reviews,
                                  FaqList, LeadForm, Footer, StickyCta, Rail
lib/
  data.ts                         курсы, филиалы, отзывы, FAQ, контакты
  category-content.ts             контент страниц категорий
  schema.ts                       JSON-LD (DrivingSchool, Course, FAQPage)
```

## Заявки

Бэкенда нет: форма валидирует имя, телефон (+7, маска) и согласие, затем открывает WhatsApp с готовым сообщением. Номер и текст — в `lib/data.ts` и `components/LeadForm.tsx`.

## Данные, требующие подтверждения

- Часы работы филиалов (`site.hours`, `branches[].hours`).
- Адреса 2 из 6 филиалов — в `lib/data.ts` только 4.
- Цены категорий C, D и A/A1 — «по запросу», в брифе их не было.
- Темы 10 модулей — демо-контент под финальную программу.
- Фотографии в `public/images` сгенерированы ИИ, заменить на реальную съёмку.
- Текст политики конфиденциальности требует юридической проверки.

## Проверки

- Lighthouse mobile: 94 / 100 / 100 / 100 (performance / accessibility / best-practices / SEO).
- axe-core: 0 нарушений на главной и странице категории.
- Горизонтального скролла нет на 320–1920.
- Подробный отчёт: [AUDIT.md](AUDIT.md).

Скрипты аудита (`scripts/audit.mjs`, `edge-check.mjs`, `focus-check.mjs`, `mobile-metrics.mjs`) запускаются против `http://localhost:3100` и требуют установленный Chrome.
