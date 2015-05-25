var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var PlayerSchema = new Schema({
	currentGame: String,
	cards: [{
		id: Number
	}],
	blackCardsWon: [{
		id: Number
	}]
});
PlayerSchema.plugin(autoIncrement.plugin, 'Player');
module.exports = PlayerSchema;