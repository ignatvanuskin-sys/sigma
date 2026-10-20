import Link from "next/link";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="logo">
      <span className="logo__row">
        S<span className="logo__bar">1</span>GMA
      </span>
      <span className="logo__sub">Автошкола · Астана</span>
    </Link>
  );
}
