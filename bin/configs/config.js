require("dotenv").config();

const config = {
  env: process.env.ENV,
  hostname: process.env.PG_HOST,
  port: process.env.PORT || 3000,
  secretKeyJwt: process.env.SECRET_KEY_JWT,
};

module.exports = config;
