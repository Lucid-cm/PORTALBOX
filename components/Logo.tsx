import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-heading text-lg font-semibold tracking-tight text-primary ${className ?? ""}`}
    >
      Portal<span className="text-accent">Box</span>
    </Link>
  );
}
