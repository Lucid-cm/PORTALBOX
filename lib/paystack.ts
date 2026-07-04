const PAYSTACK_BASE_URL = "https://api.paystack.co";

interface InitializeParams {
  email: string;
  amount: number; // in kobo
  reference: string;
  callback_url: string;
  metadata?: Record<string, unknown>;
}

export async function initializeTransaction(params: InitializeParams) {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || "Could not initialize Paystack transaction");
  }
  return data.data as { authorization_url: string; access_code: string; reference: string };
}

export async function verifyTransaction(reference: string) {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || "Could not verify Paystack transaction");
  }
  return data.data as { status: string; reference: string; amount: number; customer: { email: string } };
}
