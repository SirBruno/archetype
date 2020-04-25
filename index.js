const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/book.model');
const cors = require('cors');

app.use(cors());

// MongoDB #################################################################
const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.get('/', (req, res) => {
    res.send('anotha test...');
});

app.get('/add', (req, res) => {
    const newBook = new Book({
        title: `${req.query.title}`,
        author: `${req.query.author}`,
        description: `${req.query.description}`
    });
    newBook.save().then(() => res.json('Book added!')).catch(err => {
        res.status(400).json('Error: ' + err.errmsg);
    });
});

// GraphQL *****************************************************************
const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`
  type Book {
    id: String
    title: String
    author: String
    description: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
    Query: {
        books: () => Book.find().then(books => (
            books.map(book => {
                return {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    description: book.description
                }
            })
        )),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => {
    console.log(`GraphQL Server running at http://localhost:4000`);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
    console.log("Express Server running at http://localhost:8000");
});