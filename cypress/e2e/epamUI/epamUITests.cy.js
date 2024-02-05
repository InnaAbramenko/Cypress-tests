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
            .acceptCookiesButton.click(); // TODO краще цей клік запхати в метод
    });

    it('Verify page title', () => {
        cy.title().should('eq', 'EPAM | Software Engineering & Product Development Services')
    });

    it('Verify the ability to switch the theme', () => {
         // TODO тут правильніше спочатку перевірити початковий бекграунд, або що він нот хев сss того що нижче, щоб було зрозуміло, що він міняється і виключити вірогідність помилкового вибору rgb:
        // TODO .header.should('have.css', 'background-color', 'rgb(6, 6, 6)'); або
        // TODO .header.should('not.have.css', 'background-color', 'rgb(251, 250, 250)');
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
            // TODO селектор нижче перемісти в пейдж обджект, щоб було зрозуміло що це таке
            cy.get('div.location-selector-ui.header__control button.location-selector__button').should('have.text', 'Україна (UA)');
            cy.url().should('eq', 'https://careers.epam.ua/');
          });

    });


    it('Verify the policies list items', () => {
        // TODO Перевірки (шуди чи експекти) повинні бути в тілі тесту, а не в пейджобжектах. І ще варто додати перевірку не тільки того, що кожен елемент екзіст, а і що він містить потрібне слово
        //TODO ще як варіант (не обов'язково) можна спочатку перевірити, що список цих айтемів має довжину 6)
        homePage
            .checkElementVisible(homePage.investorsItem)
            .checkElementVisible(homePage.cookiePolicyItem)
            .checkElementVisible(homePage.openSourceItem)
            .checkElementVisible(homePage.privacyNoticeItem)
            .checkElementVisible(homePage.privacyPoliceItem)
            .checkElementVisible(homePage.webAccessItem)
    });

    it('Verify the Locations items presence and switching between them', () => {
        // TODO Перевірки (шуди чи експекти) повинні бути в тілі тесту, а не в пейджобжектах.
        // TODO Спочатку можна зробити перевірку, що список країн (".js-tabs-title") тут має довжину 3, а далі використати цей самий локатор  поштучно, щоб перевірити наявність тексту (".js-tabs-title").eq(1)
        // todo так ти виключиш кейс, що там більше країн в списку, бо просто на візібл перевірки недостатньо
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
        //TODO якщо у тебе є basePage і інші сторінки, то ті сторінки, в яких є елементи basePage  повинні наслідувати її, тоді ти будеш починати не з бейз пейдж, бо то щось абстрактне
        // а з конкретної сторінки, і твій тест виглядатиме так:
        // homePage
        //     .clickSearchIcon()
        //     .typeInSearchField()
        //     .clickFindButton()
        //     .searchResults
        //     .should('be.visible');
        basePage
            .clickSearchIcon()
            .typeInSearchField() //todo метод вводу тексту зазвичай роблять параметризованим, потрібний текст - як параметр, тоді потрібний текст ти вносиш стрінгою в дужках в тесті
            .clickFindButton();
        homePage
            .searchResults
            .should('be.visible'); // todo так ти не перевіриш коректність роботи пошуку. Тут потрібна перевірка, що в кожній відповіді в пошуку міститься текст, який ти шукала

    });

    it('Check its impossible to submit the Contact us form without required fields fulfilled', () => {
        // TODO Перевірки (шуди чи експекти) повинні бути в тілі тесту, а не в пейджобжектах.
        // todo Якщо ти закоментиш тут всі стрічки, що починаються на ".focus", то тест все одно пройде пасом, до того ж задача стоїть перевірити обов'язкові поля, тож бажано показати різницю з необов'язковим полем
        contactUsPage
            .clickContactUsButton() //todo Ця кнопка знаходиться на бейзПейдж, перенеси її локатор і клік туди. А тут викликай цей клік з хоумПейдж, а далі для сабміта - вже contactUsPage
            .clickSubmitButton()
            .focusOnField(contactUsPage.firstNameField)
            .checkErrorTooltip(contactUsPage.errorTooltipFirstName)
            .focusOnField(contactUsPage.lastNameField)
            .checkErrorTooltip(contactUsPage.errorTooltipLastName)
            .focusOnField(contactUsPage.emailField)
            .checkErrorTooltip(contactUsPage.errorTooltipEmail)
            .focusOnField(contactUsPage.phoneField)
            .checkErrorTooltip(contactUsPage.errorTooltipPhone)

        // todo Тому мені здається набагато простіше використати ось цю твою перевірку з кольором, що після Сабміту 5 полів обов'язкових мають червоний колір, а решта - білий
        // todo при цьому не заводити локатори, а взяти список і контейнз стрінги
        // todo - типу такого cy.get(".form-component__label").contains("Last Name").should("have.css", "color","......)
        contactUsPage.howYouNowAboutEpamLabel.should('have.css', 'color', 'rgb(255, 77, 64)');
    });

    it('Verify the company logo leads to the homepage', () => {
        basePage // todo тут буду вже mainPage, basePage на сторінці тестів не використовується
            .clickHamburgerMenuButton()
            .clickAboutMenuButton()
            .clickCompanyLogoButton()
        cy.url().should('eq', 'https://www.epam.com/');

    })
});


