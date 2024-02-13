class CheckoutPage {

    get firstNameBilling() {return cy.get('#BillingNewAddress_FirstName')};
    get lastNameBilling() {return  cy.get('#BillingNewAddress_LastName')};
    get emailBilling() {return cy.get('#BillingNewAddress_Email')};
    get country() {return cy.get('#BillingNewAddress_CountryId')};
    get state() {return cy.get('#BillingNewAddress_StateProvinceId')};
    get city() {return cy.get('#BillingNewAddress_City')};
    get address() {return cy.get('#BillingNewAddress_Address1')};
    get postalCode() {return cy.get('#BillingNewAddress_ZipPostalCode')};
    get phoneNumber() {return cy.get('#BillingNewAddress_PhoneNumber')};
    get continueBillingButton() {return cy.get('#billing-buttons-container > .button-1')};
    get continueShippingAddresButton() {return cy.get('#shipping-buttons-container > .button-1')};
    get secondDayAirShippingMethod() {return cy.get('#shippingoption_2')};
    get continueShippinfMethodButton() {return cy.get('#shipping-method-buttons-container > .button-1')};
    get creditCardOption() {return cy.get('#paymentmethod_2')};
    get continuePaymentMethodButton() {return cy.get('#payment-method-buttons-container > .button-1')};
    get creditCardTypeDropdown() {return cy.get('#CreditCardType')};
    get cardHolderNameInput() {return cy.get('#CardholderName')};
    get cardNumberInput() {return cy.get('#CardNumber')};
    get expireMonthDropdown() {return cy.get('#ExpireMonth')};
    get expireYearDropdown() {return cy.get('#ExpireYear')};
    get cardCodeInput() {return cy.get('#CardCode')};
    get continuePaymentInfoButton() {return cy.get('#payment-info-buttons-container > .button-1')};
    get orderReviewBlock() {return cy.get('.order-review-data')};
    get billingInfoTitle() {return cy.get('.billing-info > :nth-child(1) > strong')};
    get billingInfoName() {return cy.get('.billing-info > .name')};
    get billingInfoEmail() {return cy.get('.billing-info > .email')};
    get billingInfoPhone() {return cy.get('.billing-info > .phone')};
    get billingInfoAddress1() {return cy.get('.billing-info > .address1')};
    get billingInfoPostalCode() {return cy.get('.billing-info > .city-state-zip')};
    get billingInfoCountry() {return cy.get('.billing-info > .country')};
    get billingInfoPaymentMethodTitle() {return cy.get('.billing-info > :nth-child(9) > strong')};
    get billingInfoPaymentMethod() {return cy.get('.billing-info > .payment-method')};
    get shippingAddressTitle() {return cy.get('.shipping-info > :nth-child(1) > strong')};
    get shippingInfoName() {return cy.get('.shipping-info > .name')};
    get shippingInfoEmail() {return cy.get('.shipping-info > .email')};
    get shippingInfoPhone() {return cy.get('.shipping-info > .phone')};
    get shippingInfoAdress1() {return cy.get('.shipping-info > .address1')};
    get shippingInfoCity() {return cy.get('.shipping-info > .city-state-zip')};
    get shippingInfoCountry() {return cy.get('.shipping-info > .country')};
    get shippingMethodTitle() {return cy.get('.shipping-info > :nth-child(9) > strong')};
    get shippingMethod() {return cy.get('.shipping-info > .shipping-method')};
    get continueConfirmOrderButton() {return cy.get('#confirm-order-buttons-container > .button-1')};
    get successOrderBlock() {return cy.get('.section')};
    get orderDetailsLink() {return cy.get('.details > :nth-child(2) > a')};
    get orderPageTitle() {return cy.get('h1')};
    get orderSubTotal() {return cy.get(':nth-child(1) > .cart-total-right > .nobr')};
    get shippingAmount() {return cy.get(':nth-child(2) > .cart-total-right > .nobr')};
    get orderTotal() {return cy.get('.nobr > strong')};
    get orderProductName() {return cy.get('em > a')};

    fillBillingAddress(options) {
        if (options.firstNameBilling) {
            this.firstNameBilling.type(options.firstNameBilling)
        }
        if (options.lastNameBilling) {
            this.lastNameBilling.type(options.lastNameBilling)
        }
        if (options.emailBilling) {
            this.emailBilling.type(options.emailBilling)
        }
        if (options.country) {
            this.country.select(options.country)
        }
        if (options.state) {
            this.state.select(options.state)
        }
        if (options.city) {
            this.city.type(options.city)
        }
        if (options.address) {
            this.address.type(options.address)
        }
        if (options.postalCode) {
            this.postalCode.type(options.postalCode)
        }
        if (options.phoneNumber) {
            this.phoneNumber.type(options.phoneNumber)
        }
    };

    clickContinueBillingButton() {
        this.continueBillingButton.click();
        return this;
    };

    clickContinueShippingAddressButton() {
        this.continueShippingAddresButton.click();
        return this;
    };

    clickSecondDayAirShippingMethod() {
        this.secondDayAirShippingMethod.click();
        return this;
    };

    clickContinueShippinfMethodButton() {
        this.continueShippinfMethodButton.click();
        return this;
    };

    clickCreditCardOption() {
        this.creditCardOption.click();
        return this;
    };

    clickContinuePaymentMethodButton() {
        this.continuePaymentMethodButton.click();
        return this;
    };

    fillCardInfo(options) {
        if (options.creditCardTypeDropdown) {
            this.creditCardTypeDropdown.select(options.creditCardTypeDropdown)
        }
        if (options.cardHolderNameInput) {
            this.cardHolderNameInput.type(options.cardHolderNameInput)
        }
        if (options.cardNumberInput) {
            this.cardNumberInput.type(options.cardNumberInput)
        }
        if (options.expireMonthDropdown) {
            this.expireMonthDropdown.select(options.expireMonthDropdown)
        }
        if (options.expireYearDropdown) {
            this.expireYearDropdown.select(options.expireYearDropdown)
        }
        if (options.cardCodeInput) {
            this.cardCodeInput.type(options.cardCodeInput)
        }

    };

    clickContinuePaymentInfoButton() {
        this.continuePaymentInfoButton.click();
        return this
    };

    clickContinueConfirmOrderButton() {
        this.continueConfirmOrderButton.click();
        return this;
    };

    clickOrderDetailsLink() {
        this.orderDetailsLink.click();
        return this;
    }

}

export default CheckoutPage;