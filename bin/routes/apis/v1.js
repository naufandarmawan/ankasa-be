const express = require("express");
let router = express.Router();

const authenticationHandler = require("../../modules/v1/authentication/api_handler");
const passengerHandler = require("../../modules/v1/passanger/api_handler");
const ticketHandler = require("../../modules/v1/ticket/api_handler");
const userHandler = require("../../modules/v1/user/api_handler");

router.use("/auth", authenticationHandler);
router.use("/passengers", passengerHandler);
router.use("/ticket", ticketHandler);
router.use("/user", userHandler);

module.exports = router;
