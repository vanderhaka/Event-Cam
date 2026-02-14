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
});
