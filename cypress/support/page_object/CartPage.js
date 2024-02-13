import ShopBasePage from "./ShopBasePage";

class CartPage extends ShopBasePage {

    get termsOfServiceCheckbox() {
        return cy.get('#termsofservice');
    };

    get checkoutButton() {
        return cy.get('#checkout');
    };

    get checkoutAsGuestButton() {
        return cy.get('.checkout-as-guest-button');
    }

    clickTermsOfServiceCheckbox() {
        this.termsOfServiceCheckbox.click();
        return this;
    };

    clickCheckoutButton() {
        this.checkoutButton.click();
        return this;
    };

    clickCheckoutAsGuestButton() {
        this.checkoutAsGuestButton.click();
        return this;
    }

}

export default CartPage;