import { test, expect } from "../src/fixtures/pagefixtures";
import { HomePage } from "../src/pages/HomePage";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test("verify search result count", async ({ homePage, searchResultPage }) => {
  //homePage.

  await homePage.doSearch("MacBook");
  let searchResCount = await searchResultPage.getProductResultCount();
  console.log("Count of the products is ", searchResCount);
  expect(searchResCount).toBe(3);
});

let productRecord = CsvHelper.readCSV('src/test-data/product.csv');
for (let prodData of productRecord) {
  test(`verify the product count for item ${prodData.searchkey},${prodData.productname} `, async ({ homePage, searchResultPage }) => {

    await homePage.doSearch(prodData.searchkey);
    let actualSearchResCount = await searchResultPage.getProductResultCount();
    console.log("Count of the products is ", actualSearchResCount);
    console.log('The expected count is', prodData.resultcount);
    expect(actualSearchResCount).toBe(parseInt(prodData.resultcount));


  })
};

for (let prodData of productRecord) {
  test(`verify user is able to land on ${prodData.productname} with search key ${prodData.searchkey} `, async ({ homePage, searchResultPage, page }) => {

    await homePage.doSearch(prodData.searchkey);
     // console.log('Product Name from csv is ',prodData.productname);
    await searchResultPage.selectProduct(prodData.productname);
    //console.log('title is ', await page.title());
    //console.log('expected title is ',prodData.productname);
    expect(await page.title()).toBe(prodData.productname);

  })
};


test("verify user is able to land on the product page ", async ({
  homePage,
  searchResultPage,
  page,
}) => {
  await homePage.doSearch("MacBook");
  await searchResultPage.selectProduct("MacBook Pro");
  expect(await page.title()).toBe("MacBook Pro");
});
