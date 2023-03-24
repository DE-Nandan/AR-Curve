const {isLoggedIn} = require('../middleware/logCheck')
const {isLoggedOut} = require('../middleware/logCheck')

const express = require('express')
const User = require('../model/User');
const router = express.Router();
const passport			= require('passport');

router.get('/', isLoggedIn, (req, res) => {
	//console.log(req.user);
	res.render("index", { title: req.user.username });
});

module.exports = router;