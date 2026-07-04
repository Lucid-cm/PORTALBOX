import { createServiceClient } from "@/lib/supabase/server";

export async function markPaymentSuccessful(reference: string) {
  const supabase = createServiceClient();

  const { data: payment, error: paymentError } = await supabase
    .from("payments")
    .select("id, user_id, status")
    .eq("reference", reference)
    .maybeSingle();

  if (paymentError || !payment) {
    throw new Error("Payment record not found for this reference");
  }

  if (payment.status === "success") {
    // Already processed (e.g. both the callback and the webhook fired).
    return payment.user_id as string;
  }

  await supabase.from("payments").update({ status: "success" }).eq("id", payment.id);
  await supabase
    .from("users")
    .update({ payment_status: "paid" })
    .eq("id", payment.user_id);

  return payment.user_id as string;
}
