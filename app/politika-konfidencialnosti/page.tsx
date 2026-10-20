import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Как автошкола S1gma обрабатывает персональные данные, которые вы оставляете в форме на сайте.",
  alternates: { canonical: "/politika-konfidencialnosti" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Политика конфиденциальности</span>
          </nav>
          <h1 className="h1">Политика конфиденциальности</h1>
          <p className="hero__sub" style={{ marginTop: 16 }}>
            Как {site.legalName} обрабатывает данные, которые вы отправляете через сайт.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="prose">
            <h2>Какие данные мы получаем</h2>
            <p>
              Через форму на сайте вы оставляете имя, номер телефона, категорию обучения, филиал и
              удобное время для звонка. Другие данные сайт не запрашивает.
            </p>

            <h2>Зачем они нужны</h2>
            <p>
              Только для того, чтобы связаться с вами, ответить на вопросы и записать на
              консультацию или пробный урок. Рассылок без согласия мы не отправляем.
            </p>

            <h2>Куда уходят данные</h2>
            <p>
              Форма не отправляет данные на сервер сайта. При нажатии кнопки открывается WhatsApp
              с уже заполненным сообщением — вы отправляете его сами. Дальше переписка хранится в
              WhatsApp в соответствии с его правилами.
            </p>

            <h2>Согласие и отзыв</h2>
            <p>
              Отправляя форму, вы соглашаетесь на обработку данных для связи с вами. Отозвать
              согласие можно в любой момент: напишите или позвоните по контактам ниже — мы
              прекратим обработку и удалим переписку.
            </p>

            <h2>Сроки и защита</h2>
            <p>
              Данные хранятся столько, сколько нужно для записи и обучения. Доступ к ним есть
              только у сотрудников, которые работают с заявками.
            </p>

            <h2>Контакты</h2>
            <p>
              {site.legalName}, БИН {site.bin}, {site.city}, пр. Сарыарка, 15, офис 9.
              Телефон: {site.phoneDisplay}. Instagram: @s1gma.kz.
            </p>

            <div className="note-box" style={{ marginTop: 8 }}>
              Демо-версия: текст политики носит ознакомительный характер и перед публикацией
              требует проверки юристом и указания оператора персональных данных.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
