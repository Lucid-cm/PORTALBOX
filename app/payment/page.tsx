"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/paystack/initialize", { method: "POST" });
    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }

    window.location.href = data.authorization_url;
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="font-heading text-3xl font-semibold">Activate your PortalBox</h1>
        <p className="mt-3 text-muted">
          A one-time payment of <span className="font-semibold text-primary">₦500</span> unlocks
          your personal link, unlimited messages, and lifetime access to every memory you collect.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-white p-6 text-left shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">PortalBox activation</span>
            <span className="font-heading text-lg font-semibold">₦500</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>✓ Your personalized portalbox.ng link</li>
            <li>✓ Unlimited messages and memories</li>
            <li>✓ Lifetime access, forever</li>
          </ul>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        <Button
          onClick={handlePay}
          size="lg"
          variant="accent"
          disabled={loading}
          className="mt-8 w-full"
        >
          {loading ? "Redirecting to Paystack..." : "Pay ₦500 with Paystack"}
        </Button>
      </section>
    </main>
  );
}
