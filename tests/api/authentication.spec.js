import { expect, test } from "@playwright/test";

test.describe.parallel("Reqres authentication tests", () => {

    const baseurl = "https://reqres.in/api";

    test("Authentication success with valid credentials", async ({ request }) => {

        const response = await request.post(`${baseurl}/login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        })

        expect(response.status()).toBe(200)

        const body = JSON.parse(await response.text())
        expect(body.token).toBeTruthy()
    })

    test("Authentication failure with invalid credentials", async ({ request }) => {

        const response = await request.post(`${baseurl}/login`, {
            data: {
                email: "eve.holt@reqres.in",
            }
        })

        expect(response.status()).toBe(400)

        const body = JSON.parse(await response.text())
        expect(body.error).toBe("Missing password")
    })
})