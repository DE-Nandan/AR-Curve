const {isLoggedIn} = require('../middleware/logCheck')
const {isLoggedOut} = require('../middleware/logCheck')

const express = require('express')
const User = require('../model/User');
const router = express.Router();
const passport			= require('passport');
const Image = require('../model/image')


router.get('/', isLoggedIn, async (req, res) => {
	//console.log(req.user);
	let images
    try{
        images = await Image.find().exec();

	}
	catch{
      images = [];
	}
	

	let x = Math.floor((Math.random() * 2));
	 console.log(images);
	 console.log(x);

	console.log(images[x]);
	res.render("index", { title: req.user.username , image : images[x]});
});


module.exports = router