import ContactUsPage from "./contactUsPage";

class BasePage {
    
get acceptCookiesButton() {
        return cy.get('#onetrust-accept-btn-handler');
    };

get themeToggle() {
        return cy.get(':nth-child(3) > .theme-switcher');
    };
get header() {
    return cy.get('.header-ui-23');
}
get hamburgerMenuButton() {
    return cy.get('.hamburger-menu__button');
};
get companyLogoButton() {
    return cy.get('a.desktop-logo');
};
get languageSwitcher() {
    return cy.get("button.location-selector__button")
};
get uaLanguage() {
    return cy.get("ul.location-selector__list a[href='https://careers.epam.ua']")
};

get searchIcon() {
    return cy.get('.search-icon');
};
get searchInputField() {
    return cy.get('#new_form_search');
};
get findButton() { 
    return cy.get('button.custom-search-button');
};

get contactUSButton() {
    return cy.get('.header__content > a.cta-button-ui.cta-button-ui-23.header__control');
};

get mainNavItem() {
    return cy.get('span.top-navigation__item-text')    
 };

get policiesSectionList() {
    return cy.get('.policies-links-wrapper li.links-item')
}
    
open() {
    cy.visit('https://www.epam.com/')
    return this;
};
clickContactUsButton() {
    this.contactUSButton.click();
    return new ContactUsPage();
};
clickAcceptCookiesButton() {
    this.acceptCookiesButton.click();
    return this;
};
clickThemeToggle() {
    this.themeToggle.click();
    return this;
};
clickLanguageSwitcher() {
    this.languageSwitcher.click();
    return this;
};
clickUALannguage() {
    this.uaLanguage.click();
    return this;
};
clickSearchIcon() {
    this.searchIcon.click();
    return this;
};
typeInSearchField(keyword) {
    this.searchInputField.type(keyword);
    return this;
};
clickFindButton() {
    this.findButton.click();
    return this;
};
clickHamburgerMenuButton() {
    this.hamburgerMenuButton.click();
    return this;
};

clickCompanyLogoButton() {
    this.companyLogoButton.click();
    return this;
};
clickAboutButton() {
    this.mainNavItem.contains("About").click();
    return this;
};
}

export default BasePage;