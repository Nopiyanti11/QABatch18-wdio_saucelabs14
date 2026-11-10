import {expect} from '@wdio/globals'
import fs from 'node:fs'
import loginAction from '../actions/login.action.js'
import appHelper from '../../utilities/helpers/app.helper.js'
import credential from '../test_data/credential.js'

describe('Swag Labs App Tugas Nopiyanti', () => {
let isFirstTest = true;

    beforeEach(async () => {
        if (isFirstTest) {
            // Pada test case pertama, biarkan WebdriverIO yang membuka aplikasi agar tidak buka 2 kali
            isFirstTest = false;
        } else {
            // Pada test case kedua dan seterusnya, bersihkan sesi login dan buka ulang aplikasi
            await appHelper.resetApp();
        }
    })

    afterEach(async function () {
        if (this.currentTest?.state === "failed"){
            const screenshot = await browser.takeScreenshot()
            fs.mkdirSync('./reports/screenshots', {recursive: true})
            const safeTitle = this.currentTest.title.replace(/[^a-z0-9]/gi, '_')
            fs.writeFileSync(`./reports/screenshots/${safeTitle}.png`, screenshot, 'base64')
        }
    })

    after(async () => {
        // Tutup aplikasi satu kali di paling akhir setelah semua test case selesai
        await appHelper.closeApp()
    })   
    it('should login successfully with standard user', async () => {
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)
        await loginAction.login(credential.standard.username, credential.standard.password)
       //Memastikan masuk ke halaman produk
        const isProductsVisible = await loginAction.waitForProducts()
        await expect(isProductsVisible).toBe(true)
    })
    
    it('Negative test, should not login with locked user', async () => {
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)
        await loginAction.login(credential.locked.username, credential.locked.password)
        
        // memastikan tetap di halaman login.
        const stillOnLoginPage = await loginAction.isOnLoginPage()
        await expect(stillOnLoginPage).toBe(true)
    })
})
