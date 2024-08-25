const express = require("express");
let router = express.Router();

const authenticationHandler = require("../../modules/v1/authentication/api_handler");
const passengerHandler = require("../../modules/v1/passanger/api_handler");

router.use("/passengers", passengerHandler);
router.use("/auth", authenticationHandler);

module.exports = router;
