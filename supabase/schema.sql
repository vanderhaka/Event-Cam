create extension if not exists pgcrypto;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  timezone text not null default 'UTC',
  brand_name text,
  brand_logo_url text,
  brand_cover_url text,
  brand_primary_color text,
  brand_secondary_color text,
  custom_domain text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  max_start_window_minutes integer not null default 0,
  media_mode text not null default 'image_video',
  retention_policy text not null default 'manual',
  status text not null default 'draft' check (status in ('draft', 'checkout_pending', 'paid', 'published', 'archived')),
  is_published boolean not null default false,
  event_type text not null default 'invite_list' check (event_type in ('invite_list', 'open')),
  fee_per_invite_cents integer not null default 500,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_host_idx on public.events (host_id, created_at desc);

create table if not exists public.invitees (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  display_name text not null,
  email text,
  phone_e164 text,
  group_tag text,
  qr_token text unique,
  qr_state text not null default 'created' check (qr_state in ('created', 'issued', 'disabled')),
  is_active boolean not null default true,
  created_by_host uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invitees_event_idx on public.invitees (event_id, is_active);

create table if not exists public.contributor_sessions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  invitee_id uuid not null references public.invitees (id) on delete cascade,
  device_fingerprint text,
  last_ip_hash text,
  has_consented boolean not null default false,
  is_active boolean not null default true,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(event_id, invitee_id)
);

create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  invitee_id uuid not null references public.invitees (id) on delete cascade,
  uploader_token text not null,
  media_type text not null check (media_type in ('image', 'video')),
  storage_path text not null,
  original_name text,
  mime_type text,
  size_bytes bigint,
  duration_sec integer,
  consent_granted boolean not null default false,
  attributed_labels text[] not null default '{}',
  moderation_state text not null default 'pending' check (moderation_state in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references auth.users (id),
  reviewed_at timestamptz,
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists media_event_state_idx on public.media_items (event_id, moderation_state, created_at desc);

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  title text not null,
  criteria jsonb not null default '{}'::jsonb,
  visibility text not null default 'private' check (visibility in ('private', 'public')),
  cover_item_id uuid references public.media_items (id) on delete set null,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table if not exists public.album_items (
  album_id uuid not null references public.albums (id) on delete cascade,
  media_item_id uuid not null references public.media_items (id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (album_id, media_item_id)
);

create table if not exists public.share_links (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums (id) on delete cascade,
  token text not null unique,
  password_hash text not null,
  expires_at timestamptz,
  max_views integer,
  view_count integer not null default 0,
  revoked_at timestamptz,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create index if not exists share_links_token_idx on public.share_links (token);

create table if not exists public.billing_records (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  provider text not null default 'stripe',
  checkout_session text not null unique,
  amount_cents integer not null,
  currency text not null default 'USD',
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'canceled')),
  invoice_ref text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists billing_event_idx on public.billing_records (event_id, status);

insert into storage.buckets (id, name, public)
  values ('event-media', 'event-media', true)
  on conflict (id) do nothing;
