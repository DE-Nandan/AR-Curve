const {isLoggedIn} = require('../middleware/logCheck')
const {isLoggedOut} = require('../middleware/logCheck')

const express = require('express')
const User = require('../model/User');
const router = express.Router();
const passport			= require('passport');


router.get('/', isLoggedIn,async (req, res) => {
	
    res.render('learning',{title :"learning"});

});


module.exports = router