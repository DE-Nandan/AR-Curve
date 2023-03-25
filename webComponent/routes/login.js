const {isLoggedIn} = require('../middleware/logCheck')
const {isLoggedOut} = require('../middleware/logCheck')

const express = require('express')
const User = require('../model/User');
const router = express.Router();
const passport = require('passport');

router.get('/', isLoggedOut, (req, res) => {
	const response = {
		title: "Login",
		error: req.query.error
	}
	console.log(response);

	res.render('login', response);
});

router.post('/', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login?error=true',
	failureFlash: true
}));

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;