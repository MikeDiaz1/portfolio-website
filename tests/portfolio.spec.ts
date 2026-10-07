import { expect, test } from '@playwright/test';

const base = process.env.BASE_PATH ?? '';
const origin = 'http://127.0.0.1:' + (process.env.PORT ?? '4173');
const examples = [
  { slug: 'medical-image-ai', title: 'Medical-image AI' },
  { slug: 'emergent-garden', title: 'Emergent Garden' },
  { slug: 'nostalgia-simulator', title: 'Nostalgia Simulator' },
  { slug: 'further-down-still', title: 'Further Down, Still' }
];

test('home is a real static document with working profile links and artwork', async ({ page, request }) => {
  const response = await request.get('./');
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain('MASc Biomedical Engineering');
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Work & education' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute('href', 'https://github.com/MikeDiaz1');
  const images = page.locator('.project-card img');
  await expect(images).toHaveCount(4);
  for (const image of await images.all()) {
    await expect(image).toBeVisible();
    expect(await image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
});

test('project links update the main view, URL, title and browser history', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  const projects = page.getByRole('navigation', { name: 'Projects', exact: true });
  await projects.getByRole('link', { name: /Medical-image AI/ }).click();
  await expect(page).toHaveURL(new RegExp(base + '/projects/medical-image-ai/$'));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Medical-image AI');
  await expect(projects.getByRole('link', { name: /Medical-image AI/ })).toHaveAttribute('aria-current', 'page');
  await expect(page).toHaveTitle('Medical-image AI — Michael Diaz-Stewart');
  await projects.getByRole('link', { name: /Emergent Garden/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Emergent Garden');
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Medical-image AI');
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work & education');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Medical-image AI');
  await page.getByRole('link', { name: 'Work & education', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work & education');
  expect(errors).toEqual([]);
});

for (const project of examples) {
  test('direct link and refresh work for ' + project.title, async ({ page, request }) => {
    const response = await request.get('projects/' + project.slug + '/');
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(project.title);
    await page.goto('projects/' + project.slug + '/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    await expect(page.locator('.project-hero img')).toBeVisible();
  });
}

test('sidebar scrolls independently and keeps its position during navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  await page.goto('./');
  const sidebar = page.locator('.project-sidebar');
  await sidebar.evaluate((element) => { element.scrollTop = element.scrollHeight; });
  const before = await sidebar.evaluate((element) => element.scrollTop);
  expect(before).toBeGreaterThan(0);
  expect(await page.locator('main').evaluate((element) => element.scrollTop)).toBe(0);
  await sidebar.getByRole('link', { name: /Further Down, Still/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Further Down, Still');
  expect(await sidebar.evaluate((element) => element.scrollTop)).toBe(before);
  await page.locator('main').evaluate((element) => { element.scrollTop = 250; });
  expect(await sidebar.evaluate((element) => element.scrollTop)).toBe(before);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test('mobile layout has no horizontal overflow and opens projects at the top', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('navigation', { name: 'Projects', exact: true }).getByRole('link', { name: /Nostalgia Simulator/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nostalgia Simulator');
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('link', { name: 'Work & education', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
});

test('pages and links work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(origin + base + '/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work & education');
  await page.getByRole('navigation', { name: 'Projects', exact: true }).getByRole('link', { name: /Emergent Garden/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Emergent Garden');
  await context.close();
});

test('missing pages return a genuine 404 with a working home link', async ({ page }) => {
  const response = await page.goto('projects/not-a-project/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A little off the path.');
  await page.getByRole('link', { name: 'Back to work & education' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work & education');
});

test('the project list is keyboard accessible', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  const project = page.getByRole('navigation', { name: 'Projects', exact: true }).getByRole('link', { name: /Medical-image AI/ });
  await project.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Medical-image AI');
  await expect(page.locator('main')).toBeFocused();
});
