import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class HomePage extends BasePage {


    private readonly logoutLink: Locator;
    private readonly headers: Locator;
    private readonly searchBox: Locator;
    private readonly searchIcon: Locator;

    constructor(page: Page) {

        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('#search button i')
    }

    async isLogoutVisible(): Promise<boolean> {

        return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders(): Promise<string[]> {

        return await this.headers.allInnerTexts();

    }
    async getHomePageTitle(): Promise<string> {

        return await this.page.title();
    }

    async doSearch(searchKey: string): Promise<void> {

       
        console.log('entering the value as ', searchKey);
        await this.searchBox.fill(searchKey);
        // await this.page.waitForTimeout(10000);
        await this.searchIcon.click();

    }


}