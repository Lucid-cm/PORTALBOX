# PortalBox

**Your graduation lasts a day. The memories should last forever.**

A graduation memory capsule. Graduates pay ₦500 once to activate a personal
PortalBox; friends, family, lecturers and mentors leave free messages on it,
forever.

---

## 1. Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- Supabase (Postgres + Auth + RLS)
- Paystack (one-time ₦500 charge)
- Vercel (hosting)

## 2. Project structure2

```
app/
  page.tsx                  Landing page
  signup/page.tsx           Step 1: create account
  login/page.tsx            Login
  create/page.tsx           Step 2: graduate profile (name, school, dept, year)
  payment/page.tsx          ₦500 Paystack checkout
  payment/callback/page.tsx Paystack redirect target — verifies + activates
  [slug]/page.tsx           Public PortalBox (the memory wall)
  [slug]/message/page.tsx   Visitor "leave a memory" form
  dashboard/page.tsx        Graduate's private dashboard
  api/paystack/initialize   Starts a Paystack transaction
  api/paystack/verify       Verifies a transaction by reference
  api/paystack/webhook      Paystack server-to-server confirmation (source of truth)
components/                 Button, Navbar, Footer, MessageCard, MessageForm, etc.
lib/                        Supabase clients, Paystack client, payment helper, utils
supabase/schema.sql         Full database schema + Row Level Security policies
```

## 3. Set up Supabase (10 minutes)

1. Create a project at supabase.com.
2. Go to **SQL Editor → New query**, paste the contents of `supabase/schema.sql`,
   and run it. This creates the `users`, `messages`, and `payments` tables with
   Row Level Security already locked down correctly:
   - Anyone can read a graduate's public profile and messages (needed for the
     public PortalBox page).
   - Anyone can insert a message (visitors never log in).
   - Only the graduate can update their own profile or delete their own messages.
   - Payments are only readable by the owning graduate; writes happen only
     through the server using the service role key.
3. Go to **Authentication → Providers** and confirm Email is enabled.
   - For the fastest signup → pay → dashboard flow, also go to
     **Authentication → Settings** and turn **off** "Confirm email". With it
     on, `supabase.auth.signUp()` won't return a live session, so the graduate
     would be sent to check their inbox before they could continue to
     `/create` and pay — adding friction you don't want for a ₦500 impulse
     purchase. You can turn confirmation back on later once you care more
     about verified emails than launch speed.
4. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (never expose this client-side)

## 4. Set up Paystack (5 minutes)

1. Create an account at paystack.com.
2. Go to **Settings → API Keys & Webhooks** and copy your test (or live) keys
   into `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY`.
3. In the same screen, set your **Webhook URL** to:
   `https://yourdomain.com/api/paystack/webhook`
   This is what reliably activates a PortalBox even if the graduate closes
   their browser tab right after paying — the `/payment/callback` redirect is
   a fast-path for a good UX, but the webhook is the real source of truth.

## 5. Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values from steps 3–4:

```bash
cp .env.local.example .env.local
```

Set `NEXT_PUBLIC_SITE_URL` to `http://localhost:3000` for local development,
and to your production domain once deployed.

## 6. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Use a Paystack test card to confirm the
full flow end to end: sign up → create profile → pay ₦500 → land on dashboard
→ copy your link → open it in an incognito tab → leave a message → see it
appear on the dashboard.
## 7. Deploy to Vercel (15 minutes)

1. Push this project to a GitHub repo.
2. Go to vercel.com/new and import the repo.
3. Add all six environment variables from `.env.local` in the Vercel project
   settings (set `NEXT_PUBLIC_SITE_URL` to your real production URL, e.g.
   `https://portalbox.ng`).
4. Deploy.
5. Update the Paystack webhook URL (step 4.3) to point at your live domain.
6. Switch Paystack from test keys to live keys once you're ready to take real
   payments, and redeploy.

## 8. Custom domain (optional, for the `portalbox.ng/luciid` style URL)

Point your domain's DNS at Vercel (Vercel's UI walks you through this under
**Project → Settings → Domains**). Because PortalBox pages are already
path-based (`/[slug]`), no extra routing work is needed — `portalbox.ng/luciid`
will just work once the domain is attached.

## 9. Launch checklist

- [ ] Schema run in Supabase, RLS confirmed on
- [ ] Test payment completes and dashboard shows "paid"
- [ ] Webhook URL set in Paystack and receiving `charge.success` events
- [ ] Switched to Paystack live keys
- [ ] Custom domain attached
- [ ] Share your own PortalBox link to get the first real graduate
