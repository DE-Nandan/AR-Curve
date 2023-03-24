const express			= require('express');
const mongoose			= require('mongoose');
const passport			= require('passport');
const passport			= require('passport');
const app				= express();
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override');
const bcrypt			= require('bcrypt');

mongoose.connect("mongodb://localhost:27017/node-auth-yt", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});



app.set('view engine', 'ejs');
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')

app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json());


app.listen(5468, () => {
	console.log("Listening on port 5468");
});
