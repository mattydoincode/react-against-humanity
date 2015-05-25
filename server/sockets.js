var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var db = mongoose.connect('mongodb://localhost:27017').connection;
var _ = require('lodash');
autoIncrement.initialize(db);

//require all our schemas
var Player = mongoose.model('Player', require('./schemas/PlayerSchema'));
var Game = mongoose.model('Game', require('./schemas/GameSchema'));
var Card = mongoose.model('Card', require('./schemas/CardSchema'));

var GlobalConstants = require('../source/scripts/constants/GlobalConstants');


db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function(callback) {
	console.log('mongodb connected successfully!!');
});

var count = 0;


var getPlayer = function(playerId) {
	return new Promise(function(resolve, reject) {
		Player.findOne({
			_id: playerId
		}, function(err, player) {
			if (err) {
				reject(err);
				return;
			}
			resolve(player);
		});
	});
};

var getGameByName = function(name) {
	return new Promise(function(resolve, reject) {
		Game.findOne({
			name: name
		}, function(err, game) {
			if (err) {
				reject(err);
				return;
			}
			resolve(game);
		});
	});
};

var getAllCards = function() {
	return new Promise(function(resolve, reject) {
		Card.find(function(err, cards) {
			if (err) {
				reject(err);
				return;
			}
			resolve(cards);
		});
	});
};

getEverything = function(playerId, gameName) {
	return new Promise(function(resolve, reject) {
		getPlayer(playerId).then(function(player) {
			getGameByName(gameName).then(function(game) {
				getAllCards().then(function(cards) {
					resolve({
						player: player,
						game: game,
						cards: cards
					});
				});
			});
		});

	});
};

var connections = {};


var pushGameState = function() {
	_.forIn(connections, function(data, id) {
		data.push(data.playerId, data.currentGame);
	});
};





var connect = function(socket) {
	var id = socket.id;

	socket.on(GlobalConstants.SYNC, function (data) {
		connections[id].playerId = data.playerId;
		connections[id].gameName = data.gameName;
	});

	socket.on(GlobalConstants.NEW_PLAYER, function() {
		console.log('make new player!!');
		var newPlayer = new Player();
		newPlayer.save(function(err, result) {
			connections[id].playerId = result._id;
			socket.emit(GlobalConstants.NEW_PLAYER_CREATED, result);
		});
	});
	socket.on(GlobalConstants.GET_CARDS, function() {
		console.log('gettin cards!');
		getAllCards().then(function(cards) {
			socket.emit(GlobalConstants.GET_CARDS_RETURN, _.indexBy(cards, 'id'));
		});
	});
	socket.on(GlobalConstants.JOIN_GAME, function(data) {
		getEverything(data.playerId, data.gameName).then(function(fromDB) {
			var cards = fromDB.cards;
			var player = fromDB.player;
			var game = fromDB.game;
			console.log('got everything!!');
			if (!game) {
				game = new Game();
				game.name = data.gameName;
			}
			player.currentGame = game.name;
			var usedCards = game.usedCards;

			var dealtCards = _.chain(cards).filter(function(card) {
				return card.cardType == 'A';
			}).map(function(card) {
				return card.id;
			}).difference(usedCards).sample(10).map(function(id) {
				return {
					id: id
				};
			}).value();

			player.cards = dealtCards;
			game.usedCards = game.usedCards.concat(dealtCards);
			player.save(function(err, player) {
				console.log(err);
				game.save(function(err, game) {
					console.log(err);
					if (!err) {
						connections[id].currentGame = game.name;
						connections[id].playerId = player._id;
						socket.emit(GlobalConstants.REFRESH_PLAYER, player);
						socket.emit(GlobalConstants.REFRESH_GAME, game);
					}
				});
			});
		});
	});
	socket.on(GlobalConstants.CREATE_GAME, function(data) {
		getPlayer(playerId).then(function(player) {
			var game = new Game({
				name: data.name
			});
		});
	});

	socket.on(GlobalConstants.BECOME_JUDGE, function() {
		var playerId = connections[id].playerId;
		var gameName = connections[id].currentGame;
		console.log(playerId);
		console.log(gameName);
		getGameByName(gameName).then(function (game){
			game.judgePlayerId = playerId;
			game.save(function (err, game){
				pushGameState();
			});
		});
	});

	connections[id] = {
		playerId: null,
		currentGame: null,
		push: function(playerId, currentGame) {
			getEverything(playerId, currentGame).then(function(fromDB) {
				socket.emit(GlobalConstants.REFRESH_PLAYER, fromDB.player);
				socket.emit(GlobalConstants.REFRESH_GAME, fromDB.game);
			});
		}
	};

};

var disconnect = function(socket) {
	delete connections[socket.id];
};

module.exports = {
	connect: connect
};