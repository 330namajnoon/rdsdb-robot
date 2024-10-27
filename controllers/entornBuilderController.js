const { Controller, storage } = require("sm-express-server");
const { entornBuilderService } = require("../services");

const entornBuilderController = new Controller({method: "GET", path: "/v2/entorn-builder/:country", name: "entornBuilderController", storage: storage().none()}, async (req, res) => {
    try {
        const response = await entornBuilderService({ country: req.params.country });
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = entornBuilderController;