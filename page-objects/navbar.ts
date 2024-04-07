import { type Locator, type Page } from '@playwright/test';

export class Navbar {
  readonly page: Page;  
  readonly navbar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = page.locator('[data-action="navigation"]');
    }

  async selectNavbarItem(itemName: string) {
    const item = this.navbar.locator(`.level0:has-text("${itemName}")`);
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await item.waitFor();
    await item.click();
  }
}
