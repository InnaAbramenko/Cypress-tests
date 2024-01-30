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
        homePage.themeToggle.click();
        cy.get('.light-mode .header-ui-23').should('have.css', '--header-background-color', 'rgb(251, 250, 250)')
    });

    it('Verify the policies list items', () => {
        investorsItem.should('be.visible');
    })
})