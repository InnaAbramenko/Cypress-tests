import ShopBasePage from "./ShopBasePage";

class ShopRegisterPage extends ShopBasePage {


    get confirmPasswordField() {
        return cy.get('#ConfirmPassword');
    };

    get registerButton() {
        return cy.get('#register-button');
    };

    clickRegisterButton() {
        this.registerButton.click();
    };

    fillInConfirmPasswordField(param) {
        this.confirmPasswordField.type(param);
        return this;
    };

    


};

export default ShopRegisterPage;