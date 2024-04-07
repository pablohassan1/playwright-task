import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/account-page';
import { firstName, lastName, email, password } from '../helper/helper';
import { RegistrationPage } from '../pages/registration-page';
import { Header } from '../page-objects/header';
import { HomePage } from '../pages/home-page';


test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page); 

    await homePage.goto();
  });

test.describe('user registration', () => {
    test('register new user', async ({ page }) => {
        const accountPage = new AccountPage(page);
        const registrationPage = new RegistrationPage(page);  
        const header = new Header(page);  
        
        await header.gotoRegistration(); 
        await registrationPage.verifyPage();
        await registrationPage.registerNewUser({firstNameValue: firstName, lastNameValue: lastName, emailValue: email, passwordValue: password, confirmPasswordValue: password });
        await accountPage.verifyPage();
      });
})


