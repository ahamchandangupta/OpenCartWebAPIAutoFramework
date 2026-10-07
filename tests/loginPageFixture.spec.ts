//import process from 'process';
import { test, expect } from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CsvHelper } from '../src/utils/CsvHelper';
import { XlsxHelper } from '../src/utils/ExcelHelper';
import { JsonReader } from '../src/utils/JsonHelper';
import * as allure from 'allure-js-commons';
import { meta, log, testData } from 'reporting-labs';

test.beforeEach(async ({ loginPage }) => {

    await loginPage.goToLoginPage();

});


test('login page test', async ({ loginPage }) => {

    meta({ priority: 'P2', severity: 'low', owner: 'Chandan', story: 'Jira#01', epic: 'e300', feature: 'F30', issue: 'Bug 1' });
    let pageTile = await loginPage.getPageTitle();
    console.log(pageTile);
    await log('Page title is ', pageTile);
    expect(pageTile).toBe('Account Login')

});

test('forget password link exsits test ', async ({ loginPage }) => {

    // loginPage=new LoginPage(page);
    // await loginPage.goToLoginPage();
    let result = await loginPage.isForgottenPwdExists();
    expect(result).toBeTruthy();
});

test('sucessfull login test', async ({ loginPage, homePage }) => {

    // loginPage=new LoginPage(page);
    // await loginPage.goToLoginPage();
    //Below line is commented due to login details maintained in env file
    //  await loginPage.doLogin('naveenpw@pw.com', 'Naveen@1234');
    meta({ priority: 'P2', severity: 'low', owner: 'Chandan', story: 'Jira#01', epic: 'e300', feature: 'F30', issue: 'Bug 1' });

    await testData({ username: process.env.APP_USERNAME!, password: process.env.APP_PASSWORD }, 'Login');
    await allure.suite("Login Test");
    await allure.severity("Critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify User can login ");

    await allure.step('Login with valid creds', async () => {
        await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    });
    await allure.step('Log out visible ', async () => {
        expect.soft(await homePage.isLogoutVisible()).toBeTruthy();
    });

    await allure.step('Home Page Title ', async () => {
        expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    });



});

//DD Approach 1: CSV file
let filePath = 'src/test-data/logindata.csv';
let testCSVData = CsvHelper.readCSV(filePath);
for (let csvData of testCSVData) {
    test(`CSV: validate a login flow with username as ${csvData.username} and pass as ${csvData.password}`, async ({ loginPage }) => {

        await testData(testCSVData, 'Invalid Login Data ');
        await loginPage.doLogin(csvData.username, csvData.password);
        expect.soft(await loginPage.isValidLoginErrorMsgDisplayed()).toBeTruthy();

    })
};

//DD Approch 2: Excel File

let testXlsxData = XlsxHelper.readXlsx('src/test-data/OpenCartLoginTestData.xlsx', 'login');

for (let testExceldata of testXlsxData) {

    test(`Excel validate invalid login with username ${testExceldata.username} and pass as ${testExceldata.password}`, async ({ loginPage }) => {

        await loginPage.doLogin(testExceldata.username, testExceldata.password);
        expect.soft(await loginPage.isValidLoginErrorMsgDisplayed()).toBeTruthy();

    })

};

//DD Approch:3 JSON File

let jsonData = JsonReader.readJson('src/test-data/logindata.json');

for (let row of jsonData) {

    test(`JSON: valida invalid login for username ${row.username} with pass ${row.password}`, async ({ loginPage }) => {

        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isValidLoginErrorMsgDisplayed()).toBeTruthy();

    })

};


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

