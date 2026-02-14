import { expect, test } from '@playwright/test';

test.describe('public flows', () => {
  test('renders landing page content and brand', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Capture every moment, effortlessly' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Organizer Login' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Free Account' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Event Cam' })).toBeVisible();
    await expect(page).toHaveTitle(/Event Cam/i);
  });

  test('navigates to auth pages from public calls to action', async ({ page }) => {
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
});
