import test, { expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage"

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach('test', async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME , process.env.APP_PASSWORD);

    homePage = new HomePage(page);

});

test.skip('Verify Home Page title', async () => {

    expect(await homePage.getHomePageTitle()).toBe('My Account');
});

test.skip('is logout visible', async () => {

    expect( await homePage.isLogoutVisible()).toBeTruthy();
});

test.skip('verify Home Page headers', async () => {

   let allHeaders:string[]= await homePage.getHomePageHeaders();
   expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter' 
        ]);
});