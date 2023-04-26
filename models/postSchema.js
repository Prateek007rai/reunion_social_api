const { timeStamp } = require('console');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    Title: {
    type:String,
    required: true
    },
    Description: {
    type:String,
    required: true
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
},
  {timestamps: true}
)
const Post = mongoose.model("Post",postSchema);
module.exports = Post;