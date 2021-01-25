
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appAdminSchema = new Schema({
  username: { type: String },
  password: { type: String },
});

const AppAdmin = mongoose.model("AppAdmin", appAdminSchema);
module.exports = AppAdmin;