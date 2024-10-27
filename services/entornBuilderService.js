const { default: puppeteer } = require("puppeteer");
const { timeOut } = require("../utils");
const { exec } = require("child_process");
const pty = require("node-pty");
const fs = require("fs");

async function entornChangePassword(
    newPassword = "Sinmaj.2024",
    entornData = [
        {
            title: "El total de réplicas desplegadas disponibles es de: ",
            value: "1",
        },
        { title: "Usuario SSH entorno: ", value: "root" },
        {
            title: "Contraseña por defecto SSH entorno: ",
            value: "entornomidigibackendessina",
        },
        {
            title: "Servidor SSH entorno: ",
            value: "app-sw-247.digimobil.local",
        },
        { title: "Puerto conexión SSH entorno: ", value: "32131" },
        {
            title: "Cadena conexión SSH entorno: ",
            value: "ssh root@app-sw-247.digimobil.local -p 32131",
        },
        {
            title: "Ruta raíz (DocumentRoot) entorno: ",
            value: "/var/www/midigi-backend-es-entornomidigibackendessina",
        },
        {
            title: "URL entorno: ",
            value: '<a href="https://entornomidigibackendessina.sw.digimobil.es:12443/" class="!gl-text-inherit gl-underline" rel="nofollow noopener noreferrer">https://entornomidigibackendessina.sw.digimobil.es:12443/</a>',
        },
        { title: "IdeKey xDebug entorno: ", value: "XDEBUG-DIGI" },
        {
            title: "Comando para copiar la clave RSA local mediante CMD de Windows: ",
            value: "scp -P 32131 %HOMEDRIVE%%HOMEPATH%\\.ssh\\id_rsa root@app-sw-247.digimobil.local:~/.ssh/id_rsa",
        },
        {
            title: "Comando para copiar la clave RSA local mediante PowerShell de Windows: ",
            value: "scp -P 32131 ${HOME}\\.ssh\\id_rsa root@app-sw-247.digimobil.local:~/.ssh/id_rsa",
        },
        {
            title: "Comando para copiar la clave RSA local mediante Shell de Linux: ",
            value: "scp -P 32131 ${HOME}/.ssh/id_rsa root@app-sw-247.digimobil.local:~/.ssh/id_rsa",
        },
        {
            title: "Comando para modificar los permisos de la clave RSA desde cualquier S.O.: ",
            value: 'ssh root@app-sw-247.digimobil.local -p 32131 "chmod 0600 ~/.ssh/id_rsa"',
        },
    ]
) {
    await new Promise((resolve) => {
        let step = 0;
        const linuxComand = entornData.find((e) =>
            e.title.includes("Comando para copiar la clave RSA local mediante Shell de Linux:")
        )?.value;
        const path = entornData.find((e) => e.title.includes("Ruta raíz (DocumentRoot) entorno:")).value;
        const currentPassword = entornData.find((e) => e.title.includes("Contraseña por defecto SSH entorno:"))?.value;
        const sshCommand = entornData.find((e) => e.title.includes("Cadena conexión SSH entorno:"))?.value.split(" ");
        const sshProcces = pty.spawn(sshCommand[0], ["-t", ...sshCommand.slice(1)], {
            name: "xterm-color",
            cols: 80,
            rows: 30,
            cwd: process.env.HOME,
            env: process.env,
        });
        sshProcces.onData((data) => {
            if (data.toString().includes("password") && step === 0) {
                sshProcces.write(`${currentPassword}\r`);
                step++;
            } else if (step === 0) {
                sshProcces.write("\x03");
                step = 3;
            } else if (data.toString().includes("password") && step === 1) {
                sshProcces.write(`${newPassword}\n`);
                step++;
            } else if (data.toString().includes("password") && step === 2) {
                sshProcces.write(`${newPassword}\n`);
                step++;
            } else if (step === 3) {
                sshProcces.write(`cd ${path}\n`);
                sshProcces.write("exit\n");
                step++;
            } else if (step === 4) {
                sshProcces.write(`${linuxComand}\n`);
                sshProcces.pause();
                step++;
            }
        });
        sshProcces.onExit(() => resolve());
    });
    return true;
}

async function entornBuilderService() {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1080, height: 1024 } });
        const page = await browser.newPage();
        await page.goto("https://gitlab.rcs-rds.ro/softwarespain");
        await page.waitForSelector(".nav-link.gl-tab-nav-item[data-testid='standard-tab']");
        await page.click(".nav-link.gl-tab-nav-item[data-testid='standard-tab']");
        await page.type("#user_login", "sina.majnoon@digimobil.es");
        await page.type("#user_password", "S4feri2585@");
        await page.click(".gl-button.btn.btn-block.btn-md.btn-confirm.js-sign-in-button[data-testid='sign-in-button']");
        await page.waitForNavigation();
        await page.goto(
            "https://gitlab.rcs-rds.ro/softwarespain/repositorios/midigi/midigi-backend-es/-/pipelines/new"
        );
        await page.waitForSelector("#dropdown-toggle-btn-40");
        await page.click("#dropdown-toggle-btn-40");
        await page.waitForSelector(".gl-listbox-search-input");
        await page.type(".gl-listbox-search-input", "sina");
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                setTimeout(() => {
                    const span = Array.from(document.querySelectorAll(".gl-new-dropdown-item-content"))
                        ?.filter((element) => element.nodeName === "SPAN")
                        ?.map((element) => element.children[1])
                        ?.find((element) => element.innerHTML.includes("sina"));
                    span?.click();
                    console.log(span);
                    resolve(true);
                }, 1000);
            });
            return true;
        });
        // await page.waitForSelector(".gl-button-text");
        // await page.click(".gl-button-text");
        await page.goto("https://gitlab.rcs-rds.ro/softwarespain/repositorios/midigi/midigi-backend-es/-/pipelines");
        await page.evaluate(async () => {
            let timer;
            try {
                await new Promise((resolve, reject) => {
                    timer = setInterval(() => {
                        const title = Array.from(document.querySelectorAll("tr")).filter((tr) => tr.className)[0]
                            .children[3].children[0].children[0].children[0].children[7].children[0].children[0]
                            .children[0].title;
                        const failed = Array.from(
                            Array.from(document.querySelectorAll("tr")).filter((tr) => tr.className)[0].children[3]
                                .children[0].children[0].children[0].children
                        )?.some((ch) => ch.children[0].children[0].children[0].title.includes("failed"));
                        console.log(title, failed);
                        if (title && title.includes("passed")) {
                            clearInterval(timer);
                            resolve();
                        }
                        if (failed) {
                            clearInterval(timer);
                            reject("Pipeline failed");
                        }
                    }, 1000);
                });
                await new Promise((resolve) => {
                    timer = setInterval(() => {
                        const button = Array.from(document.querySelectorAll("tr")).filter((tr) => tr.className)[0]
                            .children[3].children[0].children[0].children[0].children[2].children[0].children[0];
                        if (button) {
                            button.click();
                            clearInterval(timer);
                            resolve(true);
                        }
                    }, 1000);
                });
                await new Promise((resolve) => {
                    timer = setInterval(() => {
                        const button = document.getElementById("disclosure-46").children[0].children[0].children[0];
                        if (button) {
                            button.click();
                            clearInterval(timer);
                            resolve(true);
                        }
                    }, 1000);
                });
                return true;
            } catch (error) {
                throw error;
            }
        });
        await page.waitForNavigation();
        const connectionData = await page.evaluate(async () => {
            let timer;
            try {
                const data = await new Promise((resolve) => {
                    timer = setInterval(() => {
                        const data = Array.from(document.querySelectorAll(".job-log-line-content"))
                            .map((e) => e.children)
                            .filter((e) => e.length === 2)
                            .map((e) => ({ title: e[0].innerHTML, value: e[1].innerHTML }));
                        if (data?.length) {
                            clearInterval(timer);
                            resolve(data);
                        }
                    }, 1000);
                });
                return data;
            } catch (error) {
                throw error;
            }
        });
        await entornChangePassword("Sinmaj.2024", connectionData);
        browser.close();
        return connectionData;
        await timeOut(500000);
    } catch (error) {
        console.log(error);
        browser?.close();
        throw error;
    }
}

module.exports = entornBuilderService;
