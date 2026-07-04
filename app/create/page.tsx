"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

const YEARS = Array.from({ length: 6 }, (_, i) => String(new Date().getFullYear() - i));

export default function CreatePage() {
  const router = useRouter();
  const supabase = createClient();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [graduationYear, setGraduationYear] = useState(YEARS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/signup");
        return;
      }

      const { data: existingProfile } = await supabase
        .from("users")
        .select("slug, payment_status")
        .eq("id", data.user.id)
        .maybeSingle();

      if (existingProfile?.payment_status === "paid") {
        router.push("/dashboard");
        return;
      }

      if (existingProfile?.slug) {
        router.push("/payment");
        return;
      }

      setFullName(data.user.email?.split("@")[0] ?? "");
      setCheckingAuth(false);
    }
    checkAuth();
  }, [router, supabase]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !school.trim() || !department.trim()) {
      setError("Please fill in every field.");
      return;
    }

    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      router.push("/signup");
      return;
    }

    const slug = slugify(fullName);

    const { error: insertError } = await supabase.from("users").insert({
      id: userData.user.id,
      full_name: fullName.trim(),
      email: userData.user.email,
      school: school.trim(),
      department: department.trim(),
      graduation_year: graduationYear,
      slug,
      payment_status: "pending",
    });

    setLoading(false);

    if (insertError) {
      setError("Could not create your PortalBox. Please try again.");
      return;
    }

    router.push("/payment");
  }

  if (checkingAuth) {
    return (
      <main>
        <Navbar />
        <div className="px-6 py-24 text-center text-muted">Loading...</div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-20">
        <h1 className="font-heading text-3xl font-semibold">Set up your PortalBox</h1>
        <p className="mt-2 text-muted">Step 2 of 2 — tell us a little about your journey.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium">Full name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
              placeholder="e.g. Lucy Idris"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">School</label>
            <input
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
              placeholder="e.g. University of Lagos"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Department</label>
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
              placeholder="e.g. Computer Science"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Graduation year</label>
            <select
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Continue to payment — ₦500"}
          </Button>
        </form>
      </section>
    </main>
  );
}
