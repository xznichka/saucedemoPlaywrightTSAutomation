import type { Locator, Page } from "@playwright/test";

export class DynamicCatalogSliderPage {
  readonly page: Page;
  readonly sliderContainer: Locator;
  readonly selectedProductName: Locator;
  readonly selectedProductImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sliderContainer = page.locator(
      '[data-test="dynamic-catalog-slider-container"]',
    );
    this.selectedProductName = page.locator(
      '[data-test="dynamic-catalog-slider-item-name"]',
    );
    this.selectedProductImage = page.locator(
      '[data-test="dynamic-catalog-slider-item-img"]',
    );
  }

  async goto() {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
    await this.page
      .locator('[data-test="dynamic-catalog-sidebar-link"]')
      .click();
    await this.page
      .locator('[data-test="dynamic-catalog-slider-link"]')
      .click();
  }

  async selectProduct(name: string) {
    await this.page.getByRole("button", { name: `Show ${name}` }).click();
  }
}
