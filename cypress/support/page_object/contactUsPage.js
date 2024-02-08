class ContactUsPage {

    get submitButton() {
        return cy.get('.button-ui');
    };
    
    get fieldLabel() {
         return cy.get('.form-component__label');
         };
 

    clickSubmitButton() {
        this.submitButton.click();
        return this;
    };
 
}

export default ContactUsPage;