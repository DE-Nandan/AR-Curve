const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique:true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique:true
	}
},
{
    // otherwise it would be dynmic based on name of model
    collection:'users'
}
);

const model = mongoose.model('UserSchema' , UserSchema);
module.exports = model;