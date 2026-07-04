import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import MessageCard from "@/components/MessageCard";
import type { PortalMessage, PortalUser } from "@/types";

export default async function PortalBoxPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { sent?: string };
}) {
  const supabase = createClient();

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("slug", params.slug)
    .eq("payment_status", "paid")
    .maybeSingle<PortalUser>();

  if (!user) {
    notFound();
  }

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<PortalMessage[]>();

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 pt-16 pb-10 text-center">
        {searchParams.sent === "1" && (
          <p className="mx-auto mb-6 inline-block rounded-full bg-success/10 px-4 py-2 text-sm font-medium text-success">
            Your message was added to {user.full_name}&apos;s PortalBox 🎓
          </p>
        )}

        <Reveal>
          <h1 className="font-heading text-4xl font-semibold sm:text-5xl">
            {user.full_name}&apos;s PortalBox
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-muted">
            {user.department} &middot; {user.school} &middot; Class of {user.graduation_year}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Link href={`/${user.slug}/message`} className="mt-7 inline-block">
            <Button variant="accent" size="lg">
              Leave a memory
            </Button>
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        {!messages || messages.length === 0 ? (
          <p className="mt-10 text-center text-muted">
            No memories yet — be the first to leave one.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
