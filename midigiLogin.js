const puppeteer = require("puppeteer");
const { loadSession, saveSession, promptText } = require("./utils");





async function loginMidigi(clientId = "123456") {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await loadSession(page);

    await page.goto("https://rdsdb-dev.digimobil.es:8443/call-center/user-validator/user-management");
    await page.setViewport({ width: 1080, height: 1024 });

    try {
        await page.waitForSelector("#rdsdbClientId", {timeout: 2000});
        
    } catch (error) {
        const button = await page.locator(".btn.btn-primary").setTimeout(2000).click();
    }
    try { 
        
        await page.waitForSelector("#rdsdbClientId", {timeout: 2000});
        await page.type("#rdsdbClientId", clientId);
        await page.click("#submit");
        console.log("sina")
    } catch (error) {
        try {
            await page.goto("https://rdsdb-dev.digimobil.es:8443/call-center/user-validator/user-management")
            await page.type("#rdsdbClientId", clientId);
            await page.click("#submit");
        } catch (error) {
            console.log(error)
        }
        
    }
    
    await page.waitForNavigation();
    

    let newPages;
    try {
        const select = await page.waitForSelector(".actionSelector");
        await select.select("loginAsMiDigi");
        newPages = await Promise.all([
            new Promise((resolve) => browser.once("targetcreated", (target) => resolve(target.page()))),
            page.click(".btn.btn-primary.btn-sm.actionExecutor"),
        ]);
        const loginToken = newPages[0].url().split("?")[1];
    
        await saveSession(page);
        await browser.close();
        return loginToken;
    } catch (error) {
        throw error;
    }
    
}

module.exports = loginMidigi;
