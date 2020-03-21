const Book = require('../models/book.model');

module.exports = Book.find().then(books => (
    books.map(book => {
        return {title: book.title,author: book.author}
    })
));