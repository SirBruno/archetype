const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book.model')
const cors = require('cors')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const startServer = async () => {
	const app = express()
	app.use(cors())

	const uri = process.env.URI;
	await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })

	const connection = mongoose.connection
	connection.once('open', () => {
		console.log("MongoDB database connection established successfully")
	});

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		playground: {
			endpoint: `http://localhost:8000/graphql`,
			settings: { 'editor.theme': 'dark' }
		},
		introspection: true,
		playground: true
	});

	server.applyMiddleware({ app });

	app.use(express.static('public'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
	});

	app.listen({ port: process.env.PORT || 4000 }, () =>
		console.log(`Server ready at http://localhost:${process.env.PORT || 4000}`)
	);

};

startServer();