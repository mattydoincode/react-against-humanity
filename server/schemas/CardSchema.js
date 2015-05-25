var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
	id: {
		type: Number,
		index: true
	},
	cardType: String,
	text: String,
	numAnswers: Number
});