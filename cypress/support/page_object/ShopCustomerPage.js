import ShopBasePage from "./ShopBasePage";

class ShopCustomerPage extends ShopBasePage {


    clickAccountIcon() {
        this.accountIcon.click();
        return this;
    }

}

export default ShopCustomerPage;