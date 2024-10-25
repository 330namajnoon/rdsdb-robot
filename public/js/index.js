import loading from "./loading.js";
import login from "./login.js";
import midigiLogin from "./midigiLogin.js";
import televentaLogin from "./televentaLogin.js";

(async () => {
    const loginPage = document.getElementById("loginContainer");
    const midigiLoginButton = document.getElementById("midigiLoginButton");
    const televentaButton = document.getElementById("televentaButton");
    const midigiLoginUrl = document.getElementById("midigiLoginUrl");
    const televentaUrl = document.getElementById("televentaUrl");

    try {
        loading(true);
        await login();
        loginPage.classList.remove("active");
        loading(false);
        midigiLoginButton.addEventListener("click", async () => {
            loading(true);
            try {
                const url = await midigiLogin();
                midigiLoginUrl.href = url;
                midigiLoginUrl.classList.add("active");
                midigiLoginUrl.click();
            } catch (error) {
                console.log(error);
            }
            loading(false);
        });
        televentaButton.addEventListener("click", async () => {
            loading(true);
            try {
                const url = await televentaLogin();
                televentaUrl.href = url;
                televentaUrl.classList.add("active");
                televentaUrl.click();
            } catch (error) {
                console.log(error);
            }
            loading(false);
        });
    } catch (error) {
        loginPage.classList.add("active");
    }
})()