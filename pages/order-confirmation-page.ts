import { expect, type Locator, type Page } from '@playwright/test';

export class OrderConfirmationPage {
  readonly page: Page;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator('.page-title:has-text("Thank you for your purchase!")');
  }

  async verifyPage() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await this.header.waitFor();
    await expect(this.header).toBeVisible({ timeout: 25000 });
  }
}






