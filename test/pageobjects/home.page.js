export class HomePage{
     get FilterButton() {
        return 'android=new UiSelector().description("test-Modal Selector Button")';
    }
    get BurgerMenuButton() {
        return 'android=new UiSelector().description("test-Menu")';
    }
    get AddToCartButton (){
        return 'android=new UiSelector().description("test-ADD TO CART").instance(0)'
    }
    get CancelFilterButton (){
        return 'android=new UiSelector().text("Cancel")'
    }
    get LogoutButton () {
        return 'android=new UiSelector().text("LOGOUT")'
    }
}

export default new HomePage()