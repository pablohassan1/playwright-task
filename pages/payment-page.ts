import { expect, type Locator, type Page } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;
  readonly header: Locator;
  readonly placeOrderBtn: Locator;
  readonly billingAddressSameAsShippingCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page. getByText('Payment Method', { exact: true });
    this.placeOrderBtn = this.page.locator('button[title="Place Order"]');
    this.billingAddressSameAsShippingCheckbox = this.page.locator('input[name="billing-address-same-as-shipping"]');
  }

  async verifyPage() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await this.header.waitFor();
    await this.page.locator('.shipping-information-title:has-text("Ship To")').waitFor()
    await this.page.locator('.shipping-information-content').nth(0).waitFor()
    await expect(this.header).toBeVisible({ timeout: 25000 });
  }

  async placeOrder() {
    await this.verifyPage()
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await this.placeOrderBtn.waitFor();
    await this.placeOrderBtn.dispatchEvent('click');
  }
  
  async checkBilingAdressSameAsShipping() {
    const checkbox = this.billingAddressSameAsShippingCheckbox;
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await checkbox.waitFor()
    await checkbox.check();
  }
}






