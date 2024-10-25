const { default: puppeteer } = require("puppeteer");
const { USER, digiAcountSecretCode } = require("../config");
const otplib = require("otplib");
const { saveSession } = require("../utils");


async function authenticationService() {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1080, height: 1024 } });
        const page = await browser.newPage();
        await page.goto("https://digi-accounts-sso.digimobil.es/v2/login");
        await page.waitForSelector("#inputEmail");
        await page.type("#inputEmail", USER.email);
        await page.type("#inputPassword", USER.password);
        await page.click(".mt-4.btn.btn-md.btn-primary.mt-3.w-100.g-recaptcha-custom");
        await page.waitForNavigation({ timeout: 10000 });
        await page.waitForSelector("#inputCode", { timeout: 2000 });
        await page.type("#inputCode", otplib.authenticator.generate(digiAcountSecretCode));
        await page.click(".mt-4.btn.btn-md.btn-success.mt-3.w-100");
        await page.waitForNavigation({ timeout: 10000 });
        await page.waitForSelector(".card-header.text-truncate", { timeout: 1000 });
        await saveSession(page);
        await browser.close();
        return true;
    } catch (error) {
        if (browser)
            browser.close();
        throw error;
    }
}

module.exports = authenticationService;