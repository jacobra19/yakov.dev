import { expect, test } from '@playwright/test';

test.describe('site smoke tests', () => {
  test.beforeEach(({ }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'desktop',
      'Smoke tests run on desktop only',
    );
  });

  test('homepage lists blog posts', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/yakov\.dev/i);
    await expect(
      page.getByRole('navigation').getByRole('link', { name: /GitHub/i }),
    ).toBeVisible();
    await expect(page.getByRole('article').first()).toBeVisible();
  });

  test('blog post page renders', async ({ page }) => {
    await page.goto('/recursion-in-react-simplified');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Recursion in React simplified',
    );
  });
});

test.describe('visual regression', () => {
  test('homepage screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main')).toHaveScreenshot('homepage.png', {
      animations: 'disabled',
    });
  });

  test('blog post screenshot', async ({ page }) => {
    await page.goto('/recursion-in-react-simplified');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main')).toHaveScreenshot('blog-post.png', {
      animations: 'disabled',
    });
  });
});
