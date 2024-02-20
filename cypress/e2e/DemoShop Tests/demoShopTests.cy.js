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
            .clickRegisterIcon(); //todo це не icon, а link, і метод повертає невірну сторінку
        shopRegisterPage.firstNameField.type('TestName1') //todo Спробуй зробити параметризовані методи заповнення кожного поля, і щоб використовувався чейн
        shopRegisterPage.lastNameField.type('TestSurname1') //todo Ці поля у тебе чомусь не в РегістерПейдж, а в хоумПейдж. Чому?
        shopRegisterPage.emailField.type('inna_a10@email.com') // todo Цей тест у тебе пройде пасом лише раз, отже щоб він ранався на постійній основі, тобі варто першу частину обирати рандомну,
        shopRegisterPage.passwordField.type('testpassword1')//todo щоб кожного разу генерувалася рандомна стрінга і помістити її в константу, для перевірки стрічки 47
        shopRegisterPage.confirmPasswordField.type('testpassword1')
        shopRegisterPage
            .clickRegisterButton();
        shopRegisterPage //todo попередній метод у тебе має ретурн зис, тож можеш продовжувати чейн
            .resultBlock.contains('Your registration completed')
        shopCustomerPage //todo Ти клікаєш не на Кастомер пейджі, а на хоум, до того ж локатор у тебе на хоумі, а клік чомусь вже на кастомер
            .clickAccountIcon();// todo це не айкон, а лінк. Цей метод має бути на ХоумПейдж і повертати Кастомер Пейдж, продовжуй чейн
        shopCustomerPage.firstNameField.should('have.value', 'TestName1')
        shopCustomerPage.lastNameField.should('have.value', 'TestSurname1')
        shopCustomerPage.emailField.should('have.value', 'inna_a10@email.com')
    });

    it('Verify user login', () => {
        shopHomePage
            .clickLoginIcon(); //todo невірний ретурн в методі
        shopLoginPage.emailField.type('inna_a9@email.com')
        shopLoginPage.passwordField.type('testpassword1')
        shopLoginPage
            .clickLoginButton(); //todo невірний ретурн в методі
        shopHomePage.accountIcon.should('have.text', 'inna_a9@email.com')
        shopHomePage.logoutIcon.should('have.text', 'Log out')
        shopHomePage.shoppingCartIcon.should('have.text', 'Shopping cart')//todo це не icon, а link
        shopHomePage.wishListIcon.should('have.text', 'Wishlist')//todo це не icon, а link

    });

    it('Verify that ‘Computers’ group has 3 sub-groups with correct names', () => {
        shopHomePage.computersMenuItem.trigger("mouseover") //todo додала використання наведення курсора
            .parent().find("li").should('have.length', 3) //todo і далі тут же шукай контейнз текст, ті всі локатори нижче непотрібні
        shopHomePage.computersList.should('have.length', 3) //todo В дом-дереві цей список є, але тобі перевірити його на юайці, для цього використай mouseover
        shopHomePage.desktopsListItem.contains('Desktops')
        shopHomePage.notebooksListItem.contains('Notebooks')
        shopHomePage.accessoriesListItem.contains('Accessories')
    });

    it('Check sorting option "Name: A to Z" on the products list page', () => {
        shopHomePage
            .clickComputersMenuItem()
            .clickDesktopsSubCategory() //todo невірний ретурн
        shopComputerDesktopPage
            .selectDropDownItem('Name: A to Z')
            .productsList //todo Тут тобі не потрібен список продуктів, бо в ньому і текст, і рейтинг , і картинки. А ти перевіряєш лише назви, тобто ".product-title a"
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
            .clickApparelShoesMenuItem() //todo невірний ретурн
        apparelShoesPage
            .clickPolkaDotTopProduct() // todo якщо товар зміниться, то ця назва буде неактуально, варто назвати його просто перший в списку без конкретики, і я б використовувала локатор (.product-title a).first()
        //todo . Невірний ретурн .
        productPage
            .clickAddToWishlistButton()
            .successNotification.should('have.text', 'The product has been added to your wishlist')
        productPage
            .clickWishlistIcon() //todo невірний ретурн
        wishListPage
            .cartProductName.should('be.visible').and("have.text", "50's Rockabilly Polka Dot Top JR Plus Size")

        // //todo Не використовуй хард код(строка 115), бо назва продукту динамічна і тест не пройде. Тобі варто зберегти назву першого айтему у змінну і потім звіряти її з тою, що буде у вішлісті.
        // //todo  Ось один з варіантів як можна (замість стрічок 106-115 - строки 119-128, локатор - то першого айтему, його треба занести в ПОМ:
        // cy.get(".product-title a").first().invoke("text").then(itemName => {
        //     cy.get(".product-title a").first().click();
        //     productPage
        //         .clickAddToWishlistButton()
        //         .successNotification.should('have.text', 'The product has been added to your wishlist')
        //     productPage
        //         .clickWishlistIcon() //todo невірний ретурн
        //     wishListPage
        //         .cartProductName.should('be.visible').and("include.text", itemName)
        // })
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
            .clickApparelShoesMenuItem() //todo використовуй чейн і там де це тобі непотрібно, то не екстендься від Бейз Пейдж, в такому разі без першкод використовуватимеш чейн
        apparelShoesPage
            .clickPolkaDotTopProduct()
        productPage
            .clickAddToCartButton()
            .shoppingCartIcon.click() //todo зроби метод кліку в ПОМ з вірним ретурном
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