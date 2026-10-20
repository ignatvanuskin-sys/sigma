"use client";

import type { ReactNode } from "react";

export default function BookButton({
  category,
  branch = "any",
  className = "btn btn--primary",
  children,
  ariaLabel,
}: {
  category: string;
  branch?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const onClick = () => {
    window.dispatchEvent(
      new CustomEvent("s1gma:preset", { detail: { category, branch } })
    );
    document.getElementById("zapis")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button type="button" className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
