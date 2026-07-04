import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { initializeTransaction } from "@/lib/paystack";
import { generatePaymentReference } from "@/lib/utils";

const ACTIVATION_FEE_KOBO = 50000; // ₦500

export async function POST() {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const serviceClient = createServiceClient();
  const { data: profile } = await serviceClient
    .from("users")
    .select("id, email, payment_status")
    .eq("id", authData.user.id)
    .maybeSingle();

  if (!profile) {
    return NextResponse.json({ error: "Create your PortalBox profile first" }, { status: 400 });
  }

  if (profile.payment_status === "paid") {
    return NextResponse.json({ error: "Already paid" }, { status: 400 });
  }

  const reference = generatePaymentReference();

  await serviceClient.from("payments").insert({
    user_id: profile.id,
    amount: ACTIVATION_FEE_KOBO,
    status: "pending",
    reference,
  });

  try {
    const transaction = await initializeTransaction({
      email: profile.email,
      amount: ACTIVATION_FEE_KOBO,
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/callback`,
      metadata: { user_id: profile.id },
    });

    return NextResponse.json({ authorization_url: transaction.authorization_url });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Payment initialization failed" },
      { status: 500 }
    );
  }
}
