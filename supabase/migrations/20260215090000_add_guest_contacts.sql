create table if not exists public.guest_contacts (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  invitee_id uuid references public.invitees (id) on delete set null,
  email text not null,
  marketing_consent boolean not null default false,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),

  unique (event_id, email)
);

create index if not exists guest_contacts_event_idx on public.guest_contacts (event_id);
