import { expect, type Locator, type Page } from '@playwright/test';

export class SubCategoryPage {
  readonly page: Page;
  readonly sideMenu: Locator;
  readonly displayedProducts: Locator;
  readonly displayedProductsColorSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sideMenu = this.page.locator('.filter-options');
    this.displayedProducts = this.page.locator('li.product-item');
    this.displayedProductsColorSection = this.displayedProducts.locator('[data-attribute-code="color"]')
  }

  async expandSideMenuItem(sideMenuItem: string) {
    const item = this.sideMenu.locator(`[role="presentation"]:has-text("${sideMenuItem}")`); 

    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await item.waitFor();
    await item.click();
  }

  async selectColor(color: string) {
    const item = this.sideMenu.locator(`[data-option-label="${color}"]`); 
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    await item.waitFor();
    await item.click();
  }

  async verifyFilteredProducts({ filteredBy, value }: { filteredBy: string, value: string }) {
      switch (filteredBy) {
        case 'color':
          for(let i = 0; i < await this.displayedProductsColorSection.count(); i++) {
            const element = this.displayedProductsColorSection.nth(i);
            
            await expect(element.locator(`[aria-label="${value}"]`)).toHaveClass('selected');
          }
          break;
      
        default:
          break;
      }
  }

}


