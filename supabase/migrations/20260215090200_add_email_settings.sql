create table if not exists public.email_settings (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade unique,
  album_auto_send boolean not null default false,
  host_upload_digest boolean not null default true,
  digest_frequency text not null default 'daily' check (digest_frequency in ('immediate', 'daily', 'off')),
  reply_to text,
  updated_at timestamptz not null default now()
);
