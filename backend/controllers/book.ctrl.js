const Book = require('../models/book.model');

let data = [];

Book.find().then(books => (
    books.map(books => {
        data.push({
            "title": books.title,
            "author": books.author
        })
    })
));

module.exports = data;