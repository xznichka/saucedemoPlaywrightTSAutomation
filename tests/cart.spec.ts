import { expect, test } from "@playwright/test";
import { CartPage } from "./pages/cart-page";
import { InventoryPage } from "./pages/inventory-page";
import { LoginPage } from "./pages/login-page";

const username = process.env.SAUCEDEMO_USERNAME;
const password = process.env.SAUCEDEMO_PASSWORD;
const productName = "Sauce Labs Backpack";

if (!username || !password) {
  throw new Error("Set SAUCEDEMO_USERNAME and SAUCEDEMO_PASSWORD in .env");
}

test.describe("SauceDemo cart", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).goto();
    await new LoginPage(page).login(username, password);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.openCart();
  });

  test("removes an item from the cart", async ({ page }) => {
    const cartPage = new CartPage(page);
    const inventoryPage = new InventoryPage(page);
    await expect(cartPage.item(productName)).toHaveText(productName);
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");

    await cartPage.removeItem(productName);

    await expect(cartPage.item(productName)).toHaveCount(0);
    await expect(inventoryPage.shoppingCartBadge).toHaveCount(0);
  });

  test("continues shopping from the cart", async ({ page }) => {
    await new CartPage(page).continueShopping();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.title).toHaveText("Products");
    await expect(inventoryPage.product(productName)).toBeVisible();
  });
});
