// spec: Browser Logo Visibility Tests
// seed: tests/example.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Browser Logo Visibility Tests', () => {
  test('should display browser logos', async ({ page }) => {
    // 1. Navigate to https://playwright.dev/
    await page.goto('https://playwright.dev/');

    // Verify that browser logos are visible
    await expect(page.getByRole('img', { name: 'Browsers (Chromium, Firefox, WebKit)' })).toBeVisible();
  });
});