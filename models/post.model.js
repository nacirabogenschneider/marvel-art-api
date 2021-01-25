const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postScheme = new Schema({
    id: { type: Number},
    hero_id: { type: Number},
    description: { type: String},
    image: { type: String},
    like_counter:{ type: Number },
    comment: {type: Array}
});

const Post = mongoose.model(
  "Post",
  postScheme
);
module.exports = Post;



