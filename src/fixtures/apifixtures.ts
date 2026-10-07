import { test as baseTest, expect, request } from '@playwright/test';
import { APIHelper } from '../api/APIHelper';


//define types of api fixture
type APIFixturestypes = {

    apiHelper: APIHelper

}
export let test = baseTest.extend<APIFixturestypes>({

    apiHelper: async ({ request }, use) => {

        let apiHelper = new APIHelper(request, process.env.API_BASE_URL!);
        await use(apiHelper);
    }


});

export { expect } from '@playwright/test';

