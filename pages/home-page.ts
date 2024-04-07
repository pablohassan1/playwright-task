import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly products: Locator;
  readonly successMessage: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('li.product-item');
    this.successMessage = page.locator('[data-ui-id="message-success"]');
    this.shoppingCartLink = page.getByRole('link', { name: 'shopping cart' });
  }

  async goto() {
    await this.page.goto('https://magento.nublue.co.uk/');
    await this.verifyPage();
  }

  async verifyPage() {
    await expect(this.page).toHaveTitle(/Home Page/);
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator(`.product-item:has-text("${productName}")`);
    const productSizes = product.locator('.size');
    const productColors = product.locator('.color');

    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    productSizes && await productSizes.locator('.swatch-option>>nth=0').click();
    productColors && await productColors.locator('.swatch-option>>nth=0').click();
    await product.waitFor();
    await product.getByTitle('Add to Cart').click();
  }

  async verifySuccessMessage(textToVerify: string) {
    await expect(this.successMessage).toContainText(textToVerify)
  }
}






