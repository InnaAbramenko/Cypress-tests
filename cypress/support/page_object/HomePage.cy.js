class HomePage {
    get acceptCookiesButton() {
        return cy.get('#onetrust-accept-btn-handler');
    }
    open() {
        cy.visit('https://www.epam.com/');
    }

}

export default HomePage;