var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var GameSchema = new Schema({
	name: {
		type: String,
		index: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	playedCards: [{
		id: Number
	}],
	judgePlayerId: Number,
	usedCards: [{
		id: Number
	}]
});
GameSchema.plugin(autoIncrement.plugin, 'Game');
module.exports = GameSchema;