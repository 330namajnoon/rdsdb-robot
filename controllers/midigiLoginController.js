const { Controller, storage } = require("sm-express-server");
const { midigiLoginService } = require("../services");

const midigiLoginController = new Controller(
    { method: "GET", name: "Midigi login", path: "/v2/midigi/login/:country", storage: storage().none() },
    async (req, res) => {
        try {
            const base = req.query.base;
            const email = req.query.email;
            const clientId = req.query.clientId;
            const phoneNumber = req.query.phoneNumber;
            const contractId = req.query.contractId;
            const documentNumber = req.query.documentNumber;

            const response = await midigiLoginService({
                country: req.params.country,
                clientId: clientId || "",
                phoneNumber: phoneNumber || "",
                base: base || "",
                email: email || "",
                contractId: contractId || "",
                documentNumber: documentNumber || "",
            });
            res.send({ data: response });
        } catch (error) {
            res.status(500).send(false);
        }
    }
);

module.exports = midigiLoginController;
