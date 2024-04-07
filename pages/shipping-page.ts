import { expect, type Locator, type Page } from '@playwright/test';

export class ShippingPage {
  readonly page: Page;
  readonly shippingDetailsSection: Locator;
  readonly pageHeader: Locator;
  readonly email: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly streetAddress1: Locator;
  readonly streetAddress2: Locator;
  readonly streetAddress3: Locator;
  readonly country: Locator;
  readonly stateProvince: Locator;
  readonly city: Locator;
  readonly zip: Locator;
  readonly phone: Locator;
  readonly nextBtn: Locator;
  readonly shippingMethodSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shippingDetailsSection = page.locator('#shipping');
    this.pageHeader = this.shippingDetailsSection.locator('[data-role="title"]:has-text("Shipping Address")')
    this.email = this.shippingDetailsSection.locator('input[name="username"]');
    this.firstName = this.shippingDetailsSection.locator('input[name="firstname"]');
    this.lastName = this.shippingDetailsSection.locator('input[name="lastname"]');
    this.streetAddress1 = this.shippingDetailsSection.locator('input[name="street[0]"]');
    this.streetAddress2 = this.shippingDetailsSection.locator('input[name="street[1]"]');
    this.streetAddress3 = this.shippingDetailsSection.locator('input[name="street[2]"]');
    this.country = this.shippingDetailsSection.locator('[name="shippingAddress.country_id"]  select');
    this.stateProvince = this.shippingDetailsSection.locator('#shippingAddress.region_id');
    this.city = this.shippingDetailsSection.locator('input[name="city"]');
    this.zip = this.shippingDetailsSection.locator('input[name="postcode"]');
    this.phone = this.shippingDetailsSection.locator('input[name="telephone"]');
    this.nextBtn = this.page.getByRole('button', { name: 'Next'});
    this.shippingMethodSection = this.page.locator('.table-checkout-shipping-method');
  }

  async verifyPage() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await expect(this.pageHeader).toBeVisible({ timeout: 25000 });
  }

  async fillShippingDetails(shippingDetails: any) {
    await this.email.fill(shippingDetails.email);
    await this.firstName.fill(shippingDetails.firstName);
    await this.lastName.fill(shippingDetails.lastName);
    await this.streetAddress1.fill(shippingDetails.streetAddress1);
    await this.streetAddress2.fill(shippingDetails.streetAddress2);
    await this.streetAddress3.fill(shippingDetails.streetAddress3);
    await this.country.selectOption(shippingDetails.country);
    await this.city.fill(shippingDetails.city);
    await this.zip.fill(shippingDetails.zip);
    await this.phone.fill(shippingDetails.phone);
  }

  async checkShippingMethod(index: number) {
    const shippingMethodCheckbox = this.shippingMethodSection.getByRole('radio').nth(index);
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await shippingMethodCheckbox.waitFor();
    await shippingMethodCheckbox.check();
  }

  async submitShippingDetails() {
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await this.nextBtn.waitFor();
    await this.nextBtn.click();
  }
}






