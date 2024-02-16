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
        // todo: Щоб було зрозуміліше, про що мова в тесті строка 46, локатор краще покласти у змінну з конкретною назвою (і скоротити його:
        // todo: const currentLanguageLocator = "button.location-selector__button" )
        homePage
            .clickLanguageSwitcher()
            .clickUALannguage();
        cy.on('uncaught:exception', (e) => {
            if (e.message.includes('Things went bad')) {
              return false
            }
          });
        cy.origin('https://careers.epam.ua', () => {
            cy.get('div.location-selector-ui.header__control button.location-selector__button').should('have.text', 'Україна (UA)');
            //homePage.languageSwitcherUA.should('have.text', 'Україна (UA)');
            cy.url().should('eq', 'https://careers.epam.ua/');
          });

    });


    it('Verify the policies list items', () => {
    homePage
        .policiesSectionList
        .should('have.length', 6);
//todo Тут не варто було шукати локатор кожного айтему, а просто продовжити шуд для policiesSectionList :
// .and('contain.text', 'INVESTORS')
// .and('contain.text', 'COOKIE POLICY')...
        homePage.investorsItem.should('be.visible').and('have.text', 'INVESTORS')
        homePage.cookiePolicyItem.should('be.visible').and('have.text', 'COOKIE POLICY')
        homePage.openSourceItem.should('be.visible').and('have.text', 'OPEN SOURCE')
        homePage.privacyNoticeItem.should('be.visible').and('have.text', 'APPLICANT PRIVACY NOTICE')
        homePage.privacyPoliceItem.should('be.visible').and('have.text', 'PRIVACY POLICY')
        homePage.webAccessItem.should('be.visible').and('have.text', 'WEB ACCESSIBILITY')
    });

    it('Verify the Locations items presence and switching between them', () => {
    homePage
        .locationsList
        //.children('div')
        .should('have.length', 3)
        //todo Те саме, що й в попередньому тесті - не варто було шукати локатор кожного айтему, а просто продовжити шуд для locationsList
    homePage.locationAmericas.should('be.visible').and('have.text', 'AMERICAS')
    homePage.locationEMEA.should('be.visible').and('have.text', 'EMEA')
    homePage.locationAPAC.should('be.visible').and('have.text', 'APAC')
//todo: Нижче у тебе перевірки лише на тру, тест може бути фолс-позітів, тому варто десь чи спочатку, чи в кінці перевірити якусь неактивну табу
    homePage.clickLocationEMEA().locationEMEA.invoke('attr', 'aria-selected').should('eq', 'true');
    homePage.clickLocationAPAC().locationAPAC.invoke('attr', 'aria-selected').should('eq', 'true');
    homePage.clickLocationAmericas().locationAmericas.invoke('attr', 'aria-selected').should('eq', 'true');
    });

    it('Verify search results are shown when enter a valid key-word', () => {
        homePage
            .clickSearchIcon()
            .typeInSearchField('AI')
            .clickFindButton() //todo: можна спростити локатор
            .searchResults //todo: твої searchResults - це не той один елемент, що видає твій локатор, а з додаванням того article, тобто
            .should('be.visible')   //todo div.search-results__items article, після перевірки його візібл далі проходишся ічем
            .find('article')
            .each(($article) => 
                    cy.wrap($article)
                    .should('contain', 'AI'))

    });

    it('Check its impossible to submit the Contact us form without required fields fulfilled', () => {
        //todo При використанні незрозумілих буковок-циферок, в даному випадку кольорів, краще обгортати їх в константи з адекватною назвою. Нижче я в двох місцях змінила, як на мене код читаєміше
        let errorRedColor = "rgb(255, 77, 64)"
        let defaultWhiteColor ='rgb(255, 255, 255)'
        homePage
            .clickContactUsButton() //todo: в ретурні має бути не this, а та сторінка яка повертається - після кліку ти опиняєшся на contuctUsPage
        contactUsPage// todo отже має бути return new ContactUsPage(); Тоді ти зможеш продовжити чейн і ця стрічка видалиться
            .clickSubmitButton()
            .fieldLabel.contains("First Name").should("have.css", "color", errorRedColor)
            contactUsPage.fieldLabel.contains("Last Name").should("have.css", "color", 'rgb(255, 77, 64)')
            contactUsPage.fieldLabel.contains("Email").should("have.css", "color", 'rgb(255, 77, 64)')
            contactUsPage.fieldLabel.contains("Phone").should("have.css", "color", 'rgb(255, 77, 64)')
            contactUsPage.fieldLabel.contains("How did you hear about EPAM?").should("have.css", "color", 'rgb(255, 77, 64)')
            contactUsPage.fieldLabel.contains("Select the Reason for Your Inquiry").should("have.css", "color", 'rgb(255, 255, 255)')
            contactUsPage.fieldLabel.contains("Company").should("have.css", "color", defaultWhiteColor)
            contactUsPage.fieldLabel.contains("Position").should("have.css", "color", 'rgb(255, 255, 255)')
            contactUsPage.fieldLabel.contains("Location").should("have.css", "color", 'rgb(255, 255, 255)')
            contactUsPage.fieldLabel.contains("City").should("have.css", "color", 'rgb(255, 255, 255)')
            contactUsPage.fieldLabel.contains("Your inquiry or comments").should("have.css", "color", 'rgb(255, 255, 255)')

    });

    it('Verify the company logo leads to the homepage', () => {
        homePage
            .clickHamburgerMenuButton()
            .clickAboutMenuButton() //todo: навіщо йшла через гамбургер, якщо в наступному тесті використала цю ж кнопку з хедера?
            .clickCompanyLogoButton()
        cy.url().should('eq', 'https://www.epam.com/');

    });

    it('Verify the ability to download report and its extention', () => {
    homePage
        .aboutButton.click() //todo некоректний локатор, чіпляєшся до позиції, краще до тексту
        //todo cy.get("span.top-navigation__item-text").contains("About").click()
        //todo метод кліку зроби в ПОМ, і щоб повертав сторінку AboutPage()
    aboutPage
        .downloadButton
        .click() //todo метод кліку зроби в ПОМ
        cy.readFile('cypress/downloads/EPAM_Corporate_Overview_Q3_october.pdf')
        .should('exist')
    })
});


