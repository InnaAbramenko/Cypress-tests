import ApparelShoesPage from "../../support/page_object/ApparelShoesPage";
import ProductPage from "../../support/page_object/ProductPage";
import ShopBasePage from "../../support/page_object/ShopBasePage";
import ShopComputerDesktopsPage from "../../support/page_object/ShopComputerDesktopsPage";
import ShopCustomerPage from "../../support/page_object/ShopCustomerPage";
import ShopHomePage from "../../support/page_object/ShopHomePage";
import ShopLoginPage from "../../support/page_object/ShopLoginPage";
import ShopRegisterPage from "../../support/page_object/ShopRegisterPage";
import WishlistPage from "../../support/page_object/WishlistPage";

describe('UI Tests', () => {
    const shopBasePage = new ShopBasePage();
    const shopHomePage = new ShopHomePage();
    const shopRegisterPage = new ShopRegisterPage();
    const shopCustomerPage = new ShopCustomerPage();
    const shopLoginPage = new ShopLoginPage();
    const shopComputerDesktopPage = new ShopComputerDesktopsPage();
    const apparelShoesPage = new ApparelShoesPage();
    const productPage = new ProductPage();
    const wishListPage = new WishlistPage();

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

    it('Verify that ‘Computers’ group has 3 sub-groups with correct names', () => {
        shopHomePage.computersList.should('have.length', 3)
        shopHomePage.desktopsListItem.contains('Desktops')
        shopHomePage.notebooksListItem.contains('Notebooks')
        shopHomePage.accessoriesListItem.contains('Accessories')
    });

    it('Check sorting option "Name: A to Z" on the products list page', () => {
        shopHomePage
            .clickComputersMenuItem()
            .clickDesktopsSubCategory()
        shopComputerDesktopPage
            .selectDropDownItem('Name: A to Z')
        .productsList
            .then(items => {
          const unsortedItems = items.map((index, html) => Cypress.$(html).text()).get();
          const sortedItems = unsortedItems.slice().sort();
          expect(unsortedItems).to.deep.equal(sortedItems);
        })
    });

    it('Check the ability to change number of product items on the page', () => {
        shopHomePage
            .clickComputersMenuItem()
            .clickDesktopsSubCategory()
        shopComputerDesktopPage
            .selectDisplayPerPageDropDownItem('4')
            .productsList.should('have.length', 4)
            

    });

    it.only('Verify the ability to add a product to the Wishlist', () => {
        shopHomePage
            .clickLoginIcon();
        shopLoginPage.emailField.type('inna_a9@email.com')
        shopLoginPage.passwordField.type('testpassword1')
        shopLoginPage
            .clickLoginButton()
            .clickApparelShoesMenuItem()
        apparelShoesPage
            .clickPolkaDotTopProduct()
        productPage
            .clickAddToWishlistButton()
            .addedToWishlistMessage.should('have.text', 'The product has been added to your wishlist')
        productPage
            .clickWishlistIcon()
        wishListPage
            .productInWishlist.should('be.visible').and("have.text", "50's Rockabilly Polka Dot Top JR Plus Size")
        wishListPage
            .wishlistQtyInput.should('have.value', '1')
        wishListPage
            .ckickRemoveFromWishlistCheckbox()
            .clickUpdateWishlistButton()

    })



})