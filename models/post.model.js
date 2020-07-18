const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    author: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    postBody: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    postLikes: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    collection: "posts"
});

let Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;