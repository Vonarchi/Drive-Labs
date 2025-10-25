import { test, expect } from '@playwright/test';

test('create project modal → create', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: /new project/i }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByLabel(/project name/i).fill('labs-demo');
  await page.getByRole('button', { name: /create/i }).click();
  await expect(page.getByText(/pipeline completed/i)).toBeVisible({ timeout: 10_000 });
});
