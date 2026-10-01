import { expect, test } from "@playwright/test";
import { DynamicCatalogSliderPage } from "./pages/dynamic-catalog-slider-page";
import { LoginPage } from "./pages/login-page";

const username = process.env.SAUCEDEMO_USERNAME;
const password = process.env.SAUCEDEMO_PASSWORD;

if (!username || !password) {
  throw new Error("Set SAUCEDEMO_USERNAME and SAUCEDEMO_PASSWORD in .env");
}

const sliderProducts = [
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt",
  "Sauce Labs Onesie",
  "Test.allTheThings() T-Shirt (Red)",
  "Sauce Labs Backpack",
  "Sauce Labs Fleece Jacket",
];

test.describe("SauceDemo dynamic catalog slider", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).goto();
    await new LoginPage(page).login(username, password);
    await expect(page).toHaveURL(/\/inventory\.html$/);

    const sliderPage = new DynamicCatalogSliderPage(page);
    await sliderPage.goto();
    await expect(sliderPage.sliderContainer).toBeVisible();
  });

  test("each selector displays its matching product", async ({ page }) => {
    const sliderPage = new DynamicCatalogSliderPage(page);
    for (const product of sliderProducts) {
      await sliderPage.selectProduct(product);

      await expect(sliderPage.selectedProductName).toHaveText(product);
      await expect(sliderPage.selectedProductImage).toHaveAttribute(
        "alt",
        product,
      );
    }
  });
});
