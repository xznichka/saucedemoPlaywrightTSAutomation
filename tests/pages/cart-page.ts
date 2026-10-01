import type { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
  }

  item(name: string) {
    return this.itemNames.filter({ hasText: name });
  }

  async removeItem(name: string) {
    const item = this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: name });
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
