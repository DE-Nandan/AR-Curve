require('dotenv').config({path: __dirname + '/.env'});
const express			= require('express');
const mongoose			= require('mongoose');
const passport			= require('passport');
const app				= express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const bcrypt			= require('bcrypt');

const {isLoggedIn} = require('./middleware/logCheck');
const {isLoggedOut} = require('./middleware/logCheck');
//routes
const dashboardRouter = require('./routes/index');
const loginRouter = require('./routes/login');
// Connect to database
mongoose.connect("mongodb://localhost:27017", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


// Middleware
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');

// Routes
app.set('/',dashboardRouter);
app.set('/login',loginRouter);

app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json());

// Run the application at any port
app.listen(5468, () => {
	console.log("Listening on port 5468");
});
