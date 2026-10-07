import { test, expect } from '../../src/fixtures/apifixtures';


let tokenId: string;
test.beforeEach('Generate the token ', async ({ request }) => {

    let creds = {

        username: 'admin',
        password: 'password123'
    };

    let authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: { 'Content-Type': 'application/json' },
        data: creds
    })

    expect((authResponse).status()).toBe(200);
    let jsonResponse = await authResponse.json();
    console.log('Auth API response ', jsonResponse);
    tokenId = jsonResponse.token;
    console.log('Token Id : ', tokenId);
})

test('Booking CRUD', async ({ request }) => {

    let bookingResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: { 'Content-Type': 'application/json' },
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }
    })
    expect((bookingResponse).status()).toBe(200);
    let bookingJSON = await bookingResponse.json();
    console.log(bookingJSON);
    let bookingId = bookingJSON.bookingid;
    console.log('booking Id is ', bookingId);

    //2. Update booking by booking ID : needs token

    let updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${tokenId}`
            },
            data: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 121,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Lunch"
            }
        }
    );
    expect(updateResponse.status()).toBe(200);
    let updateJson = await updateResponse.json();

    expect(updateJson.totalprice).toBe(121);
    console.log('Updated parameter is ', updateJson.additionalneeds);

    //3. Delete 
    let deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${tokenId}`
            }
        }
    );

    expect(deleteResponse.status()).toBe(201);



})