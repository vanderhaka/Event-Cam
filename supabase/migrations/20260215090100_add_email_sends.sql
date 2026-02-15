create table if not exists public.email_sends (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  album_id uuid references public.albums (id) on delete set null,
  recipient_email text not null,
  email_type text not null check (email_type in ('album_delivery', 'host_event_published', 'host_upload_digest', 'guest_nurture')),
  resend_id text,
  status text not null default 'sent',
  created_at timestamptz not null default now()
);

create index if not exists email_sends_event_idx on public.email_sends (event_id);
create index if not exists email_sends_recipient_idx on public.email_sends (recipient_email, email_type);
