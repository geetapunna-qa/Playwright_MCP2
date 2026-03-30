// spec: Add Highest Priced Item to Cart
// seed: tests/saucedemo-navigation.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigate to SauceDemo', () => {
  test('Navigate to SauceDemo Homepage', async ({ page }) => {
    // Navigate to https://saucedemo.com as the first step in the test
    await page.goto('/');

    // Verify the page title contains 'Swag Labs' as specified in the test plan
    await expect(page.getByText('Swag Labs')).toBeVisible();
  });

  test('Login to SauceDemo', async ({ page }) => {
    // Navigate to https://saucedemo.com
    await page.goto('/');

    // Fill the username field with 'standard_user'
    await page.locator('[data-test="username"]').fill('standard_user');

    // Fill the password field with 'secret_sauce'
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Click the Login button to submit the login form
    await page.locator('[data-test="login-button"]').click();

    // Verify that the login was successful by checking for 'Products' text
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('Login and Add Highest Priced Item to Cart', async ({ page }) => {
    // Navigate to https://saucedemo.com
    await page.goto('/');

    // Fill the username field with 'standard_user'
    await page.locator('[data-test="username"]').fill('standard_user');

    // Fill the password field with 'secret_sauce'
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Click the Login button to submit the login form
    await page.locator('[data-test="login-button"]').click();

    // Verify that the login was successful by checking for 'Products' text
    await expect(page.getByText('Products')).toBeVisible();

    // Find all item prices and parse them to find the highest priced item
    const priceElements = await page.locator('.inventory_item_price').allTextContents();
    const prices = priceElements.map(price => parseFloat(price.replace('$', '')));
    const maxPrice = Math.max(...prices);
    const maxPriceIndex = prices.indexOf(maxPrice);

    // Find the add to cart button for the highest priced item
    const addToCartButtons = page.locator('.btn_inventory');
    await addToCartButtons.nth(maxPriceIndex).click();

    // Verify the cart badge shows '1'
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});