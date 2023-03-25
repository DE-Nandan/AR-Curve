const {isLoggedIn} = require('../middleware/logCheck')
const {isLoggedOut} = require('../middleware/logCheck')

const express = require('express')
const User = require('../model/User');
const bcrypt = require('bcrypt')
const router = express.Router();
const passport			= require('passport');
// router.get('/', async (req, res) => {
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
router.post('/' , async (req,res) =>{
    console.log(req.body);

    /*
    Hashing --> bcrypt
    1.Collision should be improbalble
    2.Algorithm should be slow
    */
    const {username,password : plainTextPassword,email} = req.body;
    
    if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
     
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		//console.log('here');
    
        return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}
    
    
    
    
    
    const password = await bcrypt.hash(plainTextPassword,10);
    console.log(await bcrypt.hash(password,10))
    
    //  console.log('fdg\n');

    try{
     const response = await User.create({
        email,
        username,
        password
       
     })
     console.log('User created Successfully ', response);
    }
    catch(error)
    {
       // console.log(JSON.stringify(error));
       if(error.code === 11000)
       {
        return res.json({status : 'error', error : 'User already exists'});
       }
       throw error
    }
    
    
    // // res.json handles everything itself like no need to define headers
    res.redirect('login')
})


router.get('/',async (req,res) =>{
    const response = {
		title: "Register",
		error: req.query.error
	}
    console.log(response);
    res.render('register',response)
 })


module.exports = router;