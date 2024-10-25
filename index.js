const { Server } = require("sm-express-server");
const controllers= require("./controllers");
const { SERVER_PORT } = require("./config");

const server = new Server(SERVER_PORT, "./", []);

server.addControllers(controllers);

server.start(async () => {
    console.log(`server is up on port ${SERVER_PORT}!`);
})


