class ContactUsPage {
    get contactUSButton() {
        return cy.get('.header__content > :nth-child(5)');
    };
    get submitButton() {
        return cy.get('.button-ui');
    };
    get firstNameField() {
         return cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_first_name');
    };
    get lastNameField() {
        return cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_last_name');
    };
    get emailField() {
        return cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_email');
    };
    get phoneField() {
        return cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_phone');
    };

    get errorTooltipFirstName() {
        return cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_first_name-error > .validation-text');
    };
    get errorTooltipLastName() {
        return cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_last_name-error > .validation-text');
    };
    get errorTooltipEmail() {
        return cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_email-error > .validation-text');
    };
    get errorTooltipPhone() {
        return cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_phone-error > .validation-text');
    };
    get howYouNowAboutEpamLabel() {
        return cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about-label');
    };
    clickContactUsButton() {
        this.contactUSButton.click();
        return this;
    };
    clickSubmitButton() {
        this.submitButton.click();
        return this;
    };
 
    focusOnField(fieldName) {
        fieldName.focus();
        return this;
    };
    checkErrorTooltip(tooltipFieldName) {
        tooltipFieldName.should('be.visible').and('have.text', 'This is a required field');
        return this;
    }
}

export default ContactUsPage;