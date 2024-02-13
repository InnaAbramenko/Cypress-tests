import ApparelShoesPage from "../../support/page_object/ApparelShoesPage";
import CartPage from "../../support/page_object/CartPage";
import CheckoutPage from "../../support/page_object/CheckoutPage";
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
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

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

    it('Verify the ability to add a product to the Wishlist', () => {
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
            .successNotification.should('have.text', 'The product has been added to your wishlist')
        productPage
            .clickWishlistIcon()
        wishListPage
            .cartProductName.should('be.visible').and("have.text", "50's Rockabilly Polka Dot Top JR Plus Size")
        wishListPage
            .qtyInput.should('have.value', '1')
        wishListPage
            .ckickRemoveFromWishlistCheckbox()
            .clickUpdateWishlistButton()

    });

    it('Check adding a product to the cart and removing it', () => {
        shopHomePage
            .clickApparelShoesMenuItem()
        apparelShoesPage
            .clickPolkaDotTopProduct()
        productPage
            .clickAddToCartButton()
            .successNotification.should('have.text', 'The product has been added to your shopping cart')
        productPage
            .shoppingCartIcon.click()
        cartPage
            .cartProductName.should('be.visible').and("have.text", "50's Rockabilly Polka Dot Top JR Plus Size")
        cartPage
            .qtyInput.should('have.value', '1');
        cartPage
            .clickRemoveFromCartCheckbox()
            .clickUpdateCartButton()
        cartPage
            .emptyCartMessage.should('contain', 'Your Shopping Cart is empty!')
        cartPage
            .cartIconQuantity.should('have.text', '(0)')

    });

    it('Verify its possible to checkout a product', () => {
        shopHomePage
            .clickApparelShoesMenuItem()
        apparelShoesPage
            .clickPolkaDotTopProduct()
        productPage
            .clickAddToCartButton()
            .shoppingCartIcon.click()
        cartPage
            .clickTermsOfServiceCheckbox()
            .clickCheckoutButton()
            .clickCheckoutAsGuestButton()
        checkoutPage
            .fillBillingAddress({
            firstNameBilling: 'Inna',
            lastNameBilling: 'Abramenko',
            emailBilling: 'inna_a10@email.com',
            country: 'United States',
            state: 'Florida',
            city: 'Orlando',
            address: 'Green Street 55',
            postalCode: '151515',
            phoneNumber: '1234567890'
        })
        checkoutPage
            .clickContinueBillingButton()
            .clickContinueShippingAddressButton()
            .clickSecondDayAirShippingMethod()
            .clickContinueShippinfMethodButton()
            .clickCreditCardOption()
            .clickContinuePaymentMethodButton()
        checkoutPage
            .fillCardInfo({
                creditCardTypeDropdown: 'Master card',
                cardHolderNameInput: 'Inna Abramenko',
                cardNumberInput: '5105105105105100',
                expireMonthDropdown: '05',
                expireYearDropdown: '2027',
                cardCodeInput: '111'
            })
        checkoutPage
            .clickContinuePaymentInfoButton()
        checkoutPage
            .orderReviewBlock.should('be.visible')
        checkoutPage
            .billingInfoTitle.should('be.visible').and('have.text', 'Billing Address')
        checkoutPage
            .billingInfoName.should('be.visible').contains('Inna Abramenko')
        checkoutPage
            .billingInfoEmail.should('be.visible').contains('inna_a10@email.com')
        checkoutPage
            .billingInfoPhone.should('be.visible').contains('1234567890')
        checkoutPage
            .billingInfoAddress1.should('be.visible').contains('Green Street 55')
        checkoutPage
            .billingInfoPostalCode.should('be.visible').contains('Orlando , Florida 151515')
        checkoutPage
            .billingInfoCountry.should('be.visible').contains('United States')
        checkoutPage
            .billingInfoPaymentMethodTitle.should('be.visible').contains('Payment Method')
        checkoutPage
            .billingInfoPaymentMethod.should('be.visible').contains('Credit Card') 
        checkoutPage
            .shippingAddressTitle.should('be.visible').contains('Shipping Address')
        checkoutPage
            .shippingInfoName.should('be.visible').contains('Inna Abramenko')
        checkoutPage
            .shippingInfoEmail.should('be.visible').contains('inna_a10@email.com')
        checkoutPage
            .shippingInfoPhone.should('be.visible').contains('1234567890')
        checkoutPage
            .shippingInfoAdress1.should('be.visible').contains('Green Street 55')
        checkoutPage
            .shippingInfoCity.should('be.visible').contains('Orlando , Florida 151515')
        checkoutPage
            .shippingInfoCountry.should('be.visible').contains('United States')
        checkoutPage
            .shippingMethodTitle.should('be.visible').contains('Shipping Method')
        checkoutPage
            .shippingMethod.should('be.visible').contains('2nd Day Air')
        checkoutPage
            .clickContinueConfirmOrderButton()
            .successOrderBlock.should('be.visible')
        checkoutPage
            .clickOrderDetailsLink()
            .orderPageTitle.should('be.visible').and('have.text', 'Order information')
        checkoutPage
            .orderSubTotal.should('be.visible').and('contain', '11.00')
        checkoutPage
            .shippingAmount.should('be.visible').and('contain', '20.00')
        checkoutPage
            .orderTotal.should('be.visible').and('contain', '31.00')
        checkoutPage
            .orderProductName.should('be.visible').and("have.text", "50's Rockabilly Polka Dot Top JR Plus Size")
            


    })



})