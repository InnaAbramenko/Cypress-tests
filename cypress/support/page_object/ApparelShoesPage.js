// import ShopBasePage from "./ShopBasePage";

class ApparelShoesPage {


    get apparelShoesProduct() {
        return cy.get(".product-title a")
    }

    clickFirstProduct() {
        this.apparelShoesProduct.first().click();
        return this;
    }

}

export default ApparelShoesPage;