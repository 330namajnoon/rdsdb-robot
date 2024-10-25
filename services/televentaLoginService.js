const puppeteer = require("puppeteer");
const config = require("../config");
const { loadSession } = require("../utils");





async function televentaLoginService({country = "es", base = ""}) {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1080, height: 1024 } });
    try {
        const page = await browser.newPage();
        await loadSession(page);
        await page.goto(`${config[country].rdsdbURL}call-center/store/view/channel/3`);
        await page.waitForSelector(".btn.btn-primary");
        await page.click(".btn.btn-primary");
        await page.goto(`${config[country].rdsdbURL}call-center/store/view/channel/3`);
        await page.waitForSelector("#select-referals");
        await page.select("#select-referals", "f113c1cacee52ef67539408f64cea496");
        await page.waitForSelector("#storeIframe");
        const token = await page.evaluate(() => {
            return document.querySelector("#storeIframe").src.split("?")[1];
        });
        await browser.close();
        return `${base}?${token}`;
    } catch (error) {
        await browser.close();
        throw error;
    }
}

module.exports = televentaLoginService;
