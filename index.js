const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/book.model');
const cors = require('cors');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');

// ********************************************************************

const startServer = async () => {
    const app = express();
    app.use(cors());

    const uri = process.env.URI;
    await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
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

    const server = new ApolloServer({
        typeDefs, resolvers, playground: {
            endpoint: `http://localhost:4000/graphql`,
            settings: {
                'editor.theme': 'dark'
            }
        }
    });

    server.applyMiddleware({ app });

    let port = process.env.PORT;
    if (port == null || port == "") {
        port = 8000;
    }

    app.use(express.static('public'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });

    // app.use('/graphql', graphqlHTTP({
    //     schema
    // }));

    app.listen(port, () => {
        console.log("Express Server running at http://localhost:8000");
    });
};

startServer();