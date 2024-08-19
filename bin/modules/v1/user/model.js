const { Pool } = require("pg");

const findByEmail = (email, { relation } = { relation: "" }) => {
  return Pool.query(
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
