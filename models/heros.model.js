const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const herosScheme = new Schema({
    id: { type: Number},
    name: { type: String},
    description: { type: String},
    thumbnail: { type: Object},
    resourceURI:{ type: String },
    comics:{type: Object},
    series:{type: Object},
    stories:{type: Object},
    events:{type: Object},
    urls:{type: Array},
});

const Heros = mongoose.model(
  "Heros",
  herosScheme
);
module.exports = Heros;



