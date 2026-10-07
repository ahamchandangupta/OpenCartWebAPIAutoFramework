import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_TOKEN;


let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};
let userId: number;

test.describe.serial('running e2e API test ', () => {

    test('get user', async ({ apiHelper }) => {

        let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);

        expect(response.status).toBe(200);
        console.log(response.body);
    });


    test('create user', async ({ apiHelper }) => {

        let userData = {
            name: 'Chandan',
            email: `pw_auto_${Date.now()}@naveen.com`,
            gender: 'male',
            status: 'active'
        };
        let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
        console.log(response.body);
        console.log(response.status);
        expect(response.status).toBe(201);
        userId = response.body.id;
        console.log('Create Use ID from post call is ', userId);

    });


    test('update the user data', async ({ apiHelper }) => {


        let userData = {
            name: 'Chandan_Update',
            status: 'inactive'
        };
        let response = await apiHelper.put(`/public/v2/users/${userId}`, userData, AUTH_HEADER);

        console.log("Put response code", response.status);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(userData.name);
        expect(response.body.status).toBe(userData.status);


    });

    test('delete user', async ({ apiHelper }) => {


        let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
        console.log('After delete status is ', response.status);
        expect(response.status).toBe(204);
    })

});

















