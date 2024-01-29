import HomePage from "../../support/page_object/homePage.cy";

describe('UI Tests', () => {
    const homePage = new HomePage();

    beforeEach(() => {
        homePage.open();
        cy.viewport(1440, 1080);
        homePage.acceptCookiesButton.click();
    });

    it('Verify page title', () => {
        const pageTitle = cy.title();
        pageTitle.should('eq', 'EPAM | Software Engineering & Product Development Services')
    
    });

    it('Verify the ability to switch the theme', () => {
        const toggleColor = cy.get(':nth-child(3) > .theme-switcher');
        toggleColor.click();
        cy.get('.header__inner').should('have.css', '--header-background-color', 'rgb(251, 250, 250)')
    })
})