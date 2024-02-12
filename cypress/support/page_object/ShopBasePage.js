class ShopBasePage {

    get registerIcon() {
        return cy.get('.ico-register');
    };

    get loginIcon() {
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

    get accountIcon() {
        return cy.get('.header-links .account');
    };

    get logoutIcon() {
        return cy.get('.ico-logout');
    };

    get shoppingCartIcon() {
        return cy.get('.ico-cart > .cart-label');
    };

    get wishListIcon() {
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

    openDemoShop() {
        cy.visit('https://demowebshop.tricentis.com/')
        return this;
    };

    clickRegisterIcon() {
        this.registerIcon.click();
        return this;
    };

    clickLoginIcon() {
        this.loginIcon.click();
        return this;
    };

    clickComputersMenuItem() {
        this.computersMenuItem.click();
        return this;
    };

    clickDesktopsSubCategory() {
        this.desktopsSubCategory.click();
        return this;
    };

    clickApparelShoesMenuItem() {
        this.apparelShoesMenuItem.click();
        return this;
    };

    clickWishlistIcon() {
        this.wishListIcon.click();
        return this;
    }
};



export default ShopBasePage;