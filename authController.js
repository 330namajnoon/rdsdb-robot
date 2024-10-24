const { Controller, storage } = require("sm-express-server");
const authenticator = require("./authenticator");

const authController = new Controller(
    { method: "GET", name: "get token", path: "/:code", storage: storage().none() },
    async (req, res) => {
        try {
            const f = await authenticator(req.params.code);
            console.log(f)
            res.send(`
                <h1>SUCCESS!!</h1>
            `);
        } catch (error) {
            
        }
    }
);

module.exports = authController;