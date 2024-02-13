//import { throttle } from "cypress/types/lodash";
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
    };

    get removeFromCartCheckbox() {
        return cy.get('.remove-from-cart > input')
    };

    get updateCartButton() {
        return cy.get('.update-cart-button')
    };

    get emptyCartMessage() {
        return cy.get('.order-summary-content')
    };

    get cartIconQuantity() {
        return cy.get('.cart-qty')
    };

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
    };

    clickRemoveFromCartCheckbox() {
        this.removeFromCartCheckbox.click();
        return this;
    };

    clickUpdateCartButton() {
        this.updateCartButton.click();
        return this;
    }

}

export default CartPage;