import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-20">
        <h1 className="font-heading text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-muted">Log in to view your PortalBox dashboard.</p>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}
