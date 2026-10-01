import { expect, test } from "@playwright/test";
import { InventoryPage } from "./pages/inventory-page";
import { LoginPage } from "./pages/login-page";

const username = "performance_glitch_user";
const password = "secret_sauce";

test.describe("SauceDemo account profiles", () => {
  test("performance glitch user eventually loads the inventory", async ({
    page,
  }) => {
    await new LoginPage(page).goto();
    await new LoginPage(page).login(username, password);

    await page.waitForURL(/\/inventory\.html$/);
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.title).toHaveText("Products", {
      timeout: 30_000,
    });
    await expect(inventoryPage.inventoryItems.first()).toBeVisible();
  });
});
