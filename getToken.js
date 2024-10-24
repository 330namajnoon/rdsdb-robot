const puppeteer = require("puppeteer");
const { promptText, saveSession, loadSession } = require("./utils");

async function getToken() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await loadSession(page);

    await page.goto("https://rdsdb-dev.digimobil.es:8443/call-center/store/view/channel/3");

    try {
        await page.waitForSelector("#inputEmail", { timeout: 1000 });

        await page.type("#inputEmail", "sina.majnoon@digimobil.es");
        await page.type("#inputPassword", "Sinmaj.2024");

        await page.click(".mt-4.btn.btn-md.btn-primary.mt-3.w-100.g-recaptcha-custom");

        await page.waitForNavigation();

        await page.waitForSelector("#inputCode", { timeout: 1000 });

        const code = await promptText("Codigo de verificacion:");
        await page.type("#inputCode", code);

        await page.click(".mt-4.btn.btn-md.btn-success.mt-3.w-100");
    } catch (error) {
        await page.evaluate(async () => {
            try {
                const links = Array.from(document.querySelectorAll("a"));
                const con = links.find((link) => link.innerHTML.includes("Continua"));
                con?.click();
                await page.waitForNavigation();
            } catch (error) {
                console.log(error);
            }
            return true;
        });
    }

    await page.select("#select-referals", "f113c1cacee52ef67539408f64cea496");

    const token = await page.evaluate(async () => {
        return document.querySelector("#storeIframe").src.split("?")[1];
    });

    await saveSession(page);
    await browser.close();
    return token;
}

module.exports = getToken;