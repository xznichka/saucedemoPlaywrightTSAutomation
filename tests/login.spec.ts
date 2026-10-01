import { expect, test } from "@playwright/test";
import { InventoryPage } from "./pages/inventory-page";
import { LoginPage } from "./pages/login-page";

const username = process.env.SAUCEDEMO_USERNAME;
const password = process.env.SAUCEDEMO_PASSWORD;
const invalidUsername = process.env.SAUCEDEMO_INVALID_USERNAME;
const lockedOutUsername = process.env.SAUCEDEMO_LOCKED_OUT_USERNAME;

if (!username || !password || !invalidUsername || !lockedOutUsername) {
  throw new Error("Set all SauceDemo login variables in .env");
}

test.describe("SauceDemo login", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).goto();
  });

  test("logs in successfully and shows the inventory", async ({ page }) => {
    await new LoginPage(page).login(username, password);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.title).toHaveText("Products");
    await expect(inventoryPage.inventoryItems.first()).toBeVisible();
  });

  test("shows an error for invalid credentials", async ({ page }) => {
    await new LoginPage(page).login(invalidUsername, password);

    await expect(new LoginPage(page).errorMessage).toContainText(
      "Username and password do not match any user in this service",
    );
  });

  test("shows an error for a locked-out user", async ({ page }) => {
    await new LoginPage(page).login(lockedOutUsername, password);

    await expect(new LoginPage(page).errorMessage).toContainText(
      "Sorry, this user has been locked out.",
    );
  });
});
