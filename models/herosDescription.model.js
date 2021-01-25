const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const herosDescriptionScheme = new Schema({
    id: { type: Number},
    language: {type: String},
    description: {type: String}
});

const HerosDescription= mongoose.model(
  "HerosDescription",
  herosDescriptionScheme
);
module.exports = HerosDescription;



