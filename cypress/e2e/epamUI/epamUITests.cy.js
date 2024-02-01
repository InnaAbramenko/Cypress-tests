import HomePage from "../../support/page_object/homePage.cy";
import ContactUsPage from "../../support/page_object/contactUsPage.cy";
import BasePage from "../../support/page_object/BasePage.cy";

describe('UI Tests Epam', () => {
    const homePage = new HomePage();
    const contactUsPage = new ContactUsPage();
    const basePage = new BasePage;

    beforeEach(() => {
        basePage.open();
        cy.viewport(1440, 1080);
        basePage.acceptCookiesButton.click();
    });

    it('Verify page title', () => {
        const pageTitle = cy.title();
        pageTitle.should('eq', 'EPAM | Software Engineering & Product Development Services')
    
    });

    it('Verify the ability to switch the theme', () => {   
        basePage.themeToggle.click();
        cy.get('.header-ui-23').should('have.css', 'background-color', 'rgb(251, 250, 250)');
    });

    it('Verify the ability to switch language to UA', () => {
 
        basePage.languageSwitcher.click();
        basePage.uaLanguage.click();
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
        homePage.investorsItem.should('be.visible');
        homePage.cookiePolicyItem.should('be.visible');
        homePage.openSourceItem.should('be.visible');
        homePage.privacyNoticeItem.should('be.visible');
        homePage.privacyPoliceItem.should('be.visible');
        homePage.webAccessItem.should('be.visible');
    });

    it('Verify the Locations items presence and switching between them', () => {
        homePage.locationAmericas.should('be.visible');
        homePage.locationEMEA.should('be.visible');
        homePage.locationAPAC.should('be.visible');

        homePage.locationEMEA.click().invoke('attr', 'aria-selected').should('eq', 'true');
        homePage.locationAPAC.click().invoke('attr', 'aria-selected').should('eq', 'true');
        homePage.locationAmericas.click().invoke('attr', 'aria-selected').should('eq', 'true');
    });

    it('Verify search results are shown when enter a valid key-word', () => {
        basePage.searchIcon.click();
        basePage.searchInputField.type('AI');
        basePage.findButton.click();
        homePage.searchResults.should('be.visible');

    });

    it('Check its impossible to submit the Contact us form without required fields fulfilled', () => {
        contactUsPage.contactUSButton.click();
        contactUsPage.submitButton.click();
        
        contactUsPage.firstNameField.focus();
        contactUsPage.errorTooltipFirstName.should('be.visible').and('have.text', 'This is a required field');

        contactUsPage.lastNameField.focus();
        contactUsPage.errorTooltipLastName.should('be.visible').and('have.text', 'This is a required field');

        contactUsPage.emailField.focus();
        contactUsPage.errorTooltipEmail.should('be.visible').and('have.text', 'This is a required field');

        contactUsPage.phoneField.focus();
        contactUsPage.errorTooltipPhone.should('be.visible').and('have.text', 'This is a required field');

        contactUsPage.howYouNowAboutEpamLabel.should('have.css', 'color', 'rgb(255, 77, 64)');
    });

    it('Verify the company logo leads to the homepage', () => {
        basePage.hamburgerMenuButton.click();
        basePage.aboutMenuButton.click();
        basePage.companyLogoButton.click();
        cy.url().should('eq', 'https://www.epam.com/');

    })
});


