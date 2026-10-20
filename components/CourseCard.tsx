import Link from "next/link";
import BookButton from "./BookButton";
import { IconArrow } from "./Icons";
import { formatPrice, type Course } from "@/lib/data";

const detailHref: Record<Course["category"], string> = {
  B: "/kategorii/b",
  BC1: "/kategorii/bc1",
  "C/D": "/kategorii/c-d",
  A: "/kategorii/b",
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className={`course${course.accent ? " course--accent" : ""}`}>
      <div className="course__top">
        <span className="course__code">{course.code}</span>
        {course.tag && <span className="course__tag">{course.tag}</span>}
      </div>

      <h3 className="course__title">{course.title}</h3>
      <p className="course__summary">{course.summary}</p>

      <p className="course__price">
        <span className="course__price-num">
          {course.price ? formatPrice(course.price) : course.priceLabel}
        </span>
        {course.price && <span className="course__price-cur">₸</span>}
      </p>
      {course.priceNote && <p className="course__price-note">{course.priceNote}</p>}

      <ul className="course__list">
        {course.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="course__actions">
        <BookButton
          category={course.category === "C/D" ? "C / D" : course.category}
          className="btn btn--primary btn--sm"
          ariaLabel={`Записаться на ${course.title}`}
        >
          Записаться
        </BookButton>
        <Link
          href={detailHref[course.category]}
          className="course__more"
          aria-label={`Подробнее: ${course.title}`}
        >
          <IconArrow size={16} />
        </Link>
      </div>
    </article>
  );
}
