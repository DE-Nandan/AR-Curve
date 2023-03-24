require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const localStrategy	= require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');
const hbs = require('express-handlebars');
const User = require('./model/User');
const flash = require('express-flash');

const {isLoggedIn} = require('./middleware/logCheck');
const {isLoggedOut} = require('./middleware/logCheck');
//routes
const dashboardRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

// Connect to database
mongoose.connect("mongodb+srv://ashu:ashutosh@cluster0.qomjxb4.mongodb.net/?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Middleware
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(session({
	secret: "verygoodsecret",
	resave: false,
	saveUninitialized: true
}));

// Passport.js
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(new localStrategy(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });
		
		bcrypt.compare(password, user.password, function (err, res) {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });
			
			return done(null, user);
		});
	});
}));

// Routes
app.use('/',dashboardRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);


app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

// Run the application at any port
app.listen(5468, () => {
	console.log("Listening on port 5468");
});