import { writeFileSync } from 'fs';
import puppeteer from 'puppeteer';
import dappeteer from 'dappeteer';

export default {
    // Multiple browsers support
    isMultiBrowser: false,
    openedBrowsers: {},
    metamask:       null,
    seleniumServer: null,

    /**
     * Open the browser with the given parameters
     * @param {number} id id of the opened browser
     * @param {string} pageUrl url to navigate to after creating browser
     * @param {string} browserName browser string in format 'browserName[@version][:platform]'
     */
    async openBrowser (id, pageUrl, browserName) {
        if (!browserName)
            throw new Error('Unsupported browser!');

        const browser = await dappeteer.launch(puppeteer, {
            timeout:  10000,
            headless: false
        });

        this.metamask = await dappeteer.getMetamask(browser);

        const page = await this.browser.newPage();
        
        await page.goto(pageUrl);
        this.openedPages[id] = page;

        browser.get(pageUrl);
        this.openedBrowsers[id] = browser;
        browser.manage().timeouts().implicitlyWait(80000);
        browser.sleep(600000);
    },

    async closeBrowser (id) {
        this.openedBrowsers[id].quit();
    },

    // Optional - implement methods you need, remove other methods
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

    async resizeWindow (id, width, height /*, currentWidth, currentHeight*/) {
        // this sets the browser size, not the size of the visible screen so output may vary. setSize doesn't appear to be a function of webdriverjs
        await this.openedBrowsers[id].manage().window().setRect({ width: width, height: height });
    },

    async maximizeWindow (id) {
        // May need to install a window manager like fluxbox if this doesn't work for Chrome. https://github.com/SeleniumHQ/docker-selenium/issues/559
        // or the workaround will be to set capabilities to start maximized.
        await this.openedBrowsers[id].manage().window().maximize();
    },

    async takeScreenshot (id, screenshotPath /*, pageWidth, pageHeight*/) {
        const screenshot = await this.openedBrowsers[id].takeScreenshot(screenshotPath);

        await writeFileSync(screenshotPath, screenshot, 'base64');
    }
};
