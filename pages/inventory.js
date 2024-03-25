class InventoryPage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('/inventory.html');
    }

    async validatePage() {
        return await this.page.url().includes('/inventory.html') ? true : false
    }



}

module.exports = InventoryPage;
