import HomePage from "../../support/page_object/homePage.cy";
import ContactUsPage from "../../support/page_object/contactUsPage.cy";
import BasePage from "../../support/page_object/BasePage.cy";

describe('UI Tests Epam', () => {
    const homePage = new HomePage();
    const contactUsPage = new ContactUsPage();
    const basePage = new BasePage;

    beforeEach(() => {
        basePage
            .open()
            .acceptCookiesButton.click();
    });

    it('Verify page title', () => {
        cy.title().should('eq', 'EPAM | Software Engineering & Product Development Services')
    });

    it('Verify the ability to switch the theme', () => {   
        basePage
            .clickThemeToggle()
            .header.should('have.css', 'background-color', 'rgb(251, 250, 250)');
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
        homePage
            .checkElementVisible(homePage.investorsItem)
            .checkElementVisible(homePage.cookiePolicyItem)
            .checkElementVisible(homePage.openSourceItem)
            .checkElementVisible(homePage.privacyNoticeItem)
            .checkElementVisible(homePage.privacyPoliceItem)
            .checkElementVisible(homePage.webAccessItem)
    });

    it('Verify the Locations items presence and switching between them', () => {
        homePage
            .checkElementVisible(homePage.locationAmericas)
            .checkElementVisible(homePage.locationEMEA)
            .checkElementVisible(homePage.locationAPAC)

        homePage
            .clickLocationEMEA().locationEMEA.invoke('attr', 'aria-selected').should('eq', 'true');
        homePage
            .clickLocationAPAC().locationAPAC.invoke('attr', 'aria-selected').should('eq', 'true');
        homePage
            .clickLocationAmericas().locationAmericas.invoke('attr', 'aria-selected').should('eq', 'true');
    });

    it('Verify search results are shown when enter a valid key-word', () => {
        basePage
            .clickSearchIcon()
            .typeInSearchField()
            .clickFindButton();
        homePage
            .searchResults
            .should('be.visible');

    });

    it('Check its impossible to submit the Contact us form without required fields fulfilled', () => {
        contactUsPage
            .clickContactUsButton()
            .clickSubmitButton()
            .focusOnField(contactUsPage.firstNameField)
            .checkErrorTooltip(contactUsPage.errorTooltipFirstName)
            .focusOnField(contactUsPage.lastNameField)
            .checkErrorTooltip(contactUsPage.errorTooltipLastName)
            .focusOnField(contactUsPage.emailField)
            .checkErrorTooltip(contactUsPage.errorTooltipEmail)
            .focusOnField(contactUsPage.phoneField)
            .checkErrorTooltip(contactUsPage.errorTooltipPhone)

        contactUsPage.howYouNowAboutEpamLabel.should('have.css', 'color', 'rgb(255, 77, 64)');
    });

    it('Verify the company logo leads to the homepage', () => {
        basePage
            .clickHamburgerMenuButton()
            .clickAboutMenuButton()
            .clickCompanyLogoButton()
        cy.url().should('eq', 'https://www.epam.com/');

    })
});


