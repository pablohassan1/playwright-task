import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { Navbar } from '../page-objects/navbar';
import { MainCategoryPage } from '../pages/main-category-page';
import { SubCategoryPage } from '../pages/sub-category-page';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  });

test.describe('products browsing', () => {
    test('filter products by color', async ({ page }) => {
      const navbar = new Navbar(page);
      const mainCategoryPage = new MainCategoryPage(page);
      const subCategoryPage = new SubCategoryPage(page);
      
      await navbar.selectNavbarItem('Women');
      await mainCategoryPage.selectSubCategory('Tees');
      await subCategoryPage.expandSideMenuItem('Color');
      await subCategoryPage.selectColor('Purple');
      await subCategoryPage.verifyFilteredProducts({ filteredBy: 'color', value: 'Purple' })
    });
})

