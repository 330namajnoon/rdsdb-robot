const puppeteer = require("puppeteer");
const config = require("../config");
const { loadSession } = require("../utils");





async function midigiLoginService({country = "es", clientId = "", email = "", phoneNumber = "", base = "", contractId = "", documentNumber = ""}) {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1080, height: 1024 } });
        const page = await browser.newPage();
        await loadSession(page);
        await page.goto(`${config[country].rdsdbURL}call-center/user-validator/user-management`);
        await page.waitForSelector(".btn.btn-primary");
        await page.click(".btn.btn-primary");
        await page.goto(`${config[country].rdsdbURL}call-center/user-validator/user-management`);
        await page.waitForSelector("#phoneNumber");
        await page.type("#phoneNumber", phoneNumber);
        await page.type("#rdsdbClientId", clientId);
        await page.type("#email", email);
        await page.type("#documentNumber", documentNumber);
        await page.type("#contract", contractId);
        await page.click("#submit");
        await page.waitForNavigation();
        await page.waitForSelector(".actionSelector", { timeout: 5000 });
        await page.select(".actionSelector", "loginAsMiDigi");
        const newPages = await Promise.all([
            new Promise((resolve) => browser.once("targetcreated", (target) => resolve(target.page()))),
            page.click(".btn.btn-primary.btn-sm.actionExecutor"),
        ]);
        if (!!base) {
            const loginToken = newPages[0].url().split("?")[1];
            await browser.close();
            return `${base}?${loginToken}`;
        }
        const loginToken = newPages[0].url();
        await browser.close();
        return loginToken;
        
    } catch (error) {
        console.log(error);
        browser.close();
        throw error;
    }
}

module.exports = midigiLoginService;
