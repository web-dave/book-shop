import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AngularNgxsWorkshop/);
});

test("get started link", async ({ page }) => {
  await page.goto("/");

  // Click the get started link.
  await expect(page.getByTestId("navigation-toolbar")).toContainText(
    /BOOK MONKEY/
  );
});

test("should show mocked data", async ({ page, proxy, request }) => {
  await page.route("http://localhost:4730/books", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          title: "Angular",
          subtitle:
            "Grundlagen, fortgeschrittene Themen und Best Practices – mit NativeScript und NgRx",
          isbn: "9783864907791",
          abstract:
            "Die Autoren führen Sie mit einem anspruchsvollen Beispielprojekt durch die Welt von Angular... (Buchcover)",
          numPages: 420,
          author: "Johannes Hoppe, Danny Koppenhagen, Ferdinand Malcher",
          publisher: "dpunkt.verlag",
          price: "€ 39.99",
          cover:
            "https://pbs.twimg.com/media/F-g1fHKXMAA182M?format=jpg&name=large",
        },
      ]),
    });
  });

  // await page.on("request", (request) =>
  //   console.log(">>", request.method(), request.url())
  // );

  // await page.waitForResponse(
  //   "https://pbs.twimg.com/media/F-g1fHKXMAA182M?format=jpg&name=large"
  // );

  await page.goto("/");
  // const img = page.getByRole('img');

  // await page.locator.evaluate(
  //   () => image. || new Promise((f) => (image.onload = f))
  // );

  // const promises = locators.map(locator => locator.evaluate(image => image.complete || new Promise(f => image.onload = f)));

  // GET http://localhost:4730/books
});

// {
//   title: "…",
//   subtitle: "…",
//   isbn: "…",
//   abstract: "…",
//   numPages: 123,
//   author: "…",
//   publisher: "…",
//   price: "$..",
//   cover: "http://….png"
// }
