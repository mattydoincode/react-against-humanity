var cardJson = require('./cards.json');
var _ = require("lodash");
var async = require("async");
var mongoose = require('mongoose');
var CardSchema = require('../schemas/CardSchema');
var db = mongoose.connect('mongodb://localhost:27017').connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function(callback) {
  console.log('mongodb connected successfully!!');

  var Card = mongoose.model('Card', CardSchema);

  async.each(cardJson, function(card, callback) {
    new Card(card).save(function(err) {
      callback(err);
    });
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('successfully inserted all cards!');
    }
    process.exit();
  });
});