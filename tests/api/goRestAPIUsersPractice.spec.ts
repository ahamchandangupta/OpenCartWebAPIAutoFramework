import { test, expect, request } from "@playwright/test"



let AUTH_TOKEN = {

    Authorization: 'Bearer 4912aeb93ec923c4f370822ed824ba9c2d8e3c5f5c30b1223c08687c84d9ad5d'
}
test('get all users API test', async ({ request }) => {

    let response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });

    //console.log(response);

    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log('Status is : ', response.status());
    console.log('Status test is : ', response.statusText());
    expect(response.status()).toBe(200)

});

test('create a POST user', async ({ request }) => {

    let userData = {
        name: 'Chandan',
        email: `pw_auto_${Date.now()}@naveen.com`,
        gender: 'male',
        status: 'active'
    };
    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    })
    console.log(await response.body());
    console.log('status code is : ', response.status());
    console.log('status text is :', response.statusText());
    console.log('Response json is :', await response.json());
    expect(response.status()).toBe(201);

});


test('update user using PUT call', async ({ request }) => {

    let userData = {
        name: 'Chandand',
        email: 'abc@de3fdd.com',
        gender: 'male',
        status: 'inactive'
    }

    let response = await request.put('https://gorest.co.in/public/v2/users/8617630', {
        headers: AUTH_TOKEN,
        data: userData
    })

    console.log('Response json :', await response.json());
    console.log('Status text ', response.statusText());
    console.log('status code', response.status());


});

test('delete the user API data', async ({ request }) => {


    let response = await request.delete('https://gorest.co.in/public/v2/users/8617640', {

        headers: AUTH_TOKEN
    });
    //  console.log('response body : ', await response.json());
    console.log('Status code : ', response.status());
    console.log('status text : ', response.statusText());




});