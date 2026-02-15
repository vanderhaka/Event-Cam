create table if not exists public.upload_idempotency_keys (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  invitee_id uuid not null references public.invitees (id) on delete cascade,
  idempotency_key text not null,
  media_item_id uuid references public.media_items (id) on delete set null,
  request_fingerprint text,
  request_id text,
  request_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours'),
  unique (event_id, invitee_id, idempotency_key)
);

create index if not exists upload_idempotency_keys_lookup_idx on public.upload_idempotency_keys (event_id, invitee_id, idempotency_key);

create index if not exists upload_idempotency_keys_expires_idx on public.upload_idempotency_keys (expires_at);

create table if not exists public.media_reports (
  id uuid primary key default gen_random_uuid(),
  media_item_id uuid not null references public.media_items (id) on delete cascade,
  event_id uuid not null references public.events (id) on delete cascade,
  reporter_token text,
  reason text not null,
  context jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists media_reports_media_idx on public.media_reports (media_item_id);
create index if not exists media_reports_event_idx on public.media_reports (event_id, created_at desc);

create table if not exists public.event_action_logs (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  action text not null,
  actor text not null check (actor in ('guest', 'host', 'system')),
  actor_id uuid references auth.users (id),
  target_type text,
  target_id text,
  reason text,
  ip_hash text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists event_action_logs_event_idx on public.event_action_logs (event_id, created_at desc);
create index if not exists event_action_logs_action_idx on public.event_action_logs (action, created_at desc);
create index if not exists media_event_created_idx on public.media_items (event_id, created_at desc);
