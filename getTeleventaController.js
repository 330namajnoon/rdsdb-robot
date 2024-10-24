const { Controller, storage } = require("sm-express-server");
const getToken = require("./getToken");

const getTeleventaController = new Controller(
    { method: "GET", name: "get token", path: "/televenta", storage: storage().none() },
    async (req, res) => {
        const token = await getToken();
        const base = req.query.base;
        res.send(`
            <a href="${base}?${token}" target="_blank">LOGIN</a>
            <script>window.open("${base}?${token}", "_blank");</script>
        `);
    }
);

module.exports = getTeleventaController;