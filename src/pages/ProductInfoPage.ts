import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {
  private readonly header: Locator;
  private readonly allProductImages: Locator;
  private readonly productInforMetadata: Locator;
  private readonly productPricing: Locator;
  private productInfoMap: Map<string, string | number>;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { level: 1 });
    this.allProductImages = page.locator("#content img");
    this.productInforMetadata = page.locator(
      "div#content ul.list-unstyled:nth-of-type(1) li",
    );
    this.productPricing = page.locator(
      "div#content ul.list-unstyled:nth-of-type(2) li",
    );

    this.productInfoMap = new Map<string, string | number>();
  }
  async getproductHeader(): Promise<string> {
    return await this.header.innerText();
  }
  async getProductImagesCount(): Promise<number> {
    // wait
    await this.allProductImages.first().waitFor({ state: "visible" });
    let productImageCount = await this.allProductImages.count();
    console.log("Product image count is ", productImageCount);
    return productImageCount;
  }

  private async getProductMetaData(): Promise<void> {
    let metaData = await this.productInforMetadata.allInnerTexts();
    for (let data of metaData) {
      let metaInfo = data.split(":");
      let metaKey = metaInfo[0].trim();
      let metaValue = metaInfo[1].trim();
      console.log('meta Value is ',metaValue);
      this.productInfoMap.set(metaKey, metaValue);
    }
  }

  private async getPricingMetaData(): Promise<void> {
    let pricing: string[] = await this.productPricing.allInnerTexts();
    let productPrice = pricing[0].trim();
    console.log("Product Price", productPrice);

    let exTaxPrice = pricing[1].split(":")[1].trim();
    console.log("Ex Tax Price", exTaxPrice);
    this.productInfoMap.set("Product Price", productPrice);
    this.productInfoMap.set("Ex tax price", exTaxPrice);
  }

  async getProductInfo(): Promise<Map<string, string | number>> {
    this.productInfoMap.set("Product Header", await this.getproductHeader());
    this.productInfoMap.set(
      "Product Image Count",
      await this.getProductImagesCount(),
    );
    await this.getProductMetaData();
    await this.getPricingMetaData();

    return this.productInfoMap;
  }
}
