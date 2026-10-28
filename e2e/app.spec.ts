import { expect, test } from '@playwright/test';

test("user's edited resume data persists after reload", async ({ page }) => {
  await page.goto('/');

  // check dashboard title
  await expect(page).toHaveTitle('cvee');

  // create new resume by pressing `new cv` button
  // which redirects to /editor route
  await page
    .getByRole('button', {
      name: /new cv/i,
    })
    .click();

  // check the route is editor
  await expect(page).toHaveURL(/editor/);

  const fullName = 'Ashik Dhimal';
  await page
    .getByRole('textbox', {
      name: /full name/i,
    })
    .fill(fullName);

  // verify preview updates
  await expect(
    page.getByRole('heading', {
      name: fullName,
    }),
  ).toBeVisible();
  await expect(page).toHaveTitle(`${fullName}'s-resume`);

  // reload editor page
  //
  // @NOTE: editor have 500ms debounce timeout to persist value in DB
  // @TODO: remove wait timeout with more good approach like
  // instead relying on fixed time, use status approach
  // like `saved` or progress
  await page.waitForTimeout(600);
  await page.reload();

  // verify editor and preview is still have persisted detail after reload
  await expect(
    page.getByRole('textbox', {
      name: /full name/i,
    }),
  ).toHaveValue(fullName);
  await expect(
    page.getByRole('heading', {
      name: fullName,
    }),
  ).toBeVisible();

  // verify export button is visible
  let btnPrint = page.getByRole('button', {
    name: /export/i,
  });
  await expect(btnPrint).toBeVisible();

  // redirect to dashboard to check cv is available
  await page.getByRole('button', { name: /dashboard/i }).click();
  await expect(page.getByText(/untitled/i)).toBeVisible();

  // reload the page and verify resume is still exist
  await page.reload();

  await expect(page.getByText(/untitled/i)).toBeVisible();
});
