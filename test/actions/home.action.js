import HomePage from '../pageobjects/home.page.js';

export class HomeAction {
    async verifyHomePage(){ 
        const FilterButton = await $(HomePage.FilterButton)
        const BurgerMenuButton = await $(HomePage.BurgerMenuButton)
        const AddToCartButton = await $(HomePage.AddToCartButton)
        
        //Assertion
        await FilterButton.waitForExist ({timeout: 5000})
        return FilterButton.isDisplayed()

        await BurgerMenuButton.waitForExist ({timeout: 5000})
        return BurgerMenuButton.isDisplayed()

        await AddToCartButton.waitForExist ({timeout: 5000})
        return AddToCartButton.isDisplayed()
    }
    //aksi klik
    async tapBurgerMenu(){
        const BurgerMenuButton = $(HomePage.BurgerMenuButton);
        await BurgerMenuButton.click()
    }
    async tapLogout() {
        const LogoutButton = $(HomePage.LogoutButton);
        await LogoutButton.click()
    }
    async tapFilter(){
        const FilterButton = $(HomePage.FilterButton);
        await FilterButton.click()
    }
    async tapCancelFilter(){
        const CancelFilterButton = $(HomePage.CancelFilterButton);
        await CancelFilterButton.click()
    }
    async scroll(){
        //Scroll Down
        await driver.touchAction([
            { action: 'press', x: 500, y: 1500},
            { action: 'MoveTo', x:500, y:500},
            'release'
        ])
        //scroll Up
        await driver.touchAction([
            {action:'press', x:500, y:500},
            {action:'moveTo', x:1500, y:500},
            'release'
        ])
    }
    //Scroll Dinamis sesuai element yang di inginkan
    async scrollToElement(selector, maxSwipes = 10) {
        for (let i = 0; i < maxSwipes; i++) {
            const element = await $(selector);
            const isDisplayed = await element.isDisplayed();
            if (isDisplayed) return true;

            await this.scroll('up');
        }
        return false;
    }
    //Scroll Custom
    async swipe(direction = 'down') {
        const { height, width } = await driver.getWindowSize();
        const startY = direction === 'down' ? height * 0.8 : height * 0.2;
        const endY = direction === 'down' ? height * 0.2 : height * 0.8;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'pointer1',
                actions: [
                    { type: 'pointerMove', x: width / 2, y: startY, duration: 100 },
                    { type: 'pointerDown', duration: 100 },
                    { type: 'pointerMove', x: width / 2, y: endY, duration: 500 },
                    { type: 'pointerUp', duration: 100 }
                ]
            }
        ]);
    }
}

export default new HomeAction()