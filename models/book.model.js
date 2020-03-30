const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
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
    }
}, {
    timestamps: true,
    collection: "books"
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;