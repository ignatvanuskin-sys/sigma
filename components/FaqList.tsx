"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/data";

export default function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="faq__list">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={item.q} className={`faq-item${isOpen ? " is-open" : ""}`}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={btnId}
                className="faq-item__btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <span className="faq-item__icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="faq-item__panel"
              inert={!isOpen}
            >
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
