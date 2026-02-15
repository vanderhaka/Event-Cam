import { expect, test, type Page, type Route } from '@playwright/test';

async function stubSupabaseAuth(page: Page, loggedIn: boolean) {
  const user = loggedIn
    ? {
      id: 'host-test-id',
      email: 'host@example.com',
      aud: 'authenticated',
      role: 'authenticated',
      app_metadata: {},
      user_metadata: { full_name: 'Host Tester' },
    }
    : null;

  await page.route('**/auth/v1/user*', (route: Route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ user }),
    });
  });

  await page.route('**/auth/v1/token*', (route: Route) => {
    if (loggedIn) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'test-access-token',
          refresh_token: 'test-refresh-token',
          token_type: 'bearer',
          expires_in: 3600,
          user,
        }),
      });
      return;
    }

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: '',
        refresh_token: '',
        token_type: 'bearer',
        expires_in: 0,
        user: null,
      }),
    });
  });
}

test.describe('public flows', () => {
  test('renders landing page content and brand', async ({ page }) => {
    await stubSupabaseAuth(page, false);
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Capture every moment, effortlessly' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Organizer Login' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Free Account' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Event Cam' })).toBeVisible();
    await expect(page).toHaveTitle(/Event Cam/i);
  });

  test('navigates to auth pages from public calls to action', async ({ page }) => {
    await stubSupabaseAuth(page, false);
    await page.goto('/');

    await page.getByRole('link', { name: 'Organizer Login' }).click();
    await expect(page).toHaveURL('/auth/login');
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

    await page.goto('/');
    await page.getByRole('link', { name: 'Create Free Account' }).click();
    await expect(page).toHaveURL('/auth/register');
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last name' })).toBeVisible();
  });

  test('renders QR test helper page and builds a scan URL', async ({ page }) => {
    await stubSupabaseAuth(page, false);
    await page.goto('/qr-test');

    await expect(page.getByRole('heading', { name: 'Temporary QR Test Page' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Invite token' }).fill('test-token');
    await page.getByRole('textbox', { name: 'Base URL' }).fill('https://example.com');
    await page.getByRole('button', { name: 'Open scan URL' }).click();

    await expect(page.getByText('QR encodes: https://example.com/scan/test-token')).toBeVisible();
  });

  test.describe('mobile copy flow', () => {
    test.use({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    });

    test('falls back to manual share link when clipboard access fails', async ({ page }) => {
      await stubSupabaseAuth(page, false);

      await page.route('**/api/albums/album-123/public*', (route: Route) => {
        if (route.request().method() !== 'GET') {
          route.continue();
          return;
        }
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            album: { id: 'album-123', title: 'Family Party', event_id: 'event-123' },
            items: [],
          }),
        });
      });

      await page.goto('/albums/album-123/public?token=token-123&password=secret&forceClipboardFailure=1');
      const privateAlbumHeading = page.getByRole('heading', { name: 'Private Album' });
      if (await privateAlbumHeading.isVisible()) {
        await expect(privateAlbumHeading).toBeVisible();

        const openAlbumResponse = page.waitForResponse((response) => {
          const url = response.url();
          return url.includes('/api/albums/album-123/public') && response.status() === 200;
        });

        await page.getByRole('textbox', { name: 'Password' }).fill('secret');
        await openAlbumResponse;
      }

      const copyButton = page.getByRole('button', { name: 'Copy share link' });
      await expect(page.getByRole('heading', { name: 'Family Party' })).toBeVisible();
      await page.getByRole('button', { name: 'Copy share link' }).click();
      await expect(page.getByText('Clipboard blocked. Tap the link below to copy it manually.')).toBeVisible();
      const manualLink = page.getByRole('textbox', { name: 'Manual share link' });
      await expect(manualLink).toHaveValue(/albums\/album-123\/public/);
      await expect(manualLink).toHaveValue(/token=token-123/);
      await expect(manualLink).toHaveValue(/order=newest/);
      await expect(manualLink).toBeEnabled();
    });
  });
});

test.describe('host flows', () => {
  test('redirects unauthorized dashboard access to login', async ({ page }) => {
    await stubSupabaseAuth(page, false);
    await page.route('**/api/events', (route: Route) => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Authentication required' }),
      });
    });

    await page.goto('/dashboard');
    await expect(page).toHaveURL('/auth/login');
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  });

  test('creates event via stepper flow', async ({ page }) => {
    await stubSupabaseAuth(page, true);
    const apiRequest = page.waitForRequest((req) => req.url().endsWith('/api/events') && req.method() === 'POST');

    await page.route('**/api/events', async (route: Route) => {
      if (route.request().method() === 'POST') {
        route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            event: {
              id: 'event-123',
              name: 'Garden Brunch',
            },
          }),
        });
        return;
      }
      route.continue();
    });

    await page.goto('/dashboard/events/new');
    await expect(page).toHaveURL('/dashboard/events/new/1');

    await page.getByRole('textbox', { name: 'Event name' }).fill('Garden Brunch');
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page).toHaveURL('/dashboard/events/new/2');
    await page.getByText('Open event').click();
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page).toHaveURL('/dashboard/events/new/3');
    await page.getByRole('textbox', { name: 'Location' }).fill('Sydney, Australia');
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page).toHaveURL('/dashboard/events/new/4');
    await page.getByRole('button', { name: 'Create Event' }).click();

    const createEventRequest = await apiRequest;
    const payload = JSON.parse(createEventRequest.postData() ?? '{}');
    expect(payload.name).toBe('Garden Brunch');
    await expect(page.getByText('Event created successfully')).toBeVisible();
  });
});
