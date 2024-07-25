const express = require('express');
let router = express.Router();

const authenticationHandler = require('../../modules/v1/authentication/api_handler');

router.use('/auth', authenticationHandler);

module.exports = router;
