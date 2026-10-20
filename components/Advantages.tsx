import type { CSSProperties } from "react";
import { advantages } from "@/lib/data";

export default function Advantages() {
  return (
    <div className="advantages__grid">
      {advantages.map((item, i) => (
        <article
          key={item.title}
          className="advantage"
          data-reveal
          style={{ "--delay": `${i * 60}ms` } as CSSProperties}
        >
          <p className="advantage__value">
            {item.value}
            {item.unit && <span className="advantage__unit">{item.unit}</span>}
          </p>
          <h3 className="advantage__title">{item.title}</h3>
          <p className="advantage__text">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
