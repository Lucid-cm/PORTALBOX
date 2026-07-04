import { redirect } from "next/navigation";
import { verifyTransaction } from "@/lib/paystack";
import { markPaymentSuccessful } from "@/lib/payments";

export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: { reference?: string };
}) {
  const reference = searchParams.reference;

  if (!reference) {
    redirect("/payment?error=missing_reference");
  }

  let outcome: "success" | "failed" | "error" = "error";

  try {
    const transaction = await verifyTransaction(reference as string);
    if (transaction.status === "success") {
      await markPaymentSuccessful(reference as string);
      outcome = "success";
    } else {
      outcome = "failed";
    }
  } catch {
    outcome = "error";
  }

  if (outcome === "success") {
    redirect("/dashboard?welcome=1");
  }

  if (outcome === "failed") {
    redirect("/payment?error=payment_failed");
  }

  redirect("/payment?error=verification_failed");
}
