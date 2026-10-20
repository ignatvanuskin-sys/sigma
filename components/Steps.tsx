import type { CSSProperties } from "react";
import { steps } from "@/lib/data";

export default function Steps() {
  return (
    <>
      <ol className="steps">
        {steps.map((step, i) => (
          <li
            key={step.n}
            className="step"
            data-reveal
            style={{ "--delay": `${i * 70}ms` } as CSSProperties}
          >
            <span className="step__n" aria-hidden="true">
              {step.n}
            </span>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__text">{step.text}</p>
            <span className="step__meta">{step.meta}</span>
          </li>
        ))}
      </ol>
      <p className="steps__note">
        Сроки не фиксируем заранее: программа идёт модулями, вы выбираете темп. Оплата — по курсу,
        рассрочка без процентов.
      </p>
    </>
  );
}
