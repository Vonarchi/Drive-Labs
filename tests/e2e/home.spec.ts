import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('renders title and primary CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Drive/i);
    await expect(page.getByRole('button', { name: /new project/i })).toBeVisible();
  });
});
