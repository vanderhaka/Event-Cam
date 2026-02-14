# Event-Cam Supabase project (new org)

The Event-Cam Supabase project has been **created in your target organization**:

- **Org:** [kjczpaufovyoeqamljts](https://supabase.com/dashboard/org/kjczpaufovyoeqamljts)
- **Project:** Event-Cam  
- **Project ID:** `lyytiqmpiljajzkietlv`  
- **URL:** `https://lyytiqmpiljajzkietlv.supabase.co`  
- **Region:** us-east-1  

Supabase does not support moving an existing project between orgs, so this is a **new** project. The previous project (`gltfevlyzhykvinsimhk`) is unchanged; you can pause or delete it from the other org when you no longer need it.

## After the project is ready (status ACTIVE_HEALTHY)

1. **Apply migrations**  
   In the Supabase dashboard → SQL Editor, run the contents of (in order):
   - `supabase/migrations/20260213000000_initial_schema.sql`
   - `supabase/migrations/20260214000000_event_media_bucket_private.sql`
   - `supabase/migrations/20260214120000_add_event_type.sql`  
   Or use the Supabase MCP / CLI to apply migrations to project `lyytiqmpiljajzkietlv`.

2. **Get keys**  
   In [Project Settings → API](https://supabase.com/dashboard/project/lyytiqmpiljajzkietlv/settings/api):
   - Project URL
   - anon (public) key
   - service_role key (keep secret)

3. **Point the app at the new project**  
   In `.env.local` (or your deployment env):
   - `NEXT_PUBLIC_SUPABASE_URL=https://lyytiqmpiljajzkietlv.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>`
   - `SUPABASE_SERVICE_ROLE_KEY=<service_role key>`

4. **Auth**  
   Users are per-project. Existing users from the old project will not exist here; sign up again or configure the same auth provider (e.g. email) in Authentication → Providers.

5. **Stripe**  
   Use the same Stripe keys if you want; update the webhook URL to your app’s URL so `checkout.session.completed` hits your app (which uses the new Supabase project).

Cost for this project: **$10/month** (confirmed at creation).
