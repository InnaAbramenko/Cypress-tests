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
    get cookiePolicyItem() {
        return cy.get("a[href='/cookie-policy']");
    };
    get openSourceItem() {
        return cy.get("div.policies a[href='/services/engineering/open-source']");
    };
    get privacyNoticeItem() {
        return cy.get("a[href='/applicant-privacy-notice']");
    };
    get privacyPoliceItem() {
        return cy.get("div.policies a[href='https://privacy.epam.com/core/interaction/showpolicy?type=CommonPrivacyPolicy']");
    };
    get webAccessItem() {
        return cy.get("a[href='/web-accessibility-statement']");
    };
    open() {
        cy.visit('https://www.epam.com/');
    }

}

export default HomePage;