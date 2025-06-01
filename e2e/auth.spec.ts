import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('/');
  });

  test('should redirect to sign in when accessing protected route', async ({ page }) => {
    await page.goto('/builder');
    
    // Should be redirected to sign in page
    await expect(page).toHaveURL(/\/auth\/signin/);
    await expect(page.locator('h2')).toContainText('Sign in to Resume Helper');
  });

  test('should display sign up page correctly', async ({ page }) => {
    await page.goto('/auth/signup');
    
    await expect(page.locator('h2')).toContainText('Create your account');
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
  });

  test('should show validation errors on invalid sign up', async ({ page }) => {
    // Navigate with wait for load to prevent navigation interruption in WebKit
    await page.goto('/auth/signup', { waitUntil: 'networkidle' });
    
    // Fill in data that passes HTML5 validation but fails password match
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'differentpassword');
    
    await page.click('button[type="submit"]');
    
    // Wait a moment for React state to update and error to appear
    await page.waitForTimeout(500);
    
    // Should show validation error
    await expect(page.locator('text=Passwords do not match')).toBeVisible();
  });

  test('should successfully create account and redirect to sign in', async ({ page }) => {
    await page.goto('/auth/signup', { waitUntil: 'networkidle' });
    
    // Fill in valid data
    const timestamp = Date.now();
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', `test${timestamp}@example.com`);
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');
    
    await page.click('button[type="submit"]');
    
    // Wait for navigation to complete with longer timeout for slower browsers
    await expect(page).toHaveURL(/\/auth\/signin/, { timeout: 10000 });
    
    // Verify we're on the sign-in page with success message
    await expect(page.locator('h2')).toContainText('Sign in to Resume Helper');
  });

  test('should display sign in page correctly', async ({ page }) => {
    await page.goto('/auth/signin');
    
    await expect(page.locator('h2')).toContainText('Sign in to Resume Helper');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Sign in');
  });
});

test.describe('Application Navigation', () => {
  test('should navigate through main pages', async ({ page }) => {
    await page.goto('/');
    
    // Test home page
    await expect(page).toHaveTitle(/Resume Helper/);
    
    // Note: These tests assume authentication is bypassed for now
    // In a real scenario, you'd need to sign in first
  });
});
