import { NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/paystack";
import { markPaymentSuccessful } from "@/lib/payments";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  try {
    const transaction = await verifyTransaction(reference);

    if (transaction.status !== "success") {
      return NextResponse.json({ status: "failed" });
    }

    const userId = await markPaymentSuccessful(reference);

    const supabase = createServiceClient();
    const { data: profile } = await supabase
      .from("users")
      .select("slug")
      .eq("id", userId)
      .single();

    return NextResponse.json({ status: "success", slug: profile?.slug });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Verification failed" },
      { status: 500 }
    );
  }
}
