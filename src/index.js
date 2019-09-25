import { writeFileSync } from 'fs';
import puppeteer from 'puppeteer';
import dappeteer from 'dappeteer';

export default {
    // Multiple browsers support
    isMultiBrowser: false,

    browser:        null,
    openedPages:    {},
    metamask:       null,

    /**
     * Open the browser with the given parameters
     * @param {number} id id of the opened browser
     * @param {string} pageUrl url to navigate to after creating browser
     */
    async openBrowser (id, pageUrl) {
        this.browser = await dappeteer.launch(puppeteer, {
            timeout:  10000,
            headless: false
        });

        this.metamask = await dappeteer.getMetamask(this.browser);

        const page = await this.browser.newPage();
        
        await page.goto(pageUrl);
        this.openedPages[id] = page;
    },

    async closeBrowser (id) {
        delete this.openedPages[id];
        await this.browser.close();
    },

    // Initialization
    async init () {
        return;
    },

    // Testcafe method to get Dappeter Metamask instance
    async getMetamask(t /* testcafe instance */) {
        return t.testRun.browserManipulationQueue.browserProvider.plugin.metamask;
    },

    async dispose () {
        return;
    },

    // Optional methods for multi-browser support
    async getBrowserList () {
        throw new Error('Not implemented!');
    },

    async isValidBrowserName (/* browserName */) {
        return true;
    },

    // Extra methods
    async canResizeWindowToDimensions (/* browserId, width, height */) {
        return true;
    },

    async resizeWindow (width, height /*, currentWidth, currentHeight*/) {
        // this sets the browser size, not the size of the visible screen so output may vary. setSize doesn't appear to be a function of webdriverjs
        await this.browser.manage().window().setRect({ width: width, height: height });
    },

    async maximizeWindow () {
        await this.browser.manage().window().maximize();
    },

    async takeScreenshot (screenshotPath /*, pageWidth, pageHeight*/) {
        const screenshot = await this.browser.takeScreenshot(screenshotPath);

        await writeFileSync(screenshotPath, screenshot, 'base64');
    }
};
