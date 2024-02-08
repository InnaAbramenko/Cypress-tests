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
get aboutMenuButton() {
    return cy.get('[gradient-text="About"] > .first-level-link');
};
get companyLogoButton() {
    return cy.get('.desktop-logo > .header__logo-light');
};
get languageSwitcher() {
    return cy.get(".location-selector__button > .location-selector__button-language")
};
get uaLanguage() {
    return cy.get("ul.location-selector__list a[href='https://careers.epam.ua']")
};
get languageSwitcherUA() {
    return cy.get("div.location-selector-ui.header__control button.location-selector__button")
};
get searchIcon() {
    return cy.get('.search-icon');
};
get searchInputField() {
    return cy.get('#new_form_search');
};
get findButton() {
    return cy.get('.custom-button.button-text.font-900.gradient-border-button.large-gradient-button.uppercase-text.custom-search-button');
};

get contactUSButton() {
    return cy.get('.header__content > :nth-child(5)');
};

get aboutButton() {
    return cy.get(':nth-child(4) > .top-navigation__item-text > .top-navigation__item-link')    
 };

get policiesSection() {
    return cy.get('.policies-links-wrapper')
}
    
open() {
    cy.visit('https://www.epam.com/')
    return this;
};
clickContactUsButton() {
    this.contactUSButton.click();
    return this;
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
clickAboutMenuButton() {
    this.aboutMenuButton.click();
    return this;
};
clickCompanyLogoButton() {
    this.companyLogoButton.click();
    return this;
};
}

export default BasePage;