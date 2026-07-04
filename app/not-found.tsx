import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-28 text-center">
        <h1 className="font-heading text-3xl font-semibold">PortalBox not found</h1>
        <p className="mt-3 text-muted">
          This link doesn&apos;t exist, or the PortalBox hasn&apos;t been activated yet.
        </p>
        <Link href="/" className="mt-8 inline-block">
          <Button variant="primary">Back to home</Button>
        </Link>
      </section>
      <Footer />
    </main>
  );
}
