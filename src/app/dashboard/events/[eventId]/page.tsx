/* eslint-disable @next/next/no-img-element */
'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

const ordinalSuffix = (value: number) => {
  const v = value % 100;
  if (v >= 11 && v <= 13) return `${value}th`;
  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
};

const readableDate = (value?: string | null) => {
  if (!value) return 'Not set';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Invalid date';
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${ordinalSuffix(day)} ${month} ${year}, ${time}`;
};

const TOUR_TARGETS = ['add-guests', 'guest-list', 'save-guests', 'confirm'] as const;
const TOUR_MODAL_ESTIMATE = { width: 360, height: 280, gap: 16 };
const TOUR_MODAL_PADDING = 16;

type ContactRow = {
  id: string;
  email: string;
  display_name: string;
  marketing_consent: boolean;
  created_at: string | null;
  unsubscribed_at: string | null;
  emails_sent: number;
};

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [eventPayload, setEventPayload] = useState<any>(null);
  const [inviteeRows, setInviteeRows] = useState([{ firstName: '', lastName: '', phone: '' }]);
  const [pendingQueue, setPendingQueue] = useState<any[]>([]);
  const [approvedMedia, setApprovedMedia] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'error' | 'success' | 'info'>('info');
  const [albumTitle, setAlbumTitle] = useState('');
  const [selectedMediaIds, setSelectedMediaIds] = useState<Set<string>>(new Set());
  const [sharePassword, setSharePassword] = useState('');
  const [shareMaxViews, setShareMaxViews] = useState('50');
  const [shareExpiresInHours, setShareExpiresInHours] = useState('72');
  const [activeTab, setActiveTab] = useState<'invitees' | 'moderation' | 'albums' | 'contacts' | 'email'>('invitees');
  const [baseOrigin, setBaseOrigin] = useState('');
  const [qrModalInvitee, setQrModalInvitee] = useState<any>(null);
  const [editingInviteeId, setEditingInviteeId] = useState<string | null>(null);
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [guestListTourStep, setGuestListTourStep] = useState<0 | 1 | 2 | 3 | null>(null);
  const [tourSpotlightRect, setTourSpotlightRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [tourModalPosition, setTourModalPosition] = useState<{ top: number; left: number } | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mediaActionBusy, setMediaActionBusy] = useState<string | null>(null);
  const [albumActionBusy, setAlbumActionBusy] = useState<string | null>(null);
  const [disablingUploads, setDisablingUploads] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [sendingGuestEmails, setSendingGuestEmails] = useState<string | null>(null);
  const [emailAutoSend, setEmailAutoSend] = useState(false);
  const [hostUploadDigest, setHostUploadDigest] = useState(true);
  const [digestFrequency, setDigestFrequency] = useState<'immediate' | 'daily' | 'off'>('daily');
  const [replyTo, setReplyTo] = useState('');
  const [savingEmailSettings, setSavingEmailSettings] = useState(false);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [exportingContacts, setExportingContacts] = useState(false);
  const [removingContactId, setRemovingContactId] = useState<string | null>(null);

  useEffect(() => {
    setBaseOrigin(typeof window !== 'undefined' ? window.location.origin : '');
  }, []);

  useEffect(() => {
    if (
      activeTab !== 'invitees' ||
      !eventPayload?.event ||
      eventPayload.event.event_type === 'open' ||
      typeof window === 'undefined'
    ) return;
    const tourKey = `event-cam-guest-list-tour-${eventId}`;
    if (!sessionStorage.getItem(tourKey)) {
      setGuestListTourStep(0);
    }
  }, [activeTab, eventPayload, eventId]);

  useEffect(() => {
    if (guestListTourStep === null || typeof document === 'undefined' || typeof window === 'undefined') {
      setTourSpotlightRect(null);
      setTourModalPosition(null);
      return;
    }
    const key = TOUR_TARGETS[guestListTourStep];
    const el = document.querySelector(`[data-tour="${key}"]`);
    const update = () => {
      if (!el) {
        setTourSpotlightRect(null);
        setTourModalPosition(null);
        return;
      }
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const { width: mw, height: mh, gap } = TOUR_MODAL_ESTIMATE;
      const pad = TOUR_MODAL_PADDING;
      setTourSpotlightRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });

      const spaceBelow = vh - (rect.bottom + gap);
      const spaceAbove = rect.top - gap;
      let top: number;
      let left: number;
      if (spaceBelow >= mh) {
        top = rect.bottom + gap;
        left = Math.max(pad, Math.min(rect.left + rect.width / 2 - mw / 2, vw - mw - pad));
      } else if (spaceAbove >= mh) {
        top = rect.top - mh - gap;
        left = Math.max(pad, Math.min(rect.left + rect.width / 2 - mw / 2, vw - mw - pad));
      } else if (rect.left + rect.width + gap + mw <= vw - pad) {
        left = rect.right + gap;
        top = Math.max(pad, Math.min(rect.top + rect.height / 2 - mh / 2, vh - mh - pad));
      } else if (rect.left - gap - mw >= pad) {
        left = rect.left - mw - gap;
        top = Math.max(pad, Math.min(rect.top + rect.height / 2 - mh / 2, vh - mh - pad));
      } else {
        top = Math.max(pad, (vh - mh) / 2);
        left = Math.max(pad, Math.min((vw - mw) / 2, vw - mw - pad));
      }
      setTourModalPosition({ top, left });
    };
    const raf = requestAnimationFrame(() => update());
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [guestListTourStep]);

  const buildAuthHeaders = useCallback(async (extra: HeadersInit = {}) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    const headers = new Headers(extra);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }, [supabase]);

  const fetchWithAuth = useCallback(async (input: RequestInfo, init: RequestInit = {}) => {
    const headers = await buildAuthHeaders(init.headers as HeadersInit);
    return fetch(input, { ...init, headers });
  }, [buildAuthHeaders]);

  const showStatus = useCallback((msg: string, type: 'error' | 'success' | 'info' = 'info') => {
    setStatusMessage(msg);
    setStatusType(type);
    if (type === 'success') {
      setTimeout(() => setStatusMessage(''), 4000);
    }
  }, []);

  const loadContacts = useCallback(async () => {
    setContactsLoading(true);
    try {
      const response = await fetchWithAuth(`/api/events/${eventId}/contacts`);
      if (response.ok) {
        const payload = await response.json();
        setContacts(payload.contacts ?? []);
        return;
      }

      if (response.status === 401) {
        router.push('/auth/login');
        return;
      }

      const payload = await response.json();
      showStatus(payload.message || 'Could not load contacts', 'error');
      setContacts([]);
    } catch {
      showStatus('Could not load contacts', 'error');
      setContacts([]);
    } finally {
      setContactsLoading(false);
    }
  }, [eventId, fetchWithAuth, showStatus, router]);

  const loadData = useCallback(async () => {
    const base = await fetchWithAuth(`/api/events/${eventId}`);
    if (base.ok) {
      const payload = await base.json();
      setEventPayload(payload);
      const emailSettings = payload.email_settings || {};
      setEmailAutoSend(Boolean(emailSettings.album_auto_send));
      setHostUploadDigest(Boolean(emailSettings.host_upload_digest));
      setDigestFrequency((emailSettings.digest_frequency as 'immediate' | 'daily' | 'off') || 'daily');
      setReplyTo(emailSettings.reply_to ? String(emailSettings.reply_to) : '');
    } else if (base.status === 401) {
      router.push('/auth/login');
      return;
    }

    const pending = await fetchWithAuth(`/api/events/${eventId}/moderation?state=pending`);
    if (pending.ok) {
      const queue = await pending.json();
      setPendingQueue(queue.media ?? []);
    } else if (pending.status === 401) {
      router.push('/auth/login');
      return;
    }

    const approved = await fetchWithAuth(`/api/events/${eventId}/moderation?state=approved`);
    if (approved.ok) {
      const list = await approved.json();
      setApprovedMedia(list.media ?? []);
    } else if (approved.status === 401) {
      router.push('/auth/login');
      return;
    }

    await loadContacts();
  }, [eventId, fetchWithAuth, loadContacts, router]);

  useEffect(() => {
    loadData();
  }, [loadData, eventId]);

  function updateInviteeRow(index: number, field: 'firstName' | 'lastName' | 'phone', value: string) {
    setInviteeRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  async function addInviteeRow() {
    if (inviteeRows.length > 0 && !inviteeRows[0].firstName.trim()) {
      showStatus('Enter a first name for the first guest before adding another', 'error');
      return;
    }

    const toSave = inviteeRows
      .filter((row) => row.firstName.trim())
      .map((row) => {
        const displayName = [row.firstName.trim(), row.lastName.trim()].filter(Boolean).join(' ');
        return { displayName, phone: row.phone.trim() || undefined };
      });

    if (toSave.length > 0) {
      const response = await fetchWithAuth(`/api/events/${eventId}/invitees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invitees: toSave }),
      });
      if (response.ok) {
        showStatus('Guests saved', 'success');
        await loadData();
        setInviteeRows([...Array(inviteeRows.length + 1)].map(() => ({ firstName: '', lastName: '', phone: '' })));
        return;
      }
      const payload = await response.json();
      showStatus(payload.message || 'Could not save guests', 'error');
      return;
    }

    setInviteeRows((prev) => [...prev, { firstName: '', lastName: '', phone: '' }]);
  }

  function removeInviteeRow(index: number) {
    setInviteeRows((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  }

  async function addInvitees(event: FormEvent) {
    event.preventDefault();
    const invitees = inviteeRows
      .filter((row) => row.firstName.trim())
      .map((row) => {
        const displayName = [row.firstName.trim(), row.lastName.trim()].filter(Boolean).join(' ');
        return { displayName, phone: row.phone.trim() || undefined };
      });

    if (invitees.length === 0) {
      showStatus('Add at least one invitee with a first name', 'error');
      return;
    }

    const response = await fetchWithAuth(`/api/events/${eventId}/invitees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invitees }),
    });

    if (response.ok) {
      setInviteeRows([{ firstName: '', lastName: '', phone: '' }]);
      showStatus('Invitees added successfully', 'success');
      await loadData();
    } else {
      const payload = await response.json();
      showStatus(payload.message || 'Could not add invitees', 'error');
    }
  }

  async function deleteEvent() {
    setDeleting(true);
    try {
      const response = await fetchWithAuth(`/api/events/${eventId}`, { method: 'DELETE' });
      if (response.ok) {
        setDeleteConfirmOpen(false);
        router.push('/dashboard');
        return;
      }
      const payload = await response.json();
      showStatus(payload.message || 'Failed to delete event', 'error');
    } finally {
      setDeleting(false);
    }
  }

  async function checkout() {
    const response = await fetchWithAuth(`/api/events/${eventId}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const payload = await response.json();
    if (response.ok && payload.checkoutUrl) {
      window.location.href = payload.checkoutUrl;
      return;
    }
    showStatus(payload.message || 'Could not confirm', 'error');
  }

  async function publishEvent() {
    const response = await fetchWithAuth(`/api/events/${eventId}/publish`, { method: 'POST' });
    const payload = await response.json();
    if (response.ok) {
      showStatus(`Published! ${payload.issued?.length ?? 0} invitees received QR codes.`, 'success');
      await loadData();
    } else {
      showStatus(payload.message || 'Publish failed', 'error');
    }
  }

  function startEditInvitee(invitee: { id: string; display_name: string; phone_e164?: string | null }) {
    setEditingInviteeId(invitee.id);
    setEditDisplayName(invitee.display_name ?? '');
    setEditPhone(invitee.phone_e164 ?? '');
  }

  function cancelEditInvitee() {
    setEditingInviteeId(null);
    setEditDisplayName('');
    setEditPhone('');
  }

  async function saveEditInvitee(inviteeId: string) {
    const name = editDisplayName.trim();
    if (!name) {
      showStatus('Name is required', 'error');
      return;
    }
    const response = await fetchWithAuth(`/api/events/${eventId}/invitees/${inviteeId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName: name, phone: editPhone.trim() || null }),
    });
    if (response.ok) {
      showStatus('Guest updated', 'success');
      setEditingInviteeId(null);
      await loadData();
    } else {
      const payload = await response.json();
      showStatus(payload.message || 'Update failed', 'error');
    }
  }

  async function removeInvitee(invitee: { id: string; display_name: string }) {
    if (!window.confirm(`Remove "${invitee.display_name}" from the guest list? They can no longer be sent a QR code.`)) {
      return;
    }
    const response = await fetchWithAuth(`/api/events/${eventId}/invitees/${invitee.id}`, { method: 'DELETE' });
    if (response.ok) {
      showStatus('Guest removed', 'success');
      await loadData();
    } else {
      const payload = await response.json();
      showStatus(payload.message || 'Remove failed', 'error');
    }
  }

  async function moderate(mediaId: string, action: 'approve' | 'reject') {
    const response = await fetchWithAuth(`/api/events/${eventId}/media/${mediaId}/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: '' }),
    });

    if (response.ok) {
      await loadData();
      showStatus(`Media ${action}d`, 'success');
    } else {
      const payload = await response.json();
      showStatus(payload.message || `Could not ${action} media`, 'error');
    }
  }

  async function deleteMedia(mediaId: string) {
    if (!window.confirm('Remove this media from the event?')) {
      return;
    }

    setMediaActionBusy(mediaId);
    try {
      const response = await fetchWithAuth(`/api/events/${eventId}/media/${mediaId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await loadData();
        showStatus('Media removed', 'success');
      } else {
        const payload = await response.json();
        showStatus(payload.message || 'Failed to delete media', 'error');
      }
    } finally {
      setMediaActionBusy(null);
    }
  }

  async function hideAlbum(albumId: string) {
    setAlbumActionBusy(albumId);
    try {
      const response = await fetchWithAuth(`/api/events/${eventId}/albums/${albumId}/hide`, {
        method: 'POST',
      });
      if (response.ok) {
        await loadData();
        showStatus('Album hidden', 'success');
      } else {
        const payload = await response.json();
        showStatus(payload.message || 'Could not hide album', 'error');
      }
    } finally {
      setAlbumActionBusy(null);
    }
  }

  async function disableUploads() {
    setDisablingUploads(true);
    try {
      const response = await fetchWithAuth(`/api/events/${eventId}/disable`, {
        method: 'POST',
      });
      if (response.ok) {
        await loadData();
        showStatus('Uploads disabled', 'success');
      } else {
        const payload = await response.json();
        showStatus(payload.message || 'Could not disable uploads', 'error');
      }
    } finally {
      setDisablingUploads(false);
    }
  }

  function toggleMediaSelection(mediaId: string) {
    setSelectedMediaIds((prev) => {
      const next = new Set(prev);
      if (next.has(mediaId)) {
        next.delete(mediaId);
      } else {
        next.add(mediaId);
      }
      return next;
    });
  }

  function selectAllMedia() {
    if (selectedMediaIds.size === approvedMedia.length) {
      setSelectedMediaIds(new Set());
    } else {
      setSelectedMediaIds(new Set(approvedMedia.map((m) => m.id)));
    }
  }

  async function createAlbum(event: FormEvent) {
    event.preventDefault();
    if (selectedMediaIds.size === 0) {
      showStatus('Select at least one approved media item', 'error');
      return;
    }
    const response = await fetchWithAuth(`/api/events/${eventId}/albums`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: albumTitle,
        mediaIds: Array.from(selectedMediaIds),
      }),
    });

    const payload = await response.json();
    if (response.ok) {
      showStatus('Album created successfully', 'success');
      setAlbumTitle('');
      setSelectedMediaIds(new Set());
      await loadData();
    } else {
      showStatus(payload.message || 'Could not create album', 'error');
    }
  }

  async function createShareLink(albumId: string, options?: { regenerate?: boolean }) {
    const maxViews = Number.parseInt(shareMaxViews, 10);
    const expiresInHours = Number.parseInt(shareExpiresInHours, 10);

    if (!Number.isFinite(maxViews) || maxViews <= 0) {
      showStatus('Share max views must be a positive integer', 'error');
      return;
    }

    if (!Number.isFinite(expiresInHours) || expiresInHours <= 0) {
      showStatus('Link expiry must be a positive number', 'error');
      return;
    }

    const response = await fetchWithAuth(`/api/albums/${albumId}/share-links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: sharePassword || 'changeme',
        maxViews,
        expiresInHours,
        regenerate: options?.regenerate ?? false,
      }),
    });

    const payload = await response.json();
    if (response.ok) {
      try {
        await navigator.clipboard.writeText(payload.shareUrl);
        showStatus('Share link copied to clipboard!', 'success');
      } catch {
        window.prompt('Copy this share link:', payload.shareUrl);
        showStatus('Share link prepared for manual copy', 'success');
      }
    } else {
      showStatus(payload.message || 'Could not create share link', 'error');
    }
  }

  async function sendAlbumEmail(albumId: string) {
    const to = emailRecipient.trim();
    if (!to) {
      showStatus('Enter a recipient email address', 'error');
      return;
    }

    const pwd = sharePassword || 'changeme';
    setSendingEmail(albumId);
    try {
      const response = await fetchWithAuth(`/api/albums/${albumId}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, password: pwd }),
      });
      const payload = await response.json();
      if (response.ok) {
        showStatus(`Album email sent to ${to}`, 'success');
        setEmailRecipient('');
      } else {
        showStatus(payload.message || 'Could not send email', 'error');
      }
    } finally {
      setSendingEmail(null);
    }
  }

  async function sendAlbumToGuests(albumId: string) {
    const contactCount = eventPayload?.counts?.guest_contacts?.optIn ?? 0;
    if (contactCount <= 0) {
      showStatus('No contacts with marketing consent are available for this event.', 'error');
      return;
    }

    const pwd = sharePassword || 'changeme';
    if (pwd.length < 4) {
      showStatus('Share password must be at least 4 characters to send album emails.', 'error');
      return;
    }

    setSendingGuestEmails(albumId);
    try {
      const response = await fetchWithAuth(`/api/albums/${albumId}/send-to-guests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      const payload = await response.json();

      if (response.ok) {
        const sentCount = payload.sentCount ?? 0;
        const alreadyCount = payload.alreadySentCount ?? 0;
        const unsubscribedCount = payload.unsubscribedCount ?? 0;
        const failedCount = payload.failedCount ?? 0;
        const summary = `Album send summary: ${sentCount} sent, ${alreadyCount} already received, ${unsubscribedCount} unsubscribed.`;
        showStatus(failedCount > 0 ? `${summary} ${failedCount} failed.` : summary, failedCount > 0 ? 'error' : 'success');
        await loadData();
      } else {
        showStatus(payload.message || 'Could not send album to all guests', 'error');
      }
    } finally {
      setSendingGuestEmails(null);
    }
  }

  async function saveEmailSettings() {
    if (!['immediate', 'daily', 'off'].includes(digestFrequency)) {
      showStatus('Choose a valid digest frequency.', 'error');
      return;
    }

    setSavingEmailSettings(true);
    try {
      const response = await fetchWithAuth(`/api/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          album_auto_send: emailAutoSend,
          host_upload_digest: hostUploadDigest,
          digest_frequency: digestFrequency,
          reply_to: replyTo.trim() || null,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        showStatus(payload.message || 'Could not save email settings', 'error');
        return;
      }

      if (payload.email_settings) {
        setEventPayload((prev: any) =>
          prev
            ? {
                ...prev,
                email_settings: payload.email_settings,
              }
            : prev
        );

        const emailSettings = payload.email_settings;
        setEmailAutoSend(Boolean(emailSettings.album_auto_send));
        setHostUploadDigest(Boolean(emailSettings.host_upload_digest));
        setDigestFrequency((emailSettings.digest_frequency as 'immediate' | 'daily' | 'off') || 'daily');
        setReplyTo(emailSettings.reply_to ? String(emailSettings.reply_to) : '');
      }

      showStatus('Email settings saved', 'success');
    } finally {
      setSavingEmailSettings(false);
    }
  }

  function contactListLabel(contact: ContactRow) {
    if (contact.display_name) {
      return `${contact.email} (${contact.display_name})`;
    }
    return contact.email;
  }

  async function exportContacts() {
    setExportingContacts(true);
    try {
      const response = await fetchWithAuth(`/api/events/${eventId}/contacts?format=csv`);
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/auth/login');
          return;
        }
        const payload = await response.json();
        showStatus(payload.message || 'Could not export contacts', 'error');
        return;
      }

      const csv = await response.text();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.download = `event-${eventId}-contacts.csv`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(downloadUrl);
      showStatus('Contact CSV exported', 'success');
    } catch {
      showStatus('Could not export contacts', 'error');
    } finally {
      setExportingContacts(false);
    }
  }

  async function removeContact(contactId: string) {
    if (!window.confirm('Remove this contact? They will no longer receive album emails.')) {
      return;
    }
    setRemovingContactId(contactId);
    try {
      const response = await fetchWithAuth(`/api/events/${eventId}/contacts?contactId=${encodeURIComponent(contactId)}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        showStatus('Contact removed', 'success');
        await loadContacts();
        await loadData();
        return;
      }

      if (response.status === 401) {
        router.push('/auth/login');
        return;
      }

      const payload = await response.json();
      showStatus(payload.message || 'Could not remove contact', 'error');
    } finally {
      setRemovingContactId(null);
    }
  }

  if (!eventPayload) {
    return (
      <section className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p className="muted">Loading event...</p>
      </section>
    );
  }

  const tabStyle = (tab: string) => ({
    padding: '0.5rem 1rem',
    border: 'none',
    background: activeTab === tab ? 'var(--accent)' : 'transparent',
    color: activeTab === tab ? '#fff' : 'var(--text)',
    fontWeight: 600 as const,
    borderRadius: '10px',
    cursor: 'pointer' as const,
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  });

  return (
    <div className="grid">
      {/* Back link + Event header */}
      <div>
        <Link href="/dashboard" className="link" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'inline-block' }}>
          &larr; Back to events
        </Link>
        <section className="card">
          <div className="row-center" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h2 className="section-head" style={{ display: 'inline' }}>{eventPayload.event?.name}</h2>
              <span
                className={`status-chip ${
                  eventPayload.event?.status === 'checkout_pending' ? 'pending' : eventPayload.event?.status
                }`}
                role="status"
                style={{ marginLeft: '0.75rem' }}
              >
                {eventPayload.event?.status}
              </span>
              {(eventPayload.event?.event_type === 'open') && (
                <span className="status-chip" style={{ marginLeft: '0.5rem', background: 'var(--surface-soft)', color: 'var(--muted)' }}>
                  Open event
                </span>
              )}
              <p className="muted" style={{ margin: '0.4rem 0 0', fontSize: '0.88rem' }}>
                {readableDate(eventPayload.event?.start_at)} &mdash; {readableDate(eventPayload.event?.end_at)}
              </p>
              {eventPayload.event?.location && (
                <p className="muted" style={{ margin: '0.15rem 0 0', fontSize: '0.85rem' }}>{eventPayload.event.location}</p>
              )}
            </div>
            <div className="row" style={{ gap: '0.5rem', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-subtle btn-sm"
                onClick={checkout}
                disabled={eventPayload.event?.status === 'paid' || eventPayload.event?.status === 'published'}
                data-tour="confirm"
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={publishEvent}
                disabled={eventPayload.event?.status !== 'paid'}
              >
                Publish QR Codes
              </button>
              <button
                type="button"
                className="btn btn-subtle btn-sm"
                onClick={disableUploads}
                disabled={disablingUploads || !eventPayload.event?.is_published}
              >
                {disablingUploads ? 'Disabling…' : 'Disable uploads'}
              </button>
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="btn btn-subtle btn-sm"
                  onClick={() => setSettingsOpen((o) => !o)}
                  aria-expanded={settingsOpen}
                  aria-haspopup="true"
                  aria-label="Settings"
                  title="Settings"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </button>
                {settingsOpen && (
                  <>
                    <div
                      role="presentation"
                      style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                      onClick={() => setSettingsOpen(false)}
                    />
                    <div
                      className="event-settings-dropdown"
                      role="menu"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '0.25rem',
                        minWidth: '160px',
                        zIndex: 11,
                      }}
                    >
                      <button
                        type="button"
                        role="menuitem"
                        className="event-settings-dropdown-item event-settings-dropdown-item-danger"
                        onClick={() => {
                          setSettingsOpen(false);
                          setDeleteConfirmOpen(true);
                        }}
                      >
                        Delete event
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Status message */}
      {statusMessage && (
        <div className={`message ${statusType === 'error' ? 'message-error' : statusType === 'success' ? 'message-success' : 'message-info'}`}>
          {statusMessage}
        </div>
      )}

      {/* Tab navigation */}
      <div className="event-detail-tabs row-center">
        <button className={activeTab === 'invitees' ? 'active' : ''} style={tabStyle('invitees')} onClick={() => setActiveTab('invitees')}>
          {eventPayload.event?.event_type === 'open' ? 'Event QR' : `Guest list (${eventPayload.invitees?.length ?? 0})`}
        </button>
        <button className={activeTab === 'moderation' ? 'active' : ''} style={tabStyle('moderation')} onClick={() => setActiveTab('moderation')}>
          Guest uploads ({pendingQueue.length})
        </button>
        <button className={activeTab === 'albums' ? 'active' : ''} style={tabStyle('albums')} onClick={() => setActiveTab('albums')}>
          Albums ({eventPayload.albums?.length ?? 0})
        </button>
        <button className={activeTab === 'contacts' ? 'active' : ''} style={tabStyle('contacts')} onClick={() => setActiveTab('contacts')}>
          Contacts ({contacts.length})
        </button>
        <button className={activeTab === 'email' ? 'active' : ''} style={tabStyle('email')} onClick={() => setActiveTab('email')}>
          Email
        </button>
      </div>

      {/* Delete event confirmation modal */}
      {deleteConfirmOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-event-modal-title"
          onClick={() => !deleting && setDeleteConfirmOpen(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 id="delete-event-modal-title" className="modal-title">Delete event</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => !deleting && setDeleteConfirmOpen(false)}
                aria-label="Close"
                disabled={deleting}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p className="section-sub" style={{ marginBottom: '1.25rem' }}>
                Are you sure? This is permanent. All guests, media, and albums for this event will be removed.
              </p>
              <div className="modal-actions" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-subtle"
                  onClick={() => setDeleteConfirmOpen(false)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={deleteEvent}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting…' : 'Delete event'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Invitees / Event QR Tab ─── */}
      {activeTab === 'invitees' && (
        <>
          {eventPayload.event?.event_type === 'open' ? (
            <section className="card">
              <h3 className="section-head">Open event — one QR for everyone</h3>
              <p className="section-sub">
                Anyone who scans this event&apos;s QR code can upload photos and videos. No guest list needed. Confirm when you&apos;re ready and your event QR is issued automatically.
              </p>
              {eventPayload.invitees && eventPayload.invitees.length > 0 ? (
                <div className="open-event-qr">
                  <p className="section-sub">Your event QR is ready. Share it at the venue or in your event materials.</p>
                  <ul className="invitee-list">
                    {eventPayload.invitees.map((invitee: any) => (
                      <li key={invitee.id} className="invitee-item">
                        {editingInviteeId === invitee.id ? (
                          <div className="invitee-edit-row">
                            <label className="field" style={{ flex: 1, minWidth: 0 }}>
                              <span className="label">Label</span>
                              <input
                                className="input"
                                value={editDisplayName}
                                onChange={(e) => setEditDisplayName(e.target.value)}
                                placeholder="e.g. Event guests"
                              />
                            </label>
                            <div className="row" style={{ gap: '0.5rem', flexShrink: 0 }}>
                              <button type="button" className="btn btn-primary btn-sm" onClick={() => saveEditInvitee(invitee.id)}>
                                Save
                              </button>
                              <button type="button" className="btn btn-subtle btn-sm" onClick={cancelEditInvitee}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div>
                              <span className="invitee-name">{invitee.display_name}</span>
                            </div>
                            <div className="invitee-item-actions">
                              <span className={`status-chip ${invitee.qr_state === 'issued' ? 'published' : 'draft'}`}>
                                {invitee.qr_state === 'issued' ? 'QR Issued' : 'Pending'}
                              </span>
                              <button type="button" className="btn btn-subtle btn-sm" onClick={() => startEditInvitee(invitee)} aria-label="Edit label">
                                Edit
                              </button>
                              {invitee.qr_state === 'issued' && invitee.qr_token && (
                                <button
                                  type="button"
                                  className="btn btn-subtle btn-sm"
                                  onClick={() => setQrModalInvitee(invitee)}
                                >
                                  Show QR
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <p className="section-sub">When you&apos;re ready, confirm to get your event QR — it&apos;s issued automatically.</p>
                  <button type="button" className="btn btn-primary" onClick={checkout}>
                    I&apos;ve finished — confirm
                  </button>
                </>
              )}
            </section>
          ) : (
            <>
          <section className="card" data-tour="add-guests">
            <h3 className="section-head">Add guests</h3>
            <p className="section-sub">Add the people you want to invite. They will each get a unique QR code after publishing.</p>
            <form onSubmit={addInvitees} className="form-grid">
              <div className="invitee-rows">
                {inviteeRows.map((row, index) => (
                  <div key={index} className="invitee-row">
                    <div className="invitee-fields">
                      <label className="field">
                        <div className="label">First name *</div>
                        <input
                          className="input"
                          placeholder="First name"
                          value={row.firstName}
                          onChange={(e) => updateInviteeRow(index, 'firstName', e.target.value)}
                          required
                        />
                      </label>
                      <label className="field">
                        <div className="label">Last name</div>
                        <input
                          className="input"
                          placeholder="Last name"
                          value={row.lastName}
                          onChange={(e) => updateInviteeRow(index, 'lastName', e.target.value)}
                        />
                      </label>
                      <label className="field">
                        <div className="label">Phone</div>
                        <input
                          className="input"
                          type="tel"
                          placeholder="Phone (optional)"
                          value={row.phone}
                          onChange={(e) => updateInviteeRow(index, 'phone', e.target.value)}
                        />
                      </label>
                    </div>
                    {inviteeRows.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger invitee-remove"
                        onClick={() => removeInviteeRow(index)}
                        aria-label={`Remove invitee ${index + 1}`}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="row gap-sm">
                <button
                  type="button"
                  className="btn btn-subtle"
                  onClick={addInviteeRow}
                  disabled={inviteeRows.length > 0 && !inviteeRows[0].firstName.trim()}
                  title={inviteeRows.length > 0 && !inviteeRows[0].firstName.trim() ? 'Enter a first name for the first guest' : undefined}
                >
                  + Add another
                </button>
                <button className="btn btn-primary" type="submit" data-tour="save-guests">
                  Save guests
                </button>
              </div>
            </form>
          </section>

          <div data-tour="guest-list" className="tour-guest-list-anchor">
          {eventPayload.invitees && eventPayload.invitees.length > 0 ? (
            <section className="card">
              <h3 className="section-head">Guest list</h3>
              <p className="section-sub">{eventPayload.invitees.length} invitee{eventPayload.invitees.length !== 1 ? 's' : ''}. Click &quot;Show QR&quot; to see the scan link and QR code.</p>
              <p className="muted" style={{ fontSize: '0.875rem', marginTop: '-0.5rem', marginBottom: '0.75rem' }}>
                <strong>Pending</strong> = added but QR not issued yet. Confirm to get QR codes for each guest.
              </p>
              <ul className="invitee-list">
                {eventPayload.invitees.map((invitee: any) => (
                  <li key={invitee.id} className="invitee-item">
                    {editingInviteeId === invitee.id ? (
                      <div className="invitee-edit-row">
                        <label className="field" style={{ flex: 1, minWidth: 0 }}>
                          <span className="label">Name</span>
                          <input
                            className="input"
                            value={editDisplayName}
                            onChange={(e) => setEditDisplayName(e.target.value)}
                            placeholder="Display name"
                          />
                        </label>
                        <label className="field" style={{ flex: 1, minWidth: 0 }}>
                          <span className="label">Phone</span>
                          <input
                            className="input"
                            type="tel"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            placeholder="+1 555 000 0000"
                          />
                        </label>
                        <div className="row" style={{ gap: '0.5rem', flexShrink: 0 }}>
                          <button type="button" className="btn btn-primary btn-sm" onClick={() => saveEditInvitee(invitee.id)}>
                            Save
                          </button>
                          <button type="button" className="btn btn-subtle btn-sm" onClick={cancelEditInvitee}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <span className="invitee-name">{invitee.display_name}</span>
                          {invitee.phone_e164 && (
                            <span className="muted" style={{ fontSize: '0.85rem', marginLeft: '0.5rem' }}>{invitee.phone_e164}</span>
                          )}
                        </div>
                        <div className="invitee-item-actions">
                          <span className={`status-chip ${invitee.qr_state === 'issued' ? 'published' : 'draft'}`}>
                            {invitee.qr_state === 'issued' ? 'QR Issued' : 'Pending'}
                          </span>
                          <button type="button" className="btn btn-subtle btn-sm" onClick={() => startEditInvitee(invitee)} aria-label="Edit guest">
                            Edit
                          </button>
                          {eventPayload.event?.event_type !== 'open' && (
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeInvitee(invitee)} aria-label="Remove guest">
                              Remove
                            </button>
                          )}
                          {invitee.qr_state === 'issued' && invitee.qr_token && (
                            <button
                              type="button"
                              className="btn btn-subtle btn-sm"
                              onClick={() => setQrModalInvitee(invitee)}
                            >
                              Show QR
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="card">
              <h3 className="section-head">Guest list</h3>
              <p className="section-sub muted">Your saved guests will appear here after you click Save guests.</p>
            </section>
          )}
          </div>
            </>
          )}

          {/* QR modal */}
          {qrModalInvitee && baseOrigin && (() => {
            const scanUrl = `${baseOrigin}/scan/${encodeURIComponent(qrModalInvitee.qr_token)}`;
            const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(scanUrl)}`;
            return (
              <div className="modal-backdrop" onClick={() => setQrModalInvitee(null)} role="presentation">
                <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3 className="modal-title">Scan link — {qrModalInvitee.display_name}</h3>
                    <button type="button" className="modal-close" onClick={() => setQrModalInvitee(null)} aria-label="Close">
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <img
                      src={qrImageUrl}
                      alt={`QR code for ${qrModalInvitee.display_name}`}
                      width={280}
                      height={280}
                      className="qr-modal-image"
                    />
                    <div className="qr-modal-actions">
                      <a href={scanUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                        Open scan page
                      </a>
                      <span className="qr-modal-url muted">{scanUrl}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Guided tour: dark overlay with spotlight on current step */}
          {guestListTourStep !== null && (
            <div
              className="modal-backdrop tour-backdrop"
              role="dialog"
              aria-modal="true"
              aria-labelledby="guest-list-tour-title"
              aria-describedby="guest-list-tour-step-desc"
              style={tourSpotlightRect ? undefined : { background: 'rgba(0,0,0,0.75)' }}
              onClick={() => {
                setGuestListTourStep(null);
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem(`event-cam-guest-list-tour-${eventId}`, '1');
                }
              }}
            >
              {tourSpotlightRect && (
                <div
                  className="tour-spotlight"
                  style={{
                    position: 'fixed',
                    top: tourSpotlightRect.top,
                    left: tourSpotlightRect.left,
                    width: Math.max(tourSpotlightRect.width, 1),
                    height: Math.max(tourSpotlightRect.height, 1),
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
                    pointerEvents: 'none',
                  }}
                  aria-hidden
                />
              )}
              <div
                className="modal-card onboarding-modal tour-step-card"
                style={
                  tourModalPosition
                    ? { position: 'fixed', top: tourModalPosition.top, left: tourModalPosition.left }
                    : undefined
                }
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header tour-step-header">
                  <span className="tour-step-indicator" aria-live="polite">
                    Step {guestListTourStep + 1} of 4
                  </span>
                  <h3 id="guest-list-tour-title" className="modal-title">
                    {guestListTourStep === 0
                      ? 'Add guests'
                      : guestListTourStep === 1
                        ? 'Guest list'
                        : guestListTourStep === 2
                          ? 'Save guests'
                          : 'Confirm & get QR codes'}
                  </h3>
                  <button
                    type="button"
                    className="modal-close"
                    onClick={() => {
                      setGuestListTourStep(null);
                      if (typeof window !== 'undefined') {
                        sessionStorage.setItem(`event-cam-guest-list-tour-${eventId}`, '1');
                      }
                    }}
                    aria-label="Close tour"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body" id="guest-list-tour-step-desc">
                  {guestListTourStep === 0 && (
                    <div className="tour-step-content" data-step={1}>
                      <p className="section-sub">
                        Add your guests here. Enter first name, last name, and optional phone. Use &quot;+ Add another&quot; for more rows.
                      </p>
                      <div className="modal-actions tour-step-actions">
                        <button type="button" className="btn btn-primary" onClick={() => setGuestListTourStep(1)}>
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                  {guestListTourStep === 1 && (
                    <div className="tour-step-content" data-step={2}>
                      <p className="section-sub">
                        After you save, your guests appear here. Each will get their own QR code once you confirm.
                      </p>
                      <div className="modal-actions tour-step-actions">
                        <button type="button" className="btn btn-subtle" onClick={() => setGuestListTourStep(0)}>
                          Back
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => setGuestListTourStep(2)}>
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                  {guestListTourStep === 2 && (
                    <div className="tour-step-content" data-step={3}>
                      <p className="section-sub">
                        Click <strong>Save guests</strong> to add them to the list above. You can add more anytime.
                      </p>
                      <div className="modal-actions tour-step-actions">
                        <button type="button" className="btn btn-subtle" onClick={() => setGuestListTourStep(1)}>
                          Back
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => setGuestListTourStep(3)}>
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                  {guestListTourStep === 3 && (
                    <div className="tour-step-content" data-step={4}>
                      <p className="section-sub">
                        When you&apos;re ready, click <strong>Confirm</strong>. QR codes are created for each guest—then you can share them via &quot;Show QR&quot; in the guest list.
                      </p>
                      <div className="modal-actions tour-step-actions">
                        <button type="button" className="btn btn-subtle" onClick={() => setGuestListTourStep(2)}>
                          Back
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setGuestListTourStep(null);
                            if (typeof window !== 'undefined') {
                              sessionStorage.setItem(`event-cam-guest-list-tour-${eventId}`, '1');
                            }
                          }}
                        >
                          Got it
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ─── Moderation Tab ─── */}
      {activeTab === 'moderation' && (
        <>
          <section className="card">
            <h3 className="section-head">Pending review</h3>
            <p className="section-sub">Review uploaded media before it goes into an album.</p>
            {pendingQueue.length === 0 ? (
              <div className="empty-state">
                <p>No pending uploads to review</p>
              </div>
            ) : (
              <div className="mod-card-grid">
                {pendingQueue.map((item) => (
                  <div key={item.id} className="mod-card">
                    <div className="mod-card-preview">
                      {item.media_type === 'video' ? (
                        item.url ? (
                          <video src={item.url} className="mod-card-media" controls muted playsInline />
                        ) : (
                          <div className="mod-card-placeholder">Video</div>
                        )
                      ) : item.url ? (
                          <img src={item.url} alt={item.original_name || 'Upload'} className="mod-card-media" />
                      ) : (
                        <div className="mod-card-placeholder">Image</div>
                      )}
                    </div>
                    <div className="mod-card-info">
                      <strong className="mod-card-name">{item.original_name || 'Upload'}</strong>
                      {item.invitee && (
                        <span className="mod-card-from muted">from {item.invitee.display_name}</span>
                      )}
                    </div>
                    <div className="mod-card-actions">
                      <button className="btn btn-success btn-sm" onClick={() => moderate(item.id, 'approve')}>
                        Approve
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => moderate(item.id, 'reject')}>
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {approvedMedia.length > 0 && (
            <section className="card">
              <h3 className="section-head">Approved media</h3>
              <p className="section-sub">{approvedMedia.length} item{approvedMedia.length !== 1 ? 's' : ''} approved</p>
              <ul className="invitee-list">
                {approvedMedia.map((item) => (
                  <li key={item.id} className="invitee-item">
                    <div>
                      <span className="invitee-name">{item.original_name || 'Upload'}</span>
                      <span className="invitee-meta" style={{ marginLeft: '0.5rem' }}>
                        {item.media_type}
                        {item.invitee ? ` \u2014 ${item.invitee.display_name}` : ''}
                      </span>
                    </div>
                    <span className="status-chip paid">Approved</span>
                    <button
                      type="button"
                      className="btn btn-subtle btn-sm"
                      onClick={() => deleteMedia(item.id)}
                      disabled={mediaActionBusy === item.id}
                    >
                      {mediaActionBusy === item.id ? 'Removing…' : 'Delete'}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      {/* ─── Albums Tab ─── */}
      {activeTab === 'albums' && (
        <>
          <section className="card">
            <h3 className="section-head">Create album</h3>
            <p className="section-sub">
              Select approved media items and group them into a shareable album.
            </p>
            <form onSubmit={createAlbum} className="form-grid">
              <label>
                <div className="label">Album title</div>
                <input className="input" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} required placeholder="e.g. Ceremony Highlights" />
              </label>

              {approvedMedia.length > 0 ? (
                <div>
                  <div className="row-center" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div className="label" style={{ margin: 0 }}>Select media ({selectedMediaIds.size} selected)</div>
                    <button type="button" className="btn btn-subtle btn-sm" onClick={selectAllMedia}>
                      {selectedMediaIds.size === approvedMedia.length ? 'Deselect all' : 'Select all'}
                    </button>
                  </div>
                  <div className="media-select-grid">
                    {approvedMedia.map((item) => (
                      <div
                        key={item.id}
                        className={`media-select-item ${selectedMediaIds.has(item.id) ? 'selected' : ''}`}
                        onClick={() => toggleMediaSelection(item.id)}
                      >
                        {selectedMediaIds.has(item.id) && <span className="check-mark">{'\u2713'}</span>}
                        <div className="media-type-badge">{item.media_type}</div>
                        <div className="media-name">{item.original_name || 'Upload'}</div>
                        {item.invitee && <div className="invitee-meta">{item.invitee.display_name}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="muted" style={{ fontSize: '0.88rem' }}>No approved media yet. Review pending uploads in the Moderation tab first.</p>
              )}

              <button className="btn btn-primary" type="submit" disabled={selectedMediaIds.size === 0}>
                Create Album ({selectedMediaIds.size} items)
              </button>
            </form>
          </section>

          {eventPayload.albums && eventPayload.albums.length > 0 && (
            <section className="card">
              <h3 className="section-head">Your albums</h3>
              <div style={{ marginBottom: '0.75rem' }}>
                <label>
                  <div className="label">Share password</div>
                  <input className="input" value={sharePassword} onChange={(e) => setSharePassword(e.target.value)} placeholder="Set a password for share links" style={{ maxWidth: '300px' }} />
                </label>
                <label>
                  <div className="label">Max views</div>
                  <input
                    className="input"
                    type="number"
                    min={1}
                    value={shareMaxViews}
                    onChange={(e) => setShareMaxViews(e.target.value)}
                    style={{ maxWidth: '120px' }}
                  />
                </label>
                <label>
                  <div className="label">Expires in hours</div>
                  <input
                    className="input"
                    type="number"
                    min={1}
                    value={shareExpiresInHours}
                    onChange={(e) => setShareExpiresInHours(e.target.value)}
                    style={{ maxWidth: '120px' }}
                  />
                </label>
              </div>
              <ul className="album-list">
                {eventPayload.albums.map((album: any) => (
                    <li key={album.id} className="album-item">
                      <strong>{album.title}</strong>
                      <button className="btn btn-subtle btn-sm" onClick={() => createShareLink(album.id)}>
                        Generate share link
                      </button>
                      <button className="btn btn-subtle btn-sm" onClick={() => createShareLink(album.id, { regenerate: true })}>
                        Regenerate link
                      </button>
                      <button
                        type="button"
                        className="btn btn-subtle btn-sm"
                        onClick={() => sendAlbumToGuests(album.id)}
                        disabled={sendingGuestEmails === album.id || (eventPayload.counts?.guest_contacts?.optIn ?? 0) <= 0}
                      >
                        {sendingGuestEmails === album.id
                          ? 'Sending album to contacts…'
                          : `Email album to all contacts (${eventPayload.counts?.guest_contacts?.optIn ?? 0})`}
                      </button>
                      <button
                        type="button"
                        className="btn btn-subtle btn-sm"
                      onClick={() => hideAlbum(album.id)}
                      disabled={albumActionBusy === album.id}
                    >
                      {albumActionBusy === album.id ? 'Hiding…' : 'Hide album'}
                    </button>
                    <div className="row" style={{ gap: '0.5rem', width: '100%', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      <input
                        className="input"
                        type="email"
                        placeholder="Recipient email"
                        value={emailRecipient}
                        onChange={(e) => setEmailRecipient(e.target.value)}
                        style={{ flex: 1, minWidth: '180px' }}
                      />
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => sendAlbumEmail(album.id)}
                        disabled={sendingEmail === album.id || !emailRecipient.trim()}
                      >
                        {sendingEmail === album.id ? 'Sending…' : 'Send album email'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      {/* ─── Contacts Tab ─── */}
      {activeTab === 'contacts' && (
        <section className="card">
          <h3 className="section-head">Guest contacts</h3>
          <p className="section-sub">Manage captured guest emails and export the contact list.</p>

          <div className="row" style={{ gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-subtle btn-sm" onClick={exportContacts} disabled={exportingContacts || contacts.length === 0}>
              {exportingContacts ? 'Exporting…' : 'Export CSV'}
            </button>
            <span className="muted">{contacts.length} contact{contacts.length === 1 ? '' : 's'} captured</span>
          </div>

          {contactsLoading ? (
            <p className="muted">Loading contacts…</p>
          ) : contacts.length === 0 ? (
            <p className="empty-state">No contacts captured yet.</p>
          ) : (
            <ul className="invitee-list">
              {contacts.map((contact) => (
                <li key={contact.id} className="invitee-item">
                  <div>
                    <span className="invitee-name">{contactListLabel(contact)}</span>
                    <div className="invitee-meta">
                      {contact.marketing_consent ? 'Marketing consented' : 'No marketing consent'}
                      {contact.unsubscribed_at ? ' · Unsubscribed' : ' · Active'}
                      {` · ${contact.emails_sent} album email${contact.emails_sent === 1 ? '' : 's'} sent`}
                    </div>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-subtle btn-sm"
                      onClick={() => removeContact(contact.id)}
                      disabled={Boolean(removingContactId && contact.id === removingContactId) || Boolean(contact.unsubscribed_at)}
                    >
                      {removingContactId === contact.id ? 'Removing…' : 'Remove'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* ─── Email Tab ─── */}
      {activeTab === 'email' && (
        <section className="card">
          <h3 className="section-head">Email settings</h3>
          <p className="section-sub">Manage how this event sends host and guest email notifications.</p>

          <div className="form-grid" style={{ gap: '0.75rem' }}>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={emailAutoSend}
                onChange={(e) => setEmailAutoSend(e.target.checked)}
              />
              <span>Auto-send album to guests when a share link is created</span>
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={hostUploadDigest}
                onChange={(e) => setHostUploadDigest(e.target.checked)}
              />
              <span>Host upload digest notifications</span>
            </label>

            <label className="field">
              <div className="label">Digest frequency</div>
              <select className="input" value={digestFrequency} onChange={(e) => setDigestFrequency(e.target.value as 'immediate' | 'daily' | 'off')}>
                <option value="immediate">Immediate</option>
                <option value="daily">Daily</option>
                <option value="off">Off</option>
              </select>
            </label>

            <label className="field">
              <div className="label">Reply-to email</div>
              <input
                className="input"
                type="email"
                placeholder="Reply-to address"
                value={replyTo}
                onChange={(e) => setReplyTo(e.target.value)}
                maxLength={254}
              />
            </label>

            <div className="row" style={{ gap: '0.5rem', marginTop: '0.25rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveEmailSettings}
                disabled={savingEmailSettings}
              >
                {savingEmailSettings ? 'Saving…' : 'Save email settings'}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
