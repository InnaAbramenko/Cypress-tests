import BasePage from "./BasePage";

class HomePage extends BasePage {
  
    get locationsList() {
        return cy.get('.js-tabs-title');
    };
    
    get locationAmericas() {
        return cy.get(':nth-child(1) > .tabs-23__link');
    };
    get locationEMEA() {
        return cy.get(':nth-child(2) > .tabs-23__link');
    };
    get locationAPAC() {
        return cy.get(':nth-child(3) > .tabs-23__link');
    };
    get searchResults() {
        return cy.get('div.search-results__items article');

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