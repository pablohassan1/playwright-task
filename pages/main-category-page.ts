import { type Locator, type Page } from '@playwright/test';

export class MainCategoryPage {
  readonly page: Page;
  readonly categoriesMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoriesMenu = this.page.locator('.categories-menu');
  }

  async selectSubCategory(categoryName: string) {
    const item = this.categoriesMenu.getByText(categoryName); 
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await item.waitFor();
    await item.click();
  }
}


