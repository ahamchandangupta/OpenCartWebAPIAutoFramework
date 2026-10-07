import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";




export class SearchResultPage extends BasePage {

    private readonly searchResultsLoc: Locator;

    constructor(page: Page) {
        super(page);
        this.searchResultsLoc = page.locator('div.product-layout');


    }


    async getProductResultCount(): Promise<number> {

        return await this.searchResultsLoc.count();
    }

    async selectProduct(productName: string): Promise<void> {

        console.log('Product name is ', productName);
        await this.page.getByRole('link', { name: productName, exact: true }).first().click();
    }
}

