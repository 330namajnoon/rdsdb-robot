const readLine = require("readline");
const fs = require("fs");
const SESSION_FILE = "session.json";

async function saveSession(page) {
    const cookies = await page.cookies();
    fs.writeFileSync(SESSION_FILE, JSON.stringify(cookies)); // Guarda las cookies en un archivo
}

function promptText(message = "TEXT") {
    return new Promise((resolve) => {
        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(message, (res) => {
            rl.close();
            resolve(res);
        });
    });
}

async function loadSession(page) {
    if (fs.existsSync(SESSION_FILE)) {
        const cookies = JSON.parse(fs.readFileSync(SESSION_FILE));
        await page.setCookie(...cookies);
    }
}

function removeSession() {
    return new Promise((resolve, reject) => {
        fs.writeFile(SESSION_FILE, JSON.stringify([]), (err) => {
            if (err) reject(err);
            else resolve(true);
        });

    })
}

const timeOut = (time) => new Promise((resolve) => setTimeout(resolve, time));

module.exports = { promptText, loadSession, saveSession, timeOut, removeSession };
