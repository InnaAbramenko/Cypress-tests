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
        homePage 
            .clickThemeToggle()
            .header.should('have.css', 'background-color', 'rgb(251, 250, 250)')
            .and('not.have.css', 'background-color', 'rgb(6, 6, 6)');
        homePage
            .clickThemeToggle()
            .header.should('have.css', 'background-color', 'rgb(6, 6, 6)')
            .and('not.have.css', 'background-color', 'rgb(251, 250, 250)');

    });

    it('Verify the ability to switch language to UA', () => {
        homePage
            .clickLanguageSwitcher()
            .clickUALannguage();
        cy.on('uncaught:exception', (e) => {
            if (e.message.includes('Things went bad')) {
              return false
            }
          });
        cy.origin('https://careers.epam.ua', () => {
            const languageSwitcherUA = cy.get('.location-selector__button')
            languageSwitcherUA.should('have.text', 'Україна (UA)');
            cy.url().should('eq', 'https://careers.epam.ua/');
          });

    });


    it('Verify the policies list items', () => {
    homePage
        .policiesSectionList
        .should('have.length', 6)
        .and('be.visible')
        .and('contain.text', 'INVESTORS')
        .and('contain.text', 'COOKIE POLICY')
        .and('contain.text', 'OPEN SOURCE')
        .and('contain.text', 'APPLICANT PRIVACY NOTICE')
        .and('contain.text', 'PRIVACY POLICY')
        .and('contain.text', 'WEB ACCESSIBILITY')
     });

    it('Verify the Locations items presence and switching between them', () => {
    homePage
        .locationsList
        .should('have.length', 3)
        //todo Те саме, що й в попередньому тесті - не варто було шукати локатор кожного айтему, а просто продовжити шуд для locationsList
    homePage.locationAmericas.should('be.visible').and('have.text', 'AMERICAS')
    homePage.locationEMEA.should('be.visible').and('have.text', 'EMEA')
    homePage.locationAPAC.should('be.visible').and('have.text', 'APAC')

    homePage.clickLocationEMEA().locationEMEA.invoke('attr', 'aria-selected').should('eq', 'true')
    homePage.locationAmericas.invoke('attr', 'aria-selected').should('eq', 'false')
    homePage.clickLocationAPAC().locationAPAC.invoke('attr', 'aria-selected').should('eq', 'true')
    homePage.clickLocationAmericas().locationAmericas.invoke('attr', 'aria-selected').should('eq', 'true')
    });

    it('Verify search results are shown when enter a valid key-word', () => {
        homePage
            .clickSearchIcon()
            .typeInSearchField('AI')
            .clickFindButton()
            .searchResults
            .should('be.visible')
            .each(($article) => 
                    cy.wrap($article)
                    .should('contain', 'AI'))

    });

    it('Check its impossible to submit the Contact us form without required fields fulfilled', () => {
        let errorRedColor = "rgb(255, 77, 64)"
        let defaultWhiteColor ='rgb(255, 255, 255)'
        homePage
            .clickContactUsButton()
            .clickSubmitButton()
            .fieldLabel.contains("First Name").should("have.css", "color", errorRedColor)
        contactUsPage.fieldLabel.contains("Last Name").should("have.css", "color", errorRedColor)
        contactUsPage.fieldLabel.contains("Email").should("have.css", "color", errorRedColor)
        contactUsPage.fieldLabel.contains("Phone").should("have.css", "color", errorRedColor)
        contactUsPage.fieldLabel.contains("How did you hear about EPAM?").should("have.css", "color", errorRedColor)
        contactUsPage.fieldLabel.contains("Select the Reason for Your Inquiry").should("have.css", "color", defaultWhiteColor)
        contactUsPage.fieldLabel.contains("Company").should("have.css", "color", defaultWhiteColor)
        contactUsPage.fieldLabel.contains("Position").should("have.css", "color", defaultWhiteColor)
        contactUsPage.fieldLabel.contains("Location").should("have.css", "color", defaultWhiteColor)
        contactUsPage.fieldLabel.contains("City").should("have.css", "color", defaultWhiteColor)
        contactUsPage.fieldLabel.contains("Your inquiry or comments").should("have.css", "color", defaultWhiteColor)

    });

    it('Verify the company logo leads to the homepage', () => {
        homePage
            .clickAboutButton()
            .clickCompanyLogoButton()
        cy.url().should('eq', 'https://www.epam.com/');

    });

    it('Verify the ability to download report and its extention', () => {
    homePage
        .clickAboutButton()
    aboutPage
        .clickDownloadButton()
        cy.readFile('cypress/downloads/EPAM_Corporate_Overview_Q3_october.pdf')
        .should('exist')
    })
});


