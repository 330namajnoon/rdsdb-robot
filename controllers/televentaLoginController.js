const { Controller, storage } = require("sm-express-server");
const { televentaLoginService } = require("../services");

const televentaLoginController = new Controller(
    { method: "GET", name: "Televenta login", path: "/v2/televenta/login/:country", storage: storage().none() },
    async (req, res) => {
        try {
            const base = req.query.base;
            const response = await televentaLoginService({
                country: req.params.country,
                base: base || "",
            });
            res.send({ data: response });
        } catch (error) {
            res.status(500).send(false);
        }
    }
);

module.exports = televentaLoginController;
