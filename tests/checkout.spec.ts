import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { Header } from '../page-objects/header';
import { ShippingPage } from '../pages/shipping-page';
import { email, firstName, lastName,  } from '../helper/helper';
import { CartPage } from '../pages/cart-page';
import { PaymentPage } from '../pages/payment-page';
import { OrderConfirmationPage } from '../pages/order-confirmation-page';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  });

test.describe('checkout', () => {
    test('add product to cart and checkout', async ({ page }) => {        
      const homePage = new HomePage(page);
      const header = new Header(page);
      const shippingPage = new ShippingPage(page);
      const cartPage = new CartPage(page);
      const paymentPage = new PaymentPage(page);
      const orderConfirmationPage = new OrderConfirmationPage(page);
      const productName: string = 'Radiant Tee'; 
      const shippingDetails = {
        email,
        firstName,
        lastName,
        streetAddress1: 'test1',
        streetAddress2: 'test2',
        streetAddress3: 'test3',
        country: 'Czechia',
        stateProvince: 'Morava',
        city: 'Brno',
        zip: '78501',
        phone: '+420771618746'
      }

      await homePage.addProductToCart(productName);
      await homePage.verifySuccessMessage(productName);
      await header.verifyCartItemsCount('1');
      await homePage.shoppingCartLink.click()
      await cartPage.proceedToCheckout();
      await shippingPage.verifyPage();
      await shippingPage.fillShippingDetails(shippingDetails);
      await shippingPage.checkShippingMethod(0);
      await shippingPage.submitShippingDetails();
      await paymentPage.checkBilingAdressSameAsShipping();
      await paymentPage.placeOrder();
      await orderConfirmationPage.verifyPage();
    });
})