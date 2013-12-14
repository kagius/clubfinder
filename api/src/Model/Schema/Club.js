var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clubSchema = new Schema({
	id: String,
	logo: { 
		url: String 
	},
	name: String,
	added: {
		by: String,
		on: { type: Date, default: Date.now }
	},
	approved: {
		status: Boolean,
		by: String,
		on: Date
	},
	administrators: [String],
	address: {
		street: String,
		city: String,
		country: String,
		postcode: String
	},
	telephone: [
		{ contact:String, number:String }
	],
	web: {
		site:String,
		facebook: String,
		twitter:String
	}
});

module.exports = mongoose.model('Club', clubSchema);