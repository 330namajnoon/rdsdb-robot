const puppeteer = require("puppeteer");
const { saveSession, removeSession, timeOut } = require("./utils");

async function authenticator(code) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    
    try {
        await removeSession();
        await page.goto("https://digi-accounts-sso.digimobil.es/v2/login");
        await page.waitForSelector("#inputEmail", { timeout: 2000 });

        await page.type("#inputEmail", "sina.majnoon@digimobil.es");
        await page.type("#inputPassword", "Sinmaj.2024");

        await page.click(".mt-4.btn.btn-md.btn-primary.mt-3.w-100.g-recaptcha-custom");

        await page.waitForNavigation();

        await page.waitForSelector("#inputCode", { timeout: 1000 });

        await page.type("#inputCode", code);

        await page.click(".mt-4.btn.btn-md.btn-success.mt-3.w-100");

        await page.waitForNavigation();
        
        await saveSession(page);

    } catch (error) {
        console.log(error);
    }
    
    try {

        await page.waitForSelector(".alert.alert-danger", { timeout: 3000 })
        await browser.close();
        throw false;
    } catch (error) {
        await browser.close();
        return true;
        
    }

}

module.exports = authenticator;