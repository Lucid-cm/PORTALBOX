import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import MessageForm from "@/components/MessageForm";
import type { PortalUser } from "@/types";

export default async function LeaveMessagePage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: user } = await supabase
    .from("users")
    .select("id, full_name, slug")
    .eq("slug", params.slug)
    .eq("payment_status", "paid")
    .maybeSingle<Pick<PortalUser, "id" | "full_name" | "slug">>();

  if (!user) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-16">
        <Link href={`/${user.slug}`} className="text-sm text-muted hover:text-primary">
          ← Back to {user.full_name}&apos;s PortalBox
        </Link>
        <h1 className="mt-4 font-heading text-3xl font-semibold">
          Leave a memory for {user.full_name}
        </h1>
        <p className="mt-2 text-muted">
          Your message will be kept here forever, alongside everyone else who wished them well.
        </p>

        <div className="mt-8">
          <MessageForm userId={user.id} slug={user.slug} />
        </div>
      </section>
    </main>
  );
}
