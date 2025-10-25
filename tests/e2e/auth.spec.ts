import { test, expect } from '@playwright/test';

const EMAIL = process.env.E2E_EMAIL!;
const PASS  = process.env.E2E_PASSWORD!;

test.skip(!EMAIL || !PASS, 'E2E_EMAIL/E2E_PASSWORD not set');

test('sign in → dashboard visible', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill(EMAIL);
  await page.getByLabel(/password/i).fill(PASS);
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/dashboard/i);
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
