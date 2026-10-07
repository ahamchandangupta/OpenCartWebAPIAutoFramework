import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

//https://naveenautomationlabs.com/opencart/index.php?route=account/login

export class LoginPage extends BasePage {

    //1. Private Locators
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenPwdLink: Locator;
    private readonly loginErrorMsg: Locator
    //2. Constructor of the child Pages 
    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByLabel('Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenPwdLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginErrorMsg = page.locator('.alert.alert-danger.alert-dismissible');

    }

    //3. Public page action(methods)/behaviour: Encapsulation
    async goToLoginPage(): Promise<void> {

        await this.page.goto('opencart/index.php?route=account/login');

    }

    async getLoginPageTitle(): Promise<string> {

        return await this.page.title();
    }


    async isForgottenPwdExists(): Promise<boolean> {

        return this.forgottenPwdLink.isVisible();
    }

    async doLogin(username: string, pwd: string) {

        console.log(`username : ${username} , password : ${pwd}`);
        await this.emailId.fill(username);
        await this.page.waitForTimeout(2000);
        await this.password.fill(pwd);
        await this.loginBtn.click();


    }
    async isValidLoginErrorMsgDisplayed(): Promise<boolean> {

        return await this.loginErrorMsg.isVisible();
    }

}



