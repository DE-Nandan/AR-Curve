const {isLoggedIn} = require('../middleware/logCheck')
const {isLoggedOut} = require('../middleware/logCheck')

const express = require('express')
const User = require('../model/User');
const router = express.Router();
const passport			= require('passport');


router.get('/', async (req, res) => {
	
    res.render('explore',{title:"explore"});

});


module.exports = router