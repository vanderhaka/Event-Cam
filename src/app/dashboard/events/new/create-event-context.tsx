'use client';

import { createContext, useContext, useEffect, useState } from 'react';

function toIsoLocal(date: Date) {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

function browserTimeZone() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return isValidTimeZone(tz) ? tz : 'UTC';
}

function isValidTimeZone(timezone: string) {
  try {
    new Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

function extractTimezoneFromNominatimPayload(payload: unknown) {
  if (!payload || typeof payload !== 'object') return '';
  const value =
    (payload as { extratags?: { timezone?: string } }).extratags?.timezone ??
    (payload as { timezone?: string }).timezone ??
    '';
  return typeof value === 'string' ? value.trim() : '';
}

async function findTimeZoneForLocation(value: string) {
  const query = value.trim();
  if (!query) return '';

  const searchRes = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}&addressdetails=1`,
    {
      headers: { 'Accept-Language': 'en' },
    },
  );
  if (!searchRes.ok) return '';

  const searchPayload = await searchRes.json();
  const first = Array.isArray(searchPayload) ? searchPayload[0] : null;
  if (!first || !first.lat || !first.lon) return '';

  const reverseRes = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${first.lat}&lon=${first.lon}&format=json&zoom=10&extratags=1`,
    {
      headers: { 'Accept-Language': 'en' },
    },
  );
  if (!reverseRes.ok) return '';

  const timezone = extractTimezoneFromNominatimPayload(await reverseRes.json());
  if (!timezone || !isValidTimeZone(timezone)) return '';
  return timezone;
}

export type CreateEventState = {
  name: string;
  setName: (v: string) => void;
  eventType: 'invite_list' | 'open';
  setEventType: (v: 'invite_list' | 'open') => void;
  location: string;
  setLocation: (v: string) => void;
  timezone: string;
  setTimezone: (v: string) => void;
  detectingLocation: boolean;
  startAt: string;
  setStartAt: (v: string) => void;
  endAt: string;
  setEndAt: (v: string) => void;
  detectTimezoneFromLocation: (value: string) => Promise<void>;
};

const CreateEventContext = createContext<CreateEventState | null>(null);

export function useCreateEvent() {
  const ctx = useContext(CreateEventContext);
  if (!ctx) throw new Error('useCreateEvent must be used within CreateEventProvider');
  return ctx;
}

export function CreateEventProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState<'invite_list' | 'open'>('invite_list');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState(() => browserTimeZone());
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [startAt, setStartAt] = useState(toIsoLocal(new Date()));
  const [endAt, setEndAt] = useState(toIsoLocal(new Date(Date.now() + 24 * 60 * 60 * 1000)));

  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10&extratags=1`,
            { headers: { 'Accept-Language': 'en' } },
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address ?? {};
            const city = addr.city || addr.town || addr.village || addr.municipality || '';
            const state = addr.state || '';
            const country = addr.country || '';
            const parts = [city, state, country].filter(Boolean);
            if (parts.length > 0) setLocation(parts.join(', '));

            const detectedTimeZone = extractTimezoneFromNominatimPayload(data);
            if (isValidTimeZone(detectedTimeZone)) {
              setTimezone(detectedTimeZone);
            }
          }
        } catch {
          // ignore
        } finally {
          setDetectingLocation(false);
        }
      },
      () => setDetectingLocation(false),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }, []);

  async function detectTimezoneFromLocation(value: string) {
    const detectedTimeZone = await findTimeZoneForLocation(value);
    if (detectedTimeZone) setTimezone(detectedTimeZone);
  }

  const value: CreateEventState = {
    name,
    setName,
    eventType,
    setEventType,
    location,
    setLocation,
    timezone,
    setTimezone,
    detectingLocation,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    detectTimezoneFromLocation,
  };

  return <CreateEventContext.Provider value={value}>{children}</CreateEventContext.Provider>;
}
