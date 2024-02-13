import ShopBasePage from "./ShopBasePage";

class ProductPage extends ShopBasePage {

    get addToWishlistButton() {
        return cy.get('#add-to-wishlist-button-5');
    };

    get successNotification() {
        return cy.get('#bar-notification > p')
    };

    get addToCartButton() {
        return cy.get('#add-to-cart-button-5');
    };

    clickAddToWishlistButton() {
        this.addToWishlistButton.click();
        return this;
    };

    clickAddToCartButton() {
        this.addToCartButton.click();
        return this;
    }

}

export default ProductPage;