import ShopBasePage from "./ShopBasePage";

class ShopComputerDesktopsPage extends ShopBasePage {

    get sortByDropDown() {
        return cy.get('#products-orderby');
    };

    get productsList() {
        return cy.get('.item-box');
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