import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-muted hover:text-primary sm:block"
          >
            Log in
          </Link>
          <Link href="/create">
            <Button variant="primary" size="md">
              Create My PortalBox
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
