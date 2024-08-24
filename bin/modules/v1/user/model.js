const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

const findByEmail = (email, { relation } = { relation: "" }) => {
  return pool.query(
    `SELECT User.id, User.email, User.password, User.role ${
      relation ? `, ${relation}.*` : ""
    } FROM User ${
      relation ? ` JOIN ${relation} ON User.id = ${relation}.id` : ""
    } WHERE email = $1`,
    [email]
  );
};  

module.exports = {
  findByEmail,
};
