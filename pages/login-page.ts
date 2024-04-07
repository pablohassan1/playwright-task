import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly signInBtn: Locator;
  readonly pageHeader: Locator;
  readonly email: Locator;
  readonly password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInBtn = page.getByTitle('Sign In')
    this.pageHeader = page.getByRole('heading', { name: 'Customer Login' });
    this.email = page.getByTitle('Email');
    this.email = page.getByTitle('Password');
  }

  async goto() {
    await this.page.goto('https://magento.nublue.co.uk/customer/account/login/');
  }

  async verifyPage() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await expect(this.pageHeader).toBeVisible({ timeout: 25000 });
  }

  async fillEmail(emailValue: string) {
    await this.email.fill(emailValue)
  }

  async fillPassword(passwordValue: string) {
    await this.password.fill(passwordValue)
  }

  async submitForm() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await this.signInBtn.waitFor();
    await this.signInBtn.click();
  }

  async login(emailValue: string, passwordValue: string) {
    await this.fillEmail(emailValue);
    await this.fillPassword(passwordValue);
    await this.submitForm();
    await this.verifyPage();
  }
}