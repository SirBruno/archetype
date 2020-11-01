const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const bodyParser = require('body-parser');
const expressSession = require('express-session')(
	process.env.ENVIRONMENT === 'DEV' ?
		{
			secret: 'secret',
			resave: true,
			rolling: true,
			saveUninitialized: false,
			cookie: {
				maxAge: 720000
			}
		}
		:
		{
			secret: 'secret',
			resave: true,
			rolling: true,
			saveUninitialized: false,
			cookie: {
				maxAge: 720000,
				sameSite: 'none',
				secure: true
			}
		}
)

const Schemas = require('./models/Schemas')

const startServer = async () => {
	const app = express()
	var whitelist = ['http://localhost:3000', 'https://archetype-fe.vercel.app']
	const corsOptions = {
		credentials: true,
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		}
	}
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(expressSession);
	const passport = require('passport');
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(cors({ credentials: true }))
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', req.header('origin'));
		next();
	});
	const passportLocalMongoose = require('passport-local-mongoose');
	var bcrypt = require('bcryptjs');



	app.set('trust proxy', 1);


	const uri = process.env.URI;

	await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })

	if (mongoose.connection.readyState) {
		console.log("MongoDB database connection established successfully")
	}

	const UserDetails = Schemas.User;

	passport.use(UserDetails.createStrategy());

	passport.serializeUser(UserDetails.serializeUser());
	passport.deserializeUser(UserDetails.deserializeUser());

	const connectEnsureLogin = require('connect-ensure-login');

	app.get('/login', (req, res, next) => {
		passport.authenticate('local',
			(err, user, info) => {

				if (err) {
					return next(err);
				}

				if (!user) {
					return res.send('Incorrect username and password combination!')
				}

				req.logIn(user, function (err) {
					if (err) {
						return next(err);
					}
					// console.log(req.session);
					// res.send(req.session);
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

	app.get('/private',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => {
			res.send(req.sessionID);
		}
	);

	app.get('/user',
		connectEnsureLogin.ensureLoggedIn(),
		(req, res) => {
			res.send({ user: req.user })
		}
	);

	app.get('/', (req, res) => {
		res.send('Helloooooo!')
	})

	// app.get('/', function(req, res, next) {
	// 	if (req.session.views) {
	// 		req.session.views++
	// 		res.setHeader('Content-Type', 'text/html')
	// 		res.write('<p>views: ' + req.session.views + '</p>')
	// 		res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
	// 		res.end()
	// 	} else {
	// 		req.session.views = 1
	// 		res.end('welcome to the session demo. refresh!')
	// 	}
	// })

	app.listen({ port: process.env.PORT || 4000 }, () =>
		console.log(`Server ready at http://localhost:${process.env.PORT || 4000}`)
	)

	app.post('/register', (req, res) => {
		UserDetails.register({
			username: req.body.username,
			userExp: 0,
			userLevel: 0,
			userPermission: 'STANDARD',
			userRanking: 'beginner',
			nickname: req.body.nickname,
			userDescription: req.body.userDescription === undefined ? 'Hello world!' : req.body.userDescription,
			userImageURL: req.body.userImageURL === undefined ? 'https://i.imgur.com/bNJYDQH.gif' : req.body.userImageURL,
			resetToken: bcrypt.hashSync(`${req.body.username}${req.body.nickname}${req.body.password}`, 8),
			active: false
		}, req.body.password).then(response => res.send(response)).catch(e => res.send(e));
	})

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect(req.query.redir || '/');
	});

	app.post('/reset', async (req, res) => {
		let user = await UserDetails.findByUsername(req.body.username)
		let auth = await user.authenticate(req.body.password)

		if (!auth.error && true) {
			UserDetails.findByUsername(req.body.username).then(function (sanitizedUser) {
				if (sanitizedUser) {
					sanitizedUser.setPassword(req.body.newPassword, function () {
						sanitizedUser.save();
						res.status(200).json({ message: 'password reset successful' });
					});
				} else {
					res.status(500).json({ message: 'This user does not exist' });
				}
			}, function (err) {
				console.error(err);
			})
		} else {
			res.status(500);
			res.send(auth);
		}
	})

	// UserDetails.register({ username: 'bruno', active: false }, '44444444');
	// Teste PR

};

startServer();