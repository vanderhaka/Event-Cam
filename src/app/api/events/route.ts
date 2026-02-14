import { NextRequest } from 'next/server';
import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { requireHostUser } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const { userId } = await requireHostUser();
    const admin = createSupabaseAdminClient();

    const { data, error } = await admin
      .from('events')
      .select('id, name, start_at, end_at, status, is_published, event_type, fee_per_invite_cents')
      .eq('host_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[GET /api/events] Supabase error:', error.message, error.code);
      return jsonResponse(
        { message: 'Failed to load events. Please try again.' },
        { status: 500 }
      );
    }

    return jsonResponse({ events: data ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('[GET /api/events]', message);
    if (message.includes('SUPABASE_SERVICE_ROLE_KEY')) {
      console.error('[GET /api/events] Set SUPABASE_SERVICE_ROLE_KEY in Vercel env vars (Supabase Dashboard → Settings → API).');
    }
    return jsonResponse(
      { message: 'Failed to load events. Please try again.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId } = await requireHostUser();
  const admin = createSupabaseAdminClient();
  const body = await parseJsonBody(request);

  try {
    const name = String(body.name ?? '').trim();
    const startAt = String(body.startAt ?? body.start_at ?? '').trim();
    const endAt = String(body.endAt ?? body.end_at ?? '').trim();

    if (!name) {
      throw new ApiError('Event name is required', 400);
    }

    const start = new Date(startAt);
    const end = new Date(endAt);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new ApiError('startAt and endAt must be valid ISO timestamps', 400);
    }

    if (start >= end) {
      throw new ApiError('endAt must be after startAt', 400);
    }

    const mediaMode = String(body.mediaMode ?? body.media_mode ?? 'image_video');
    const retentionPolicy = String(body.retentionPolicy ?? body.retention_policy ?? 'manual');
    const defaultFeeCents = Number(process.env.EVENT_CAM_DEFAULT_FEE_CENTS ?? 500);
    const feePerInviteCents = Number(body.feePerInviteCents ?? body.fee_per_invite_cents ?? defaultFeeCents);
    const maxStartWindowMinutes = Number(body.maxStartWindowMinutes ?? body.max_start_window_minutes ?? 0);
    const timezone = String(body.location ?? body.timezone ?? 'UTC').trim() || 'UTC';
    const eventType = String(body.eventType ?? body.event_type ?? 'invite_list').toLowerCase();
    const validEventType = eventType === 'open' ? 'open' : 'invite_list';

    const brandName = body.brandName ?? body.brand_name ?? null;
    const brandLogoUrl = body.brandLogoUrl ?? body.brand_logo_url ?? null;
    const brandCoverUrl = body.brandCoverUrl ?? body.brand_cover_url ?? null;
    const brandPrimaryColor = body.brandPrimaryColor ?? body.brand_primary_color ?? null;
    const brandSecondaryColor = body.brandSecondaryColor ?? body.brand_secondary_color ?? null;
    const customDomain = body.customDomain ?? body.custom_domain ?? null;

    const { data, error } = await admin
      .from('events')
      .insert({
        host_id: userId,
        name,
        start_at: start.toISOString(),
        end_at: end.toISOString(),
        timezone,
        media_mode: mediaMode,
        retention_policy: retentionPolicy,
        fee_per_invite_cents: Number.isFinite(feePerInviteCents) && feePerInviteCents >= 0 ? feePerInviteCents : defaultFeeCents,
        max_start_window_minutes: Number.isFinite(maxStartWindowMinutes) ? maxStartWindowMinutes : 0,
        brand_name: brandName,
        brand_logo_url: brandLogoUrl,
        brand_cover_url: brandCoverUrl,
        brand_primary_color: brandPrimaryColor,
        brand_secondary_color: brandSecondaryColor,
        custom_domain: customDomain,
        event_type: validEventType,
        status: 'draft',
      })
      .select('*')
      .single();

    if (error) {
      console.error('[POST /api/events] Supabase error:', error.message, error.code);
      return jsonResponse(
        { message: 'Failed to create event. Please try again.' },
        { status: 500 }
      );
    }

    return jsonResponse({ event: data }, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to create event' }, { status: 500 });
  }
}
