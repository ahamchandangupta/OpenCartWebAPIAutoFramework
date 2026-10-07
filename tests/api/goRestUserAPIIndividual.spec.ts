
import { test, expect } from "../../src/fixtures/apifixtures";


const TOKEN = process.env.API_TOKEN;


let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

async function createUser(apiHelper: any) {

    let userData = {
        name: 'Auto_User',
        email: `pw_auto_${Date.now()}@naveen.com`,
        gender: 'male',
        status: 'active'
    };
    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;

}
//1. Create User
test('Create User ', async ({ apiHelper }) => {

    let userResponse = await createUser(apiHelper);

    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(await getResponse.body.name).toBe('Auto_User');

});

//2.Update User

test('Update user', async ({ apiHelper }) => {

    //Step:1 Create User
    let userResponse = await createUser(apiHelper);

    //Step 2: Get user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(await getResponse.body.name).toBe('Auto_User');

    //Step 3: Update a User
    let updateBody = {
        name: 'API_Auto_Update',
        status: 'inactive'
    }

    let updateResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`, updateBody, AUTH_HEADER);

    expect(updateResponse.status).toBe(200);
    expect.soft(updateResponse.body.name).toBe(updateBody.name);
    expect.soft(updateResponse.body.status).toBe(updateBody.status);


    //Step 4: Get a User:

    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(await getResponse.body.name).toBe(updateBody.name);
    expect(await getResponse.body.status).toBe(updateBody.status);
});


//3.Delete User

test('Delete user', async ({ apiHelper }) => {

    //Step:1 Create User
    let userResponse = await createUser(apiHelper);

    //Step 2: Get user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(await getResponse.body.name).toBe('Auto_User');

    //Step 3: Delete a User

    let updateResponse = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);

    expect(updateResponse.status).toBe(204);
    
    //Step 4: Get a User:

    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(await getResponse.body.message).toBe('Resource not found');

});

