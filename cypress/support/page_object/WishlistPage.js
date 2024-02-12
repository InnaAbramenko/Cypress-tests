import ShopBasePage from "./ShopBasePage";

class WishlistPage extends ShopBasePage {

    get productInWishlist() {
        return cy.get('.product > a');
    };

    get wishlistQtyInput() {
        return cy.get('.qty-input');
    };

    get removeFromWishlistCheckbox() {
        return cy.get('.remove-from-cart > input');
    };

    get updateWishlistButton() {
        return cy.get('.update-wishlist-button');
    }

    ckickRemoveFromWishlistCheckbox() {
        this.removeFromWishlistCheckbox.click();
        return this;
    };

    clickUpdateWishlistButton() {
        this.updateWishlistButton.click();
        return this;
    }

}

export default WishlistPage;