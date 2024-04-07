import { expect, type Locator, type Page } from '@playwright/test';

export class AccountPage {
  readonly page: Page;
  readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.getByRole('heading', { name: 'My Account' });
  }

  async goto() {
    await this.page.goto('https://magento.nublue.co.uk/customer/account/');
  }

  async verifyPage() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await expect(this.pageHeader).toBeVisible({ timeout: 25000 });
  }
}






