import { expect, test, type Route, type Page } from '@playwright/test';

async function stubSupabaseAuth(page: Page) {
  await page.route('**/auth/v1/user*', (route: Route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ user: null }),
    });
  });
}

const guestTokenPayload = {
  event: {
    id: 'event-guest-1',
    name: 'Garden Launch',
    startAt: new Date().toISOString(),
    endAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    eventType: 'open',
  },
  invitee: {
    id: 'invitee-1',
    displayName: 'Guest User',
  },
  consentRequired: true,
};

test.describe('guest scan flows', () => {
  test('shows not-found state for unknown invite token', async ({ page }) => {
    await stubSupabaseAuth(page);
    await page.route('**/api/invite/nope', (route: Route) => {
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ code: 'TOKEN_NOT_FOUND' }),
      });
    });

    await page.goto('/scan/nope');
    await expect(page.getByRole('heading', { name: 'Invite not found' })).toBeVisible();
    await expect(page.getByText("This QR code doesn\u2019t match any active invite.")).toBeVisible();
  });

  test('shows expired state for closed event window', async ({ page }) => {
    await stubSupabaseAuth(page);
    await page.route('**/api/invite/expired', (route: Route) => {
      route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({ code: 'EVENT_WINDOW_CLOSED' }),
      });
    });

    await page.goto('/scan/expired');
    await expect(page.getByRole('heading', { name: 'Upload window closed' })).toBeVisible();
    await expect(page.getByText('The upload window for this event has ended.')).toBeVisible();
  });

  test('validates consent before upload and uploads media when consent is checked', async ({ page }) => {
    await stubSupabaseAuth(page);
    await page.route('**/api/invite/valid-token', (route: Route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(guestTokenPayload),
      });
    });

    await page.route('**/api/invite/valid-token/media', async (route: Route) => {
      if (route.request().method() !== 'POST') {
        route.continue();
        return;
      }

      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ media: { id: 'media-1' } }),
      });
    });

    await page.goto('/scan/valid-token');
    await expect(page.getByRole('heading', { name: 'Garden Launch' })).toBeVisible();
    await expect(page.getByText('Upload your photos and videos below.')).toBeVisible();

    await page.setInputFiles('input[type="file"]', 'tests/e2e/fixtures/photo.jpg');
    await expect(page.getByText('1 file')).toBeVisible();
    const uploadButton = page.getByRole('button', { name: 'Upload' });
    await expect(uploadButton).toBeDisabled();
    await page.getByRole('checkbox').check();
    await expect(uploadButton).toBeEnabled();
    await uploadButton.click();
    await expect(page.getByText('uploaded successfully')).toBeVisible();
  });

  test('blocks upload when file is rejected by content safety policy', async ({ page }) => {
    await stubSupabaseAuth(page);
    await page.route('**/api/invite/valid-token', (route: Route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(guestTokenPayload),
      });
    });

    await page.route('**/api/invite/valid-token/media', async (route: Route) => {
      if (route.request().method() !== 'POST') {
        await route.continue();
        return;
      }

      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Upload blocked by file safety policy', reason: 'media_scan_failed' }),
      });
    });

    await page.goto('/scan/valid-token');
    await expect(page.getByRole('heading', { name: 'Garden Launch' })).toBeVisible();
    await page.setInputFiles('input[type="file"]', {
      name: 'malware.exe',
      mimeType: 'application/octet-stream',
      buffer: Buffer.from('bad'),
    });
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.getByText('Upload blocked by file safety policy')).toBeVisible();
  });

  test('captures optional email after successful upload', async ({ page }) => {
    await stubSupabaseAuth(page);
    await page.route('**/api/invite/valid-token', (route: Route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(guestTokenPayload),
      });
    });

    await page.route('**/api/invite/valid-token/media', (route: Route) => {
      if (route.request().method() !== 'POST') {
        route.continue();
        return;
      }

      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ media: { id: 'media-1' } }),
      });
    });

    let capturedPayload: { email?: string; marketingConsent?: boolean } | null = null;
    await page.route('**/api/invite/valid-token/contact', async (route: Route) => {
      if (route.request().method() !== 'POST') {
        await route.continue();
        return;
      }
      try {
        capturedPayload = JSON.parse(route.request().postData() || '{}');
      } catch {
        capturedPayload = null;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Email captured' }),
      });
    });

    await page.goto('/scan/valid-token');
    await expect(page.getByRole('heading', { name: 'Garden Launch' })).toBeVisible();
    await expect(page.getByText('Upload your photos and videos below.')).toBeVisible();

    await page.setInputFiles('input[type="file"]', 'tests/e2e/fixtures/photo.jpg');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.getByText('uploaded successfully')).toBeVisible();

    await expect(page.getByLabel('Email (optional)')).toBeVisible();
    await page.getByLabel('Email (optional)').fill('guest@example.com');
    await page.getByRole('checkbox').nth(1).check();
    await page.getByRole('button', { name: 'Save email preference' }).click();
    await expect(page.getByText('Email preference saved.')).toBeVisible();

    expect(capturedPayload).toEqual({
      email: 'guest@example.com',
      marketingConsent: true,
    });
  });
});

test.describe('mobile scan smoke checks', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });

  test('uses iOS capture mode and shows landscape upload guidance', async ({ page }) => {
    await stubSupabaseAuth(page);
    await page.route('**/api/invite/valid-token', (route: Route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(guestTokenPayload),
      });
    });
    await page.route('**/api/invite/valid-token/media', (route: Route) => {
      if (route.request().method() !== 'POST') {
        route.continue();
        return;
      }

      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ media: { id: 'media-1' } }),
      });
    });

    await page.goto('/scan/valid-token');
    await expect(page.locator('input[type=\"file\"]')).toHaveAttribute('capture', 'environment');

    await page.setViewportSize({ width: 844, height: 390 });
    await page.evaluate(() => {
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('orientationchange'));
    });
    await expect(page.getByText('For best upload results on mobile, rotate your device to portrait mode.')).toBeVisible();
  });

  test('blocks upload when upload APIs are unavailable', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'File', { configurable: true, value: undefined });
      Object.defineProperty(window, 'FormData', { configurable: true, value: undefined });
      Object.defineProperty(window, 'FileList', { configurable: true, value: undefined });
    });

    await stubSupabaseAuth(page);
    await page.route('**/api/invite/valid-token', (route: Route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(guestTokenPayload),
      });
    });

    await page.goto('/scan/valid-token');
    await expect(page.getByText('Your browser does not support file uploads. Please use a modern mobile browser.')).toBeVisible();
    await expect(page.locator('input[type=\"file\"]')).toBeDisabled();
  });
});
