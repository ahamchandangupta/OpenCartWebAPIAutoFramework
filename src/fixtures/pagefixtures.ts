
import { test as baseTest } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultPage } from '../pages/SearchResultPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';

type Pagefixtures = {

    basePage: BasePage;
    loginPage: LoginPage
    homePage: HomePage;
    searchResultPage: SearchResultPage;
    productInfoPage: ProductInfoPage;

}

//Now extend the playwright test using extend : inheritance


export let test = baseTest.extend<Pagefixtures>({
    //here use is having default keyword 
    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {

        let loginPage = new LoginPage(page);
        await use(loginPage);

    },

    homePage: async ({ page }, use) => {

        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResultPage: async ({ page }, use) => {
        let searchResultPage = new SearchResultPage(page);
        await use(searchResultPage);
    },
    productInfoPage: async ({ page }, use) => {

        let productInfoPage = new ProductInfoPage(page);
        use(productInfoPage);

    }


});

//Wrong export 
//export let expect=expect;
//----

export { expect } from '@playwright/test';

