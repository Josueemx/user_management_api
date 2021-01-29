const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	id: {
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	last_name: {
		type: String,
		required: true,
		trim: true
	},
	age: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		maxlength: 50,
		unique: true
	},
	active: {
		type: Boolean
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
