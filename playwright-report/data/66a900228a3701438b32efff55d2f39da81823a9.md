# Test info

- Name: Authentication Flow >> should successfully create account and redirect to sign in
- Location: /Users/Gret/Desktop/Resumes_Helper/e2e/auth.spec.ts:46:3

# Error details

```
Error: page.goto: Navigation to "http://localhost:3000/auth/signup" is interrupted by another navigation to "http://localhost:3000/"
Call log:
  - navigating to "http://localhost:3000/auth/signup", waiting until "networkidle"

    at /Users/Gret/Desktop/Resumes_Helper/e2e/auth.spec.ts:47:16
```

# Page snapshot

```yaml
- text: ИИ-помощник для создания резюме
- heading "Создавайте идеальные резюме для любой вакансии" [level=1]
- paragraph: Умное приложение, которое анализирует ваши навыки, изучает требования вакансий и создает персонализированные резюме за считанные минуты
- link "Resume Builder":
  - /url: /builder
- link "Profile Setup":
  - /url: /profile
- link "Job Matcher":
  - /url: /matcher
- paragraph: Демо видео работы приложения
- heading "Как это работает" [level=2]
- paragraph: Три простых шага к идеальному резюме
- heading "1. Расскажите о себе" [level=3]
- paragraph: Ответьте на детальные вопросы о ваших навыках, опыте и предпочтениях. Система запомнит всё и будет использовать эту информацию.
- heading "2. Загрузите вакансию" [level=3]
- paragraph: Просто скопируйте текст интересующей вакансии. ИИ проанализирует требования и определит, какие ваши навыки наиболее релевантны.
- heading "3. Получите результат" [level=3]
- paragraph: Персонализированное резюме и сопроводительное письмо, оптимизированные под конкретную вакансию, готовы к отправке.
- heading "Почему Resume Helper?" [level=2]
- heading "Экономия времени" [level=3]
- paragraph: Вместо часов на написание резюме под каждую вакансию - несколько минут
- heading "Больше откликов" [level=3]
- paragraph: Резюме, точно соответствующие требованиям, привлекают больше внимания HR
- heading "Точное попадание" [level=3]
- paragraph: ИИ выбирает именно те навыки и опыт, которые важны для конкретной позиции
- text: 5мин На создание резюме 3x Больше откликов ∞ Резюме для разных сфер 0₽ Бесплатно
- heading "Готовы начать?" [level=2]
- paragraph: Создайте свой первый персонализированный резюме прямо сейчас
- link "Начать настройку профиля":
  - /url: /profile
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
> 47 |     await page.goto('/auth/signup', { waitUntil: 'networkidle' });
     |                ^ Error: page.goto: Navigation to "http://localhost:3000/auth/signup" is interrupted by another navigation to "http://localhost:3000/"
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
  59 |     await expect(page).toHaveURL(/\/auth\/signin/, { timeout: 10000 });
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