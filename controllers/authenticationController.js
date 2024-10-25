const { Controller, storage } = require("sm-express-server");
const { authenticationService } = require("../services");


const authenticationController = new Controller(
    { method: "GET", name: "get token", path: "/v2/auth", storage: storage().none() },
    async (_, res) => {
        try {
            await authenticationService();
            res.send(true);
        } catch (error) {
            res.status(500).send(error);
        }
    }
);

module.exports = authenticationController;