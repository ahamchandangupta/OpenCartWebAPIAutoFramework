
import { test, expect } from "../src/fixtures/pagefixtures";

test.beforeEach('test', async ({ loginPage }) => {

    await loginPage.goToLoginPage();
    await loginPage.doLogin('naveenpw@pw.com', 'Naveen@1234');

});

test('Verify Home Page title', async ({ homePage }) => {

    expect(await homePage.getHomePageTitle()).toBe('My Account');
});

test('is logout visible', async ({ homePage }) => {

    expect(await homePage.isLogoutVisible()).toBeTruthy();
});

test('verify Home Page headers', async ({ homePage }) => {

    let allHeaders: string[] = await homePage.getHomePageHeaders();
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});


//Common feature test:

test('App logo exists', async ({ basePage }) => {

    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('Cart exists', async ({ basePage }) => {

    expect(await basePage.isCartVisible()).toBeTruthy();
});
test('Search Box', async ({ basePage }) => {

    expect(await basePage.issearchBoxVisible()).toBeTruthy();
});

test('Footer link', async ({ basePage }) => {

    expect(await basePage.getPageFooterCount()).toBe(16);
});