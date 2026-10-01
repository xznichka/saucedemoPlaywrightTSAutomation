import { expect, test } from "@playwright/test";
import { CartPage } from "./pages/cart-page";
import { CheckoutPage } from "./pages/checkout-page";
import { InventoryPage } from "./pages/inventory-page";
import { LoginPage } from "./pages/login-page";

const username = process.env.SAUCEDEMO_USERNAME;
const password = process.env.SAUCEDEMO_PASSWORD;
const productName = "Sauce Labs Backpack";

if (!username || !password) {
  throw new Error("Set SAUCEDEMO_USERNAME and SAUCEDEMO_PASSWORD in .env");
}

test.describe("SauceDemo checkout", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).goto();
    await new LoginPage(page).login(username, password);
    await new InventoryPage(page).addProductToCart(productName);
  });

  test("completes a purchase successfully", async ({ page }) => {
    await new InventoryPage(page).openCart();
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await expect(cartPage.item(productName)).toHaveText(productName);
    await expect(checkoutPage.itemQuantity).toHaveText("1");
    await cartPage.checkoutButton.click();

    await checkoutPage.enterInformation("Casey", "Tester", "10001");

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkoutPage.item(productName)).toHaveText(productName);
    await checkoutPage.finishButton.click();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(checkoutPage.completeHeader).toHaveText(
      "Thank you for your order!",
    );
  });

  test("requires first name before continuing checkout", async ({ page }) => {
    await new InventoryPage(page).openCart();
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await cartPage.checkoutButton.click();
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: First Name is required",
    );
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
});
