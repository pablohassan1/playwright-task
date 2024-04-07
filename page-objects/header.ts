import { expect, type Locator, type Page } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly header: Locator;
  readonly signInBtn: Locator;
  readonly createAccountBtn: Locator;
  readonly cartItemsCounter: Locator;
  readonly miniCart: Locator;
  readonly proceedToCheckoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
    this.signInBtn = this.header.getByRole('link', {name: 'Sign In'});
    this.createAccountBtn = this.header.getByRole('link', { name: 'Create an Account' });
    this.cartItemsCounter = this.header.locator('.counter-number');
    }

  async gotoLogin() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await this.signInBtn.waitFor();
    await this.signInBtn.click();
  }

  async gotoRegistration() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await this.createAccountBtn.waitFor();
    await this.createAccountBtn.click();
  }

  async verifyCartItemsCount(expectedCount: string) {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await expect(this.cartItemsCounter).toHaveText(expectedCount, { timeout: 50000 });
  }
}