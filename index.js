const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const bodyParser = require('body-parser');
const expressSession = require('express-session')({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
});

const startServer = async () => {
	const app = express()
	app.use(cors())
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(expressSession);
	const passport = require('passport');
	app.use(passport.initialize());
	app.use(passport.session());
	const passportLocalMongoose = require('passport-local-mongoose');

	const Schema = mongoose.Schema;
	const UserDetail = new Schema({
		username: String,
		password: String
	});

	const uri = process.env.URI;
	await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })

	const connection = mongoose.connection
	connection.once('open', () => {
		console.log("MongoDB database connection established successfully")
	});

	UserDetail.plugin(passportLocalMongoose);
	const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

	passport.use(UserDetails.createStrategy());

	passport.serializeUser(UserDetails.serializeUser());
	passport.deserializeUser(UserDetails.deserializeUser());

	const connectEnsureLogin = require('connect-ensure-login');

	app.post('/login', (req, res, next) => {
		passport.authenticate('local',
			(err, user, info) => {
				if (err) {
					return next(err);
				}

				if (!user) {
					return res.send('Some sh*t wrong. Check your creds!')
				}

				req.logIn(user, function (err) {
					if (err) {
						return next(err);
					}

					return res.redirect('/');
				});

			})(req, res, next);
	});

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		playground: {
			endpoint: `http://localhost:8000/graphql`,
			settings: { 'editor.theme': 'dark' }
		},
		introspection: true
	});

	server.applyMiddleware({ app });

	app.use(express.static('public'));

	app.get('/',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => res.send('You\'re logged in! :)')
	);

	app.get('/private',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => {
			res.send(req.sessionID);
		}
	);

	app.get('/user',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => res.send({ user: req.user })
	);

	app.listen({ port: process.env.PORT || 4000 }, () =>
		console.log(`Server ready at http://localhost:${process.env.PORT || 4000}`)
	)

	// UserDetails.register({ username: 'paul', active: false }, 'paul');
	// UserDetails.register({ username: 'jay', active: false }, 'jay');
	// UserDetails.register({ username: 'roy', active: false }, 'roy');

};

startServer();