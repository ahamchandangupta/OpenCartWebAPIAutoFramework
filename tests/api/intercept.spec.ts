import { test, expect } from '@playwright/test';



//Intercept the network calls and log them
test('Intercept the network calls ', async ({ page }) => {

    //wildcard pattern
    await page.route('**/*', async (route) => {

        console.log(route.request().method(), route.request().url());
        // url 1 --- capture -- continue -- url 2 capture -- continue
        await route.continue();


    });
    //navifate to page
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

});


//Intercept with mocking
//Mocking fake data response

test('Mocking search data api ', async ({ page }) => {

    let fakeProducts = [
        { name: 'fake mackbook pro', price: '$500' },
        { name: 'fake iphone 18 pro', price: '$7000' },
    ];
    //https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook
    await page.route('**/opencart/index.php?route=product/search&search=macbook', async (route) => {

        route.fulfill({
            status: 200,
            body: JSON.stringify(fakeProducts),
            contentType: 'application/json'
            //can be used for contentType:'text/html' in body give html content
        });
    });

    await page.goto('https://anyrandomwebsite.com/opencart/index.php?route=product/search&search=macbook');
    await page.pause();
})