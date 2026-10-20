import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main">
      <section className="page-hero" style={{ minHeight: "70vh", display: "grid", alignItems: "center" }}>
        <div className="container">
          <p className="eyebrow">
            <span className="eyebrow__num">404</span>
            Страница не найдена
          </p>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "14ch" }}>
            Такой страницы нет
          </h1>
          <p className="hero__sub" style={{ marginTop: 16 }}>
            Возможно, ссылка устарела. Вернитесь на главную — там курсы, цены и филиалы.
          </p>
          <div className="page-hero__cta">
            <Link href="/" className="btn btn--primary">
              На главную
            </Link>
            <Link href="/#zapis" className="btn btn--ghost">
              Записаться
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
