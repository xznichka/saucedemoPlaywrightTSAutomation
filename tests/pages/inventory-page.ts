import type { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  product(name: string) {
    return this.inventoryItems.filter({ hasText: name });
  }

  async addProductToCart(name: string) {
    await this.product(name)
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}
