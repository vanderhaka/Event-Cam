-- Make event-media bucket private so only signed URLs (issued to event host or
-- valid share-link viewers) can access files. Uploads still use service role.
update storage.buckets
set public = false
where id = 'event-media';
