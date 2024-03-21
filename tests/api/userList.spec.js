import { test, expect } from '@playwright/test'


test.describe.parallel("REQRES puplic api testing ", () => {

    const baseurl = "https://reqres.in/api";

    test("Reqres api test: User List", async ({ request }) => {
        const response = await request.get(`${baseurl}/users?page=2`)
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.page).toBe(2);
        expect(body.total_pages).toBe(2);
        console.log(body)
        expect(body.data.length).toBe(6)
    })

    test.only("Reqres api test: User List: page exceeds", async ({ request }) => {
        const response = await request.get(`${baseurl}/users?page=3`)
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.page).toBe(3);
        expect(body.total_pages).toBe(2);
        console.log(body)
        expect(body.data.length).toBe(0)
    })
})