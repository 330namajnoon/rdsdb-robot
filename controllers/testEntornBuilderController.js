const { Controller, storage } = require("sm-express-server");
const { testEntornBuilderService } = require("../services");

const testEntornBuilderController = new Controller({method: "GET", path: "/v2/test-entorn-builder/:country", name: "entornBuilderController", storage: storage().none()}, async (req, res) => {
    try {
        const country = req.params.country;
        const projectNames = req.query.projectNames;
        const branchs = req.query.branchs;
        const response = await testEntornBuilderService({ country, projectNames, branchs });
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = testEntornBuilderController;