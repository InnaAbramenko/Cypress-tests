import BasePage from "./BasePage";

class AboutPage extends BasePage {

    get downloadButton() {
        return cy.get('.colctrl__holder > .button > .button__wrapper > .button-ui-23 > .button__inner');
    };
}

export default AboutPage;