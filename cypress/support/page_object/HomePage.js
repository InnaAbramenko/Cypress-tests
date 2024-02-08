import BasePage from "./BasePage";

class HomePage extends BasePage {
  
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

    get locationsList() {
        return cy.get('.tabs-23__ul.js-tabs-links-list');
    };
    
    get locationAmericas() {
        return cy.get('.tabs-23__title.active > .tabs-23__link');
    };
    get locationEMEA() {
        return cy.get(':nth-child(2) > .tabs-23__link');
    };
    get locationAPAC() {
        return cy.get(':nth-child(3) > .tabs-23__link');
    };
    get searchResults() {
        return cy.get('div.search-results__items');

    };
    clickLocationEMEA() {
        this.locationEMEA.click();
        return this;
    };
    clickLocationAPAC() {
        this.locationAPAC.click();
        return this; 
    };
    clickLocationAmericas() {
        this.locationAmericas.click();
        return this;
    };
   

}

export default HomePage;