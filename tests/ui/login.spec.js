import { expect, test } from '@playwright/test'
import LoginPage from '../../pages/login'
import InventoryPage from '../../pages/inventory';
import loginData from '../../data/loginData.json'

test.describe.parallel("Swage labs login tests", async () => {

    loginData.filter(item => item.valid === true).forEach(data => {
        test(`Login successful with valid credentials userName: ${data.userName} & password: ${data.password}`, async ({ page }) => {

            const login = new LoginPage(page);
            await login.navigate();
            await login.login(data.userName, data.password)

            const inventory = new InventoryPage(page)
            expect(await inventory.validatePage()).toBe(true)

        })
    })


    loginData.filter(item => item.valid === false).forEach(data => {
        test(`Login successful with in-valid credentials userName: ${data.userName} & password: ${data.password}`, async ({ page }) => {

            const login = new LoginPage(page);
            await login.navigate();
            await login.login(data.userName, data.password)

            const error = await login.getErrorMessage();
            expect(error).toBe(data.error)

        })
    })


})