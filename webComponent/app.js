require('dotenv').config();
const express			= require('express');
const session			= require('express-session');
const hbs				= require('express-handlebars');
const mongoose			= require('mongoose');
const passport			= require('passport');
const localStrategy		= require('passport-local').Strategy;
const bcrypt			= require('bcrypt');
const app				= express();
const User               = require('./model/User');
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override');
const flash = require('express-flash')
const {isLoggedIn} = require('./middleware/logCheck')
const {isLoggedOut} = require('./middleware/logCheck')
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const dashboardRouter = require('./routes/index');
<<<<<<< HEAD
=======
const melodyRouter = require('./routes/melody');
const exploreRouter = require('./routes/explore');
mongoose.connect("mongodb+srv://ashu:ashutosh@cluster0.qomjxb4.mongodb.net/?retryWrites=true&w=majority", {
>>>>>>> a7d48806e4cd509e81f0d76b39d7d5afd8015a33

mongoose.connect(process.env.db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});



// Middleware
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
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
	console.log("passport")
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

app.use('/' ,dashboardRouter);
app.use('/register' ,registerRouter);
app.use('/login' ,loginRouter);
app.use('/melody' ,melodyRouter);
app.use('/explore' ,exploreRouter);


app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});


// ROUTES
// app.get('/', isLoggedIn, (req, res) => {
// 	//console.log(req.user);
// 	res.render("index", { title: req.user.username });
// });


// app.get('/about', (req, res) => {
// 	res.render("index", { title: "About" });
// });

// app.get('/login', isLoggedOut, (req, res) => {
// 	const response = {
// 		title: "Login",
// 		error: req.query.error
// 	}
// 	console.log(response);

// 	res.render('login', response);
// });

// app.post('/login', passport.authenticate('local', {
// 	successRedirect: '/',
// 	failureRedirect: '/login?error=true',
// 	failureFlash: true
// }));

// app.get('/logout', function (req, res) {
// 	req.logout();
// 	res.redirect('/');
// });

// Setup our admin user

// app.get('/setup', async (req, res) => {
// 	const exists = await User.exists({ username: "admin" });

// 	if (exists) {

// 		res.redirect('/login');
// 		return;
// 	};


// 	bcrypt.genSalt(10, function (err, salt) {
// 		if (err) return next(err);
// 		bcrypt.hash("pass", salt, function (err, hash) {
// 			if (err) return next(err);
			
// 			const newAdmin = new User({
// 				username: "admin",
// 				password: hash
// 			});

// 			newAdmin.save();

// 			res.redirect('/login');
// 		});
// 	});
// });

app.listen(5468, () => {
	console.log("Listening on port 5468");
});