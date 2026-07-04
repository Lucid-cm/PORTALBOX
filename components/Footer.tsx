import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted sm:flex-row">
        <Logo />
        <p>Built for graduates who don&apos;t want to forget.</p>
        <p>&copy; {new Date().getFullYear()} PortalBox</p>
      </div>
    </footer>
  );
}
