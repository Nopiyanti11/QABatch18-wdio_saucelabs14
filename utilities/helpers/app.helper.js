class AppHelper {
    constructor() {
        // Package name resmi aplikasi Swag Labs Android
        this.appId = 'com.swaglabsmobileapp';
    }

    async closeApp() {
        await driver.terminateApp(this.appId);
    }

    async launchApp() {
        await driver.activateApp(this.appId);
    }

    async resetApp() {
        // Pengganti resetApp() untuk Appium 2 / WDIO terbaru
        await driver.terminateApp(this.appId);
        await driver.pause(1500);
        await driver.activateApp(this.appId);
    }
}

module.exports = new AppHelper();

