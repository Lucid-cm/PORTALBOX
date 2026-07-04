-- PortalBox database schema
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query)

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  school text not null,
  department text not null,
  graduation_year text not null,
  profile_photo text,
  slug text unique not null,
  payment_status text not null default 'pending', -- 'pending' | 'paid'
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  sender_name text not null,
  relationship text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  amount integer not null, -- stored in kobo
  status text not null default 'pending', -- 'pending' | 'success' | 'failed'
  reference text unique not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_user_id_idx on public.messages(user_id);
create index if not exists payments_user_id_idx on public.payments(user_id);
create index if not exists users_slug_idx on public.users(slug);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.users enable row level security;
alter table public.messages enable row level security;
alter table public.payments enable row level security;

-- USERS: anyone can read a public profile by slug (needed for the public PortalBox page).
-- A graduate can only update/insert their own row.
create policy "Public profiles are viewable by everyone"
  on public.users for select
  using (true);

create policy "Users can insert their own profile"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

-- MESSAGES: anyone can leave a message (visitors are never authenticated),
-- and anyone can read messages on a public PortalBox.
-- Only the owning graduate can delete a message left for them.
create policy "Messages are viewable by everyone"
  on public.messages for select
  using (true);

create policy "Anyone can leave a message"
  on public.messages for insert
  with check (true);

create policy "Graduates can delete their own messages"
  on public.messages for delete
  using (auth.uid() = user_id);

-- PAYMENTS: only the owning graduate can see their own payment history.
-- Inserts/updates happen via the server (service role key), not directly from the client.
create policy "Users can view their own payments"
  on public.payments for select
  using (auth.uid() = user_id);
