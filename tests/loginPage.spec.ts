import {test,expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";


let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async ({page}) =>{
    
    loginPage=new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage=new HomePage(page);
});


test.skip('login page',async() =>{

    //Below 2 line can be removed and can be used in beforeEach hooks
    //Also page destructuring can be removed from each test method
    // loginPage=new LoginPage(page);
    // await loginPage.goToLoginPage();
    let pageTile= await loginPage.getLoginPageTitle();
    console.log(pageTile);
    expect(pageTile).toBe('Account Login')

});

test.skip('forget password link exsits test ',async() =>{

    // loginPage=new LoginPage(page);
    // await loginPage.goToLoginPage();
   let result=await loginPage.isForgottenPwdExists();
    expect(result).toBeTruthy();
});

test.skip('sucessfull login test',async() =>{

    // loginPage=new LoginPage(page);
    // await loginPage.goToLoginPage();
   await loginPage.doLogin('naveenpw@pw.com', 'Naveen@1234');
   expect.soft(await homePage.isLogoutVisible()).toBeTruthy();
   expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});