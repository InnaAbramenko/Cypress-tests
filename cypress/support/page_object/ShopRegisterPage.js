import ShopBasePage from "./ShopBasePage";

class ShopRegisterPage extends ShopBasePage {



    get confirmPasswordField() {
        return cy.get('#ConfirmPassword');
    };

    get registerButton() {
        return cy.get('#register-button');
    };

    get resultBlock() {
        return cy.get('.result');
    };

    clickRegisterButton() {
        this.registerButton.click();
        return this;
    }

};

export default ShopRegisterPage;