import ShopBasePage from "../../support/page_object/ShopBasePage";
import ShopCustomerPage from "../../support/page_object/ShopCustomerPage";
import ShopHomePage from "../../support/page_object/ShopHomePage";
import ShopLoginPage from "../../support/page_object/ShopLoginPage";
import ShopRegisterPage from "../../support/page_object/ShopRegisterPage";

describe('UI Tests', () => {
    const shopBasePage = new ShopBasePage();
    const shopHomePage = new ShopHomePage();
    const shopRegisterPage = new ShopRegisterPage();
    const shopCustomerPage = new ShopCustomerPage();
    const shopLoginPage = new ShopLoginPage();

    beforeEach(() => {
        shopHomePage
            .openDemoShop()
    });

    it('Verify new user registration', () => {
        shopHomePage
            .clickRegisterIcon();
        shopRegisterPage.firstNameField.type('TestName1')
        shopRegisterPage.lastNameField.type('TestSurname1')
        shopRegisterPage.emailField.type('inna_a10@email.com')
        shopRegisterPage.passwordField.type('testpassword1')
        shopRegisterPage.confirmPasswordField.type('testpassword1')
        shopRegisterPage
            .clickRegisterButton();
        shopRegisterPage
            .resultBlock.contains('Your registration completed')
        shopCustomerPage
            .clickAccountIcon();
        shopCustomerPage.firstNameField.should('have.value', 'TestName1')
        shopCustomerPage.lastNameField.should('have.value', 'TestSurname1')
        shopCustomerPage.emailField.should('have.value', 'inna_a10@email.com')
    });

    it('Verify user login', () => {
        shopHomePage
            .clickLoginIcon();
        shopLoginPage.emailField.type('inna_a9@email.com')
        shopLoginPage.passwordField.type('testpassword1')
        shopLoginPage
            .clickLoginButton();
        shopHomePage.accountIcon.should('have.text', 'inna_a9@email.com')
        shopHomePage.logoutIcon.should('have.text', 'Log out')
        shopHomePage.shoppingCartIcon.should('have.text', 'Shopping cart')
        shopHomePage.wishListIcon.should('have.text', 'Wishlist')

    });

    it.only('Verify that ‘Computers’ group has 3 sub-groups with correct names', () => {
        shopHomePage.computersList.should('have.length', 3)
        shopHomePage.desktopsListItem.contains('Desktops')
        shopHomePage.notebooksListItem.contains('Notebooks')
        shopHomePage.accessoriesListItem.contains('Accessories')
    })


})