import { test, expect } from '@playwright/test'
import { url } from 'inspector';

test.describe.parallel("Reqres api: Single user request:", () => {

    const baseurl = "https://reqres.in/api";

    test("Single user api reqeust with valid user id", async ({ request }) => {

        const response = await request.get(`${baseurl}/users/2`);
        expect(response.status()).toBe(200)

        const body = JSON.parse(await response.text())
        expect(body.data).toEqual(await expect.objectContaining({
            id: 2,
            email: expect.any(String),
            first_name: expect.any(String),
            last_name: expect.any(String),
            avatar: expect.any(String)
        }))

    })

    test("Single user api reqeust with in-valid user id", async ({ request }) => {

        const response = await request.get(`${baseurl}/users/200`);
        expect(response.status()).toBe(404)

    })
})