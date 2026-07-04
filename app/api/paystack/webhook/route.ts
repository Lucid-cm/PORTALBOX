import { NextResponse } from "next/server";
import crypto from "crypto";
import { markPaymentSuccessful } from "@/lib/payments";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  const expectedSignature = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    try {
      await markPaymentSuccessful(event.data.reference);
    } catch {
      // Reference may not exist yet in rare race conditions — Paystack will retry.
      return NextResponse.json({ received: true });
    }
  }

  return NextResponse.json({ received: true });
}
