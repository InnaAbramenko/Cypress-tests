// import ShopBasePage from "./ShopBasePage";

class ShopComputerDesktopsPage {

    get sortByDropDown() {
        return cy.get('#products-orderby');
    };

    get productsTitle() {
        return cy.get('.product-title a');
    };

    get displayPerPageDropDown() {
        return cy.get('#products-pagesize');
    };

    selectDropDownItem(item) {
        this.sortByDropDown.select(item);
        return this;
    };

    selectDisplayPerPageDropDownItem(item) {
        this.displayPerPageDropDown.select(item);
        return this;
    }

}

export default ShopComputerDesktopsPage;