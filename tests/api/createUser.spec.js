import { expect, test } from '@playwright/test'
import { faker } from '@faker-js/faker'

test.describe.parallel("Reqres create and update api test for create user", () => {

    const baseurl = "https://reqres.in/api";

    test("Create user post api test", async ({ request }) => {

        const userName = faker.person.fullName();
        const job = faker.person.jobTitle();

        const response = await request.post(`${baseurl}/users`, {
            data: {
                name: userName,
                job: job
            }
        })
        expect(response.status()).toBe(201)
        const body = JSON.parse(await response.text())
        expect(body.name).toBe(userName);
        expect(body.job).toBe(job);
        expect(body.id).toBeTruthy();

    })

    test("Update user using put", async ({ request }) => {

        let userName = faker.person.fullName();
        let job = faker.person.jobTitle();

        const createUserResponse = await request.post(`${baseurl}/users`, {
            data: {
                name: userName,
                job: job
            }
        })

        const createUserResponseBody = JSON.parse(await createUserResponse.text())

        userName = faker.person.fullName();
        job = faker.person.jobTitle();

        const response = await request.put(`${baseurl}/user/${createUserResponseBody.id}`, {
            data: {
                user: userName,
                job: job
            }
        })

        expect(response.status()).toBe(200)
        const body = JSON.parse(await response.text())
        expect(body.user).toBe(userName);
        expect(body.job).toBe(job);
        expect(body.updatedAt).toBeTruthy();
    })
})