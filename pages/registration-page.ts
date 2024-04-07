import { expect, type Locator, type Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly createAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.getByRole('heading', { name: 'Create New Customer Account' });
    this.firstName = page.getByTitle('First Name');
    this.lastName = page.getByTitle('Last Name');
    this.email = page.getByTitle('Email');
    this.password = page.getByRole('textbox', { name: 'Password*' });
    this.confirmPassword = page.getByLabel('Confirm Password');
    this.createAccountBtn = page.getByTitle('Create an Account');
    }

  async goto() {
    await this.page.goto('https://magento.nublue.co.uk/customer/account/create/');
  }

  async verifyPage() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await expect(this.pageHeader).toBeVisible({ timeout: 25000 });
  }

  async fillFirstName(firstNameValue: string) {
    await this.firstName.fill(firstNameValue);
  }

  async fillLastName(lastNameValue: string) {
    await this.lastName.fill(lastNameValue);
  }

  async fillEmail(emailValue: string) {
    await this.email.fill(emailValue);
  }

  async fillPassword(passwordValue: string) {
    await this.password.fill(passwordValue);
  }

  async fillConfirmPassword(confirmPasswordValue: string) {
    await this.confirmPassword.fill(confirmPasswordValue);
  }

  async submitForm() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await this.createAccountBtn.waitFor();
    await this.createAccountBtn.click();
  }

  async registerNewUser({ firstNameValue, lastNameValue, emailValue, passwordValue, confirmPasswordValue }: {firstNameValue: string, lastNameValue: string, emailValue: string, passwordValue: string, confirmPasswordValue: string}) {
    await this.fillFirstName(firstNameValue);
    await this.fillLastName(lastNameValue);
    await this.fillEmail(emailValue);
    await this.fillPassword(passwordValue);
    await this.fillConfirmPassword(confirmPasswordValue);
    await this.submitForm();
  }
}