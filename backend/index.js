const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB #################################################################
const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.get('/', (req, res) => {
    res.send("working");
});

app.get('/add', (req, res) => {
    const newBook = new Book({ title: 'le book III', author: 'some dude' });
    newBook.save().then(() => res.json('Book added!')).catch(err => res.status(400).json('Error: ' + err));
});

// GraphQL *****************************************************************
const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = require('./controllers/book.ctrl');

const resolvers = {
    Query: {
        books: () => books,
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => {
    console.log(`GraphQL Server running at http://localhost:4000`);
});

app.listen(5000, () => {
    console.log("Express Server running at http://localhost:5000");
});