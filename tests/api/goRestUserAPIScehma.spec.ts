import { test, expect } from "../../src/fixtures/apifixtures";

import Ajv from "ajv";
import fs, { readFileSync } from "fs";

const TOKEN = process.env.API_TOKEN;


let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
}

//setup the AJV:

let ajv = new Ajv();

// define JSON schema: 

// let userSchema = {
//     "type": "object",
//     "properties": {
//         "id": {
//             "type": "number"
//         },
//         "name": {
//             "type": "string"
//         },
//         "email": {
//             "type": "string"
//         },
//         "gender": {
//             "type": "string"
//         },
//         "status": {
//             "type": "string"
//         }
//     },
//     "required": [
//         "id",
//         "name",
//         "email",
//         "gender",
//         "status"
//     ]
// };


let userArraySchema = {

    "type": "array",
    "items": JSON.parse(fs.readFileSync('./src/schema/userSchema.json', 'utf-8'))
}

test('Go Rest User Schema Validation', async ({ apiHelper }) => {

    //User JS object
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
    let userId = response.body.id;
    console.log('Create Use ID from post call is ', userId);


    //get user:
    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);

    // Verify Response Schema
    let validate = ajv.compile(JSON.parse(fs.readFileSync('./src/schema/userSchema.json', 'utf-8')));
    let isSchemaValid = validate(getUserResponse.body);

    if (!isSchemaValid) {
        console.log('Schema errors', validate.errors);
    }
    expect(isSchemaValid).toBeTruthy();

});

test('Go Rest All User Schema Validation', async ({ apiHelper }) => {



    //get users:
    let getAllUserResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(getAllUserResponse.status).toBe(200);

    // Verify Response Schema
    let validate = ajv.compile(userArraySchema);
    let isSchemaValid = validate(getAllUserResponse.body);

    if (!isSchemaValid) {
        console.log('Schema errors', validate.errors);
    }
    expect(isSchemaValid).toBeTruthy();

});
