const fileUpload = require("express-fileupload");

const setUpload = fileUpload();

module.exports = {
  setUpload,
};
