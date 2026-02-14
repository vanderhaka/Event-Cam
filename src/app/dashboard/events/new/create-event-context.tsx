'use client';

import { createContext, useContext, useEffect, useState } from 'react';

function toIsoLocal(date: Date) {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

export type CreateEventState = {
  name: string;
  setName: (v: string) => void;
  eventType: 'invite_list' | 'open';
  setEventType: (v: 'invite_list' | 'open') => void;
  location: string;
  setLocation: (v: string) => void;
  timezone: string;
  detectingLocation: boolean;
  startAt: string;
  setStartAt: (v: string) => void;
  endAt: string;
  setEndAt: (v: string) => void;
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
  const [timezone, setTimezone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
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
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`,
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

  const value: CreateEventState = {
    name,
    setName,
    eventType,
    setEventType,
    location,
    setLocation,
    timezone,
    detectingLocation,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
  };

  return (
    <CreateEventContext.Provider value={value}>
      {children}
    </CreateEventContext.Provider>
  );
}
