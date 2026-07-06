import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MessageCard from "@/components/MessageCard";
import CopyLinkButton from "@/components/CopyLinkButton";
import type { PortalMessage, PortalUser } from "@/types";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { welcome?: string };
}) {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", authData.user.id)
    .maybeSingle<PortalUser>();

  if (!profile) {
    redirect("/create");
  }

  if (profile.payment_status !== "paid") {
    redirect("/payment");
  }

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })
    .returns<PortalMessage[]>();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const portalUrl = `${siteUrl}/${profile.slug}`;

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12">
        {searchParams.welcome === "1" && (
          <p className="mb-6 rounded-xl bg-success/10 px-4 py-3 text-sm font-medium text-success">
            Your PortalBox is live! Share your link below to start collecting memories.
          </p>
        )}

        <h1 className="font-heading text-3xl font-semibold">Hi, {profile.full_name} 👋</h1>
        <p className="mt-1 text-muted">
          {messages?.length ?? 0} {messages?.length === 1 ? "memory" : "memories"} collected so far.
        </p>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Your PortalBox link
            </p>
            <Link
              href={`/${profile.slug}`}
              className="block truncate font-medium text-primary hover:underline"
            >
              {portalUrl}
            </Link>
          </div>
          <CopyLinkButton url={portalUrl} />
        </div>

        <h2 className="mt-12 font-heading text-xl font-semibold">Your memories</h2>

        {!messages || messages.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-muted">
            No memories yet. Share your link so people can start leaving them.
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {messages.map((message) => (
           <div key={message.id} className="relative">
  <MessageCard message={message} />
  <form action={async () => {
    "use server";
    const { revalidatePath } = await import("next/cache");
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();
    await supabase.from("messages").delete().eq("id", message.id);
    revalidatePath("/dashboard");
  }}>
    <button
      type="submit"
      className="absolute top-3 right-3 bg-white border border-border rounded-full px-3 py-1 text-xs text-red-500 hover:bg-red-50"
    >
      Delete
    </button>
  </form>
</div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
