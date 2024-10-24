const authController = require("./authController");
const getTeleventaController = require("./getTeleventaController");
const getTokenController = require("./getTokenController");
const midigiLoginController = require("./midigiLoginController");

const controllers = [
    getTokenController,
    getTeleventaController,
    midigiLoginController,
    authController,
];

module.exports = controllers;