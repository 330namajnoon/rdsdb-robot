const { Server } = require("sm-express-server");
const controllers = require("./controllers");

const server = new Server(4000, "./", []);

server.addControllers(controllers);

server.start(() => {
    console.log("server is up on port 4000!");
})


