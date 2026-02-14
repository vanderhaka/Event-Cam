-- Add event type: invite_list (QR per invitee) vs open (single event QR)
alter table public.events
  add column if not exists event_type text not null default 'invite_list'
  check (event_type in ('invite_list', 'open'));

comment on column public.events.event_type is 'invite_list: known guests, one QR per invitee; open: one event QR for anyone';
