class HomePage {
    get acceptCookiesButton() {
        return cy.get('#onetrust-accept-btn-handler');
    };
    get themeToggle() {
        return cy.get(':nth-child(3) > .theme-switcher');
    };
    get investorsItem() {
        return cy.get("a[href='/investors']");
    };
    open() {
        cy.visit('https://www.epam.com/');
    }

}

export default HomePage;