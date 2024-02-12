import ShopBasePage from "./ShopBasePage";

class ApparelShoesPage extends ShopBasePage {

    get polkaDotTopProduct() {
        return cy.get('.product-grid > :nth-child(1)');
    };

    clickPolkaDotTopProduct() {
        this.polkaDotTopProduct.click();
        return this;
    }

}

export default ApparelShoesPage;