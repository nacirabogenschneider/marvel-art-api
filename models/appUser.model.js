const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appUserSchema = new Schema({
  firstname: { type: String , required: true},
  lastname: { type: String , required: true},
  username: { type: String ,required: true},
  password: { type: String ,required: true},
  role:{ type: String },
  email:{type: String , required: true},
  avatar:{type: String},
  header:{type: String},
  uploads: {type: Array}
},
{
    timestamps: true,
  });

const AppUser = mongoose.model(
  "AppUser",
  appUserSchema
);
module.exports = AppUser;