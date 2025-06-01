# Test info

- Name: Authentication Flow >> should successfully create account and redirect to sign in
- Location: /Users/Gret/Desktop/Resumes_Helper/e2e/auth.spec.ts:46:3

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toHaveURL(expected)

Locator: locator(':root')
Expected pattern: /\/auth\/signin/
Received string:  "http://localhost:3000/auth/signup?name=Test+User&email=test1748742234565%40example.com&password=password123&confirmPassword=password123"
Call log:
  - expect.toHaveURL with timeout 10000ms
  - waiting for locator(':root')
    13 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://localhost:3000/auth/signup?name=Test+User&email=test1748742234565%40example.com&password=password123&confirmPassword=password123"

    at /Users/Gret/Desktop/Resumes_Helper/e2e/auth.spec.ts:59:24
```

# Page snapshot

```yaml
- heading "Create your account" [level=2]
- paragraph:
  - text: Or
  - link "sign in to your existing account":
    - /url: /auth/signin
- text: Full Name
- textbox "Full Name"
- text: Email Address
- textbox "Email Address"
- text: Password
- textbox "Password"
- text: Confirm Password
- textbox "Confirm Password"
- button "Create account"
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Authentication Flow', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Start from the home page
   6 |     await page.goto('/');
   7 |   });
   8 |
   9 |   test('should redirect to sign in when accessing protected route', async ({ page }) => {
  10 |     await page.goto('/builder');
  11 |     
  12 |     // Should be redirected to sign in page
  13 |     await expect(page).toHaveURL(/\/auth\/signin/);
  14 |     await expect(page.locator('h2')).toContainText('Sign in to Resume Helper');
  15 |   });
  16 |
  17 |   test('should display sign up page correctly', async ({ page }) => {
  18 |     await page.goto('/auth/signup');
  19 |     
  20 |     await expect(page.locator('h2')).toContainText('Create your account');
  21 |     await expect(page.locator('input[name="name"]')).toBeVisible();
  22 |     await expect(page.locator('input[name="email"]')).toBeVisible();
  23 |     await expect(page.locator('input[name="password"]')).toBeVisible();
  24 |     await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
  25 |   });
  26 |
  27 |   test('should show validation errors on invalid sign up', async ({ page }) => {
  28 |     // Navigate with wait for load to prevent navigation interruption in WebKit
  29 |     await page.goto('/auth/signup', { waitUntil: 'networkidle' });
  30 |     
  31 |     // Fill in data that passes HTML5 validation but fails password match
  32 |     await page.fill('input[name="name"]', 'John Doe');
  33 |     await page.fill('input[name="email"]', 'john@example.com');
  34 |     await page.fill('input[name="password"]', 'password123');
  35 |     await page.fill('input[name="confirmPassword"]', 'differentpassword');
  36 |     
  37 |     await page.click('button[type="submit"]');
  38 |     
  39 |     // Wait a moment for React state to update and error to appear
  40 |     await page.waitForTimeout(500);
  41 |     
  42 |     // Should show validation error
  43 |     await expect(page.locator('text=Passwords do not match')).toBeVisible();
  44 |   });
  45 |
  46 |   test('should successfully create account and redirect to sign in', async ({ page }) => {
  47 |     await page.goto('/auth/signup', { waitUntil: 'networkidle' });
  48 |     
  49 |     // Fill in valid data
  50 |     const timestamp = Date.now();
  51 |     await page.fill('input[name="name"]', 'Test User');
  52 |     await page.fill('input[name="email"]', `test${timestamp}@example.com`);
  53 |     await page.fill('input[name="password"]', 'password123');
  54 |     await page.fill('input[name="confirmPassword"]', 'password123');
  55 |     
  56 |     await page.click('button[type="submit"]');
  57 |     
  58 |     // Wait for navigation to complete with longer timeout for slower browsers
> 59 |     await expect(page).toHaveURL(/\/auth\/signin/, { timeout: 10000 });
     |                        ^ Error: Timed out 10000ms waiting for expect(locator).toHaveURL(expected)
  60 |     
  61 |     // Verify we're on the sign-in page with success message
  62 |     await expect(page.locator('h2')).toContainText('Sign in to Resume Helper');
  63 |   });
  64 |
  65 |   test('should display sign in page correctly', async ({ page }) => {
  66 |     await page.goto('/auth/signin');
  67 |     
  68 |     await expect(page.locator('h2')).toContainText('Sign in to Resume Helper');
  69 |     await expect(page.locator('input[name="email"]')).toBeVisible();
  70 |     await expect(page.locator('input[name="password"]')).toBeVisible();
  71 |     await expect(page.locator('button[type="submit"]')).toContainText('Sign in');
  72 |   });
  73 | });
  74 |
  75 | test.describe('Application Navigation', () => {
  76 |   test('should navigate through main pages', async ({ page }) => {
  77 |     await page.goto('/');
  78 |     
  79 |     // Test home page
  80 |     await expect(page).toHaveTitle(/Resume Helper/);
  81 |     
  82 |     // Note: These tests assume authentication is bypassed for now
  83 |     // In a real scenario, you'd need to sign in first
  84 |   });
  85 | });
  86 |
```