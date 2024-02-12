import ShopBasePage from "./ShopBasePage";

class ProductPage extends ShopBasePage {

    get addToWishlistButton() {
        return cy.get('#add-to-wishlist-button-5');
    };

    get successNotification() {
        return cy.get('#bar-notification > p')
    };

    clickAddToWishlistButton() {
        this.addToWishlistButton.click();
        return this;
    };

}

export default ProductPage;