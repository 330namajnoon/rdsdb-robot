const { Controller, storage } = require("sm-express-server");
const getToken = require("./getToken");

const getTokenController = new Controller(
    { method: "GET", name: "get token", path: "/token", storage: storage().none() },
    async (req, res) => {
        const token = await getToken();
        res.send(token);
    }
);

module.exports = getTokenController;
