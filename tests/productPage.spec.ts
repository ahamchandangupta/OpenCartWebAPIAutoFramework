import { test, expect } from "../src/fixtures/pagefixtures";
import { HomePage } from "../src/pages/HomePage";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test("verify the product header", async ({
  homePage,
  searchResultPage,
  productInfoPage,
  page,
}) => {
  await homePage.doSearch("Macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  expect(await productInfoPage.getproductHeader()).toBe("MacBook Pro");
});

test("verify image count", async ({
  homePage,
  searchResultPage,
  productInfoPage,
}) => {
  await homePage.doSearch("samsung");
  await searchResultPage.selectProduct("Samsung Galaxy Tab 10.1");
  expect(await productInfoPage.getProductImagesCount()).toBe(7);
});

test("Verify Product Info Meta data", async ({
  homePage,
  searchResultPage,
  productInfoPage,
}) => {
  await homePage.doSearch("Macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  let actualProductInfoMap = await productInfoPage.getProductInfo();
  console.log("Actual Product Details : ", actualProductInfoMap);

  expect.soft(actualProductInfoMap.get('Product Header')).toBe('MacBook Pro');
  expect.soft(actualProductInfoMap.get('Product Image Count')).toBe(4);
  expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
  expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
  expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
  expect.soft(actualProductInfoMap.get('Product Price')).toBe('$2,000.00');
  expect.soft(actualProductInfoMap.get('Ex tax price')).toBe('$2,000.00');

});
