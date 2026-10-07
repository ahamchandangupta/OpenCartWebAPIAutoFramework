import { Locator, Page } from "@playwright/test";
import path from "path";


export class BasePage {

    protected readonly page: Page;

    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;
    protected readonly footerLink: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;




    constructor(page: Page) {

        this.page = page;
        this.logo = page.getByRole('img', { name: 'naveenopencart' });
        this.searchBox = page.getByRole('textbox', { name: 'search' });
        this.searchIcon = page.locator("//div[@id='search']//button");
        this.cartButton = page.locator('div#cart');
        this.currency = page.locator('form#form-currency');
        this.footerLink = page.locator('footer a');

    }


    async isLogoVisible(): Promise<boolean> {
        return this.logo.isVisible();
    };

    async issearchBoxVisible(): Promise<boolean> {
        return this.searchBox.isVisible();
    }
    async iscurrencyVisible(): Promise<boolean> {
        return this.currency.isVisible();
    }
    async isCartVisible(): Promise<boolean> {
        return this.cartButton.isVisible();
    }
    async getPageFooterCount(): Promise<number> {
        return this.footerLink.count();
    }
    async getPageFooter(): Promise<string[]> {
        return this.footerLink.allInnerTexts();
    }


    //page level generic methods
    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    getPageCurrentUrl(): string {
        return this.page.url();
    }

    async waitForPageLoad(): Promise<void> {
        return this.page.waitForLoadState('load');
    }

    async takeScreenshot(name: string) {
        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshot/${name}.png`
        })
    }
}