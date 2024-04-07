import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly header: Locator;
  readonly successMessage: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.getByRole('heading', { name: 'Shopping Cart' })
    this.checkoutBtn = this.page.getByRole('button', { name: 'Proceed to Checkout' });
  }

  async goto() {
    await this.page.goto('https://magento.nublue.co.uk/checkout/cart/');
    await this.verifyPage();
  }

  async verifyPage() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await expect(this.header).toBeVisible({ timeout: 25000 });
  }

  async proceedToCheckout() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await this.checkoutBtn.waitFor();
    await this.checkoutBtn.click({ force: true });
  }
}






