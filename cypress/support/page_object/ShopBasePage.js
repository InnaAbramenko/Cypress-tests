import ApparelShoesPage from "./ApparelShoesPage";
import CartPage from "./CartPage";
import ShopComputerDesktopsPage from "./ShopComputerDesktopsPage";


class ShopBasePage {

    get registerLink() {
        return cy.get('.ico-register');
    };

    get loginLink() {
        return cy.get('.ico-login')
    };

    get firstNameField() {
        return cy.get('#FirstName');
    };

    get lastNameField() {
        return cy.get('#LastName');
    };

    get emailField() {
        return cy.get('#Email');
    };

    get passwordField() {
        return cy.get('#Password');
    };

    get accountLink() {
        return cy.get('.header-links .account');
    };

    get logoutLink() {
        return cy.get('.ico-logout');
    };

    get shoppingCartLink() {
        return cy.get('.ico-cart > .cart-label');
    };

    get wishListLink() {
        return cy.get('.ico-wishlist > .cart-label');
    };

    get computersList() {
        return cy.get('.top-menu > :nth-child(2) > ul > li');
    };

    get desktopsListItem() {
        return cy.get('.top-menu > li > ul > li > [href="/desktops"]');
    };

    get notebooksListItem() {
        return  cy.get('.top-menu > li > ul > li > [href="/notebooks"]');
    };

    get accessoriesListItem() {
        return cy.get('.top-menu > li > ul > li > [href="/accessories"]');
    };

    get computersMenuItem() {
        return cy.get('.top-menu > li > [href="/computers"]');
    };

    get desktopsSubCategory() {
        return cy.get('.sub-category-item > h2 > [href="/desktops"]');
    };

    get apparelShoesMenuItem() {
        return cy.get('.top-menu > li > [href="/apparel-shoes"]');
    };

    get wishlistIcon() {
        return cy.get('.ico-wishlist > .cart-label');
    };

    get cartProductName() {
        return cy.get('.product > a');
    };

    
    get qtyInput() {
        return cy.get('.qty-input');
    };

    get resultBlock() {
        return cy.get('.result');
    };

    openDemoShop() {
        cy.visit('https://demowebshop.tricentis.com/')
        return this;
    };

    clickRegisterLink() {
        this.registerLink.click();
        
    };

    clickLoginLink() {
        this.loginLink.click();
    };

    clickAccounLink() {
        this.accountLink.click();
    }

    clickComputersMenuItem() {
        this.computersMenuItem.click();
    };

    clickDesktopsSubCategory() {
        this.desktopsSubCategory.click();
        return new ShopComputerDesktopsPage();
    };

    clickApparelShoesMenuItem() {
        this.apparelShoesMenuItem.click();
        return new ApparelShoesPage();
    };

    clickWishlistLink() {
        this.wishListLink.click();
    };

    clickShoppingCartLink() {
        this.shoppingCartLink.click();
        return new CartPage();
    };

    fillInFirstNameField(param) {
        this.firstNameField.type(param);
        return this;
    };

    fillInLastNameField(param) {
        this.lastNameField.type(param);
        return this;
    };

    fillInEmailField(param) {
        this.emailField.type(param);
        return this;
    };

    fillInPasswordField(param) {
        this.passwordField.type(param);
        return this;
    };

    
};



export default ShopBasePage;