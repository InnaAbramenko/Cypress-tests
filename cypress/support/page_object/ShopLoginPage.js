import ShopBasePage from "./ShopBasePage";

class ShopLoginPage extends ShopBasePage {

    get loginButton() {
        return cy.get('.login-button');
    }

    clickLoginButton() {
        this.loginButton.click();
    }


}

export default ShopLoginPage;