import { test, expect } from "@playwright/test";

test("go to form", async ({ page }) => {
  await page.goto("/");
  await page.goto("/books");
  await expect(page.locator("mat-nav-list")).toContainText("New Book");
  await page.getByRole("link", { name: "New Book" }).click();
});
