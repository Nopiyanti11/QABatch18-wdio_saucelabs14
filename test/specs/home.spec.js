import fs from 'node:fs'
import { HomeAction } from '../actions/home.action.js';
import { LoginAction } from '../actions/login.action.js';
import credential from '../test_data/credential.js';

describe('Home Page Tugas Nopiyanti', () => {
    //buat jadi variabel agar bisa di panggil
    const homeAction = new HomeAction();
    const loginAction = new LoginAction();

    afterEach(async function () {
            if (this.currentTest?.state === "failed"){
                const screenshot = await browser.takeScreenshot()
                fs.mkdirSync('./reports/screenshots', {recursive: true})
                const safeTitle = this.currentTest.title.replace(/[^a-z0-9]/gi, '_')
                fs.writeFileSync(`./reports/screenshots/${safeTitle}.png`, screenshot, 'base64')
            }
        })
    
    it('Verify homepage, scroll down/up, filter and logout', async () => {
       //Memastikan form login sudah siap
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)
        // Login
        await loginAction.login(credential.standard.username, credential.standard.password);
        

        //verify Home Page
        await homeAction.verifyHomePage();

        await homeAction.swipe('down');
        await homeAction.swipe('up');

        await homeAction.tapFilter();
        await homeAction.tapCancelFilter();

        await homeAction.tapBurgerMenu();
        await homeAction.tapLogout();
    });
});