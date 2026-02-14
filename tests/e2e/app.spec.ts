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
