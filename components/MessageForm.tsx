"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "./Button";

const RELATIONSHIPS = [
  "Family",
  "Friend",
  "Coursemate",
  "Lecturer",
  "Mentor",
  "Well-wisher",
];

export default function MessageForm({ userId, slug }: { userId: string; slug: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [senderName, setSenderName] = useState("");
  const [relationship, setRelationship] = useState(RELATIONSHIPS[1]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!senderName.trim() || !message.trim()) {
      setError("Please add your name and a message.");
      return;
    }

    setLoading(true);
    const { error: insertError } = await supabase.from("messages").insert({
      user_id: userId,
      sender_name: senderName.trim(),
      relationship,
      message: message.trim(),
    });
    setLoading(false);

    if (insertError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    router.push(`/${slug}?sent=1`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-primary">
          Your name
        </label>
        <input
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          placeholder="e.g. Aisha Bello"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-primary">
          You are their
        </label>
        <div className="flex flex-wrap gap-2">
          {RELATIONSHIPS.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setRelationship(option)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                relationship === option
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-muted hover:border-primary/40"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-primary">
          Your message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Share a memory, a wish, or just say congrats..."
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Leave my message"}
      </Button>
    </form>
  );
}
