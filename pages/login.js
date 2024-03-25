class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('/');
    }

    async login(username, password) {
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.click('#login-button');
    }

    async getErrorMessage() {
        return await this.page.locator('xpath=//h3[@data-test="error"]').innerText()
    }

}

module.exports = LoginPage;
