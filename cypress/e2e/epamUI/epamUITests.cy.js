import HomePage from "../../support/page_object/HomePage";
import ContactUsPage from "../../support/page_object/contactUsPage";
import BasePage from "../../support/page_object/BasePage";
import AboutPage from "../../support/page_object/AboutPage";

describe('UI Tests Epam', () => {
    const homePage = new HomePage();
    const contactUsPage = new ContactUsPage();
    const basePage = new BasePage;
    const aboutPage = new AboutPage();

    beforeEach(() => {
        basePage
            .open()
            .clickAcceptCookiesButton()
    });

    it('Verify page title', () => {
        cy.title().should('eq', 'EPAM | Software Engineering & Product Development Services')
    });

    it('Verify the ability to switch the theme', () => {   
        basePage 
            .clickThemeToggle()
            .header.should('have.css', 'background-color', 'rgb(251, 250, 250)').and('not.have.css', 'background-color', 'rgb(6, 6, 6)');
        basePage
            .clickThemeToggle()
            .header.should('have.css', 'background-color', 'rgb(6, 6, 6)').and('not.have.css', 'background-color', 'rgb(251, 250, 250)');

    });

    it('Verify the ability to switch language to UA', () => {
        basePage
            .clickLanguageSwitcher()
            .clickUALannguage();
        cy.on('uncaught:exception', (e) => {
            if (e.message.includes('Things went bad')) {
              return false
            }
          });
        cy.origin('https://careers.epam.ua', () => {
            cy.get('div.location-selector-ui.header__control button.location-selector__button').should('have.text', 'Україна (UA)');
            cy.url().should('eq', 'https://careers.epam.ua/');
          });

    });


    it('Verify the policies list items', () => {
            homePage.investorsItem.should('be.visible').contains('INVESTORS')
            homePage.cookiePolicyItem.should('be.visible').contains('COOKIE POLICY')
            homePage.openSourceItem.should('be.visible').contains('OPEN SOURCE')
            homePage.privacyNoticeItem.should('be.visible').contains('APPLICANT PRIVACY NOTICE')
            homePage.privacyPoliceItem.should('be.visible').contains('PRIVACY POLICY')
            homePage.webAccessItem.should('be.visible').contains('WEB ACCESSIBILITY')
    });

    it('Verify the Locations items presence and switching between them', () => {
        homePage
        .locationsList
        .children('div')
        .should('have.length', 3)
        
        homePage.locationAmericas.should('be.visible').and('have.text', 'AMERICAS')
        homePage.locationEMEA.should('be.visible').and('have.text', 'EMEA')
        homePage.locationAPAC.should('be.visible').and('have.text', 'APAC')

        homePage.clickLocationEMEA().locationEMEA.invoke('attr', 'aria-selected').should('eq', 'true');
        homePage.clickLocationAPAC().locationAPAC.invoke('attr', 'aria-selected').should('eq', 'true');
        homePage.clickLocationAmericas().locationAmericas.invoke('attr', 'aria-selected').should('eq', 'true');
    });

    it('Verify search results are shown when enter a valid key-word', () => {
        basePage
            .clickSearchIcon()
            .typeInSearchField('AI')
            .clickFindButton();
        homePage
            .searchResults
            .should('be.visible')
            .find('article')
            .each(($article) => 
                    cy.wrap($article)
                    .should('contain', 'AI'))

    });

    it('Check its impossible to submit the Contact us form without required fields fulfilled', () => {
        basePage
            .clickContactUsButton()
        contactUsPage
            .clickSubmitButton()
            .fieldLabel.contains("First Name").should("have.css", "color", 'rgb(255, 77, 64)')
            contactUsPage.fieldLabel.contains("Last Name").should("have.css", "color", 'rgb(255, 77, 64)')
            contactUsPage.fieldLabel.contains("Email").should("have.css", "color", 'rgb(255, 77, 64)')
            contactUsPage.fieldLabel.contains("Phone").should("have.css", "color", 'rgb(255, 77, 64)')
            contactUsPage.fieldLabel.contains("How did you hear about EPAM?").should("have.css", "color", 'rgb(255, 77, 64)')
            contactUsPage.fieldLabel.contains("Select the Reason for Your Inquiry").should("have.css", "color", 'rgb(255, 255, 255)')
            contactUsPage.fieldLabel.contains("Company").should("have.css", "color", 'rgb(255, 255, 255)')
            contactUsPage.fieldLabel.contains("Position").should("have.css", "color", 'rgb(255, 255, 255)')
            contactUsPage.fieldLabel.contains("Location").should("have.css", "color", 'rgb(255, 255, 255)')
            contactUsPage.fieldLabel.contains("City").should("have.css", "color", 'rgb(255, 255, 255)')
            contactUsPage.fieldLabel.contains("Your inquiry or comments").should("have.css", "color", 'rgb(255, 255, 255)')

    });

    it('Verify the company logo leads to the homepage', () => {
        basePage
            .clickHamburgerMenuButton()
            .clickAboutMenuButton()
            .clickCompanyLogoButton()
        cy.url().should('eq', 'https://www.epam.com/');

    });

    it('Verify the ability to download report and its extention', () => {
    basePage
        .aboutButton.click()
    aboutPage
        .downloadButton
        .click()
        cy.readFile('cypress/downloads/EPAM_Corporate_Overview_Q3_october.pdf')
        .should('exist')
    })
});


