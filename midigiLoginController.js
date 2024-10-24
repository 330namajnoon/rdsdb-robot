const { Controller, storage } = require("sm-express-server");
const getToken = require("./getToken");
const loginMidigi = require("./midigiLogin");

const midigiLoginController = new Controller(
    { method: "GET", name: "get token", path: "/midigi/login/:clientId", storage: storage().none() },
    async (req, res) => {
        try {
            const token = await loginMidigi(req.params.clientId);
            const base = req.query.base;
            res.send(`
                <a href="${base}?${token}" target="_blank">LOGIN</a>
                <script>window.open("${base}?${token}", "_blank");</script>
            `);
        } catch (error) {
            res.send("Authenticator error!");
            
        }
    }
);

module.exports = midigiLoginController;