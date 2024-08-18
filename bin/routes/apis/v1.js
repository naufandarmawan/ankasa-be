const express = require('express');
let router = express.Router();

const authenticationHandler = require('../../modules/v1/authentication/api_handler');
const ticketHandler = require('../../modules/v1/ticket/api_handler');

router.use('/auth', authenticationHandler);
router.use('/ticket', ticketHandler);

module.exports = router;
