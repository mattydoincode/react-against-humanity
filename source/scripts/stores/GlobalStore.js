var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GlobalConstants = require('../constants/GlobalConstants');
var GlobalActions = require('../actions/GlobalActions');
var localStorage = require('web-storage')().localStorage;
var Cookies = require('cookies-js');
var assign = require('object-assign');
var CHANGE_EVENT = 'search-store-change';
var STORAGE_KEY = 'react-against-humanity';

var _data = localStorage.get(STORAGE_KEY) || {};

if (_data.player) {
  console.log(_data);
}
var GlobalStore = assign({}, EventEmitter.prototype, {

  getPlayer: function() {
    return _data.player;
  },

  getGame: function() {
    return _data.game;
  },

  getCards: function() {
    return _data.cards;
  },

  getIsError: function() {
    return _errorOccured;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
      case GlobalConstants.NEW_PLAYER_CREATED:
        _data.player = action.data;
        localStorage.set(STORAGE_KEY, _data);
        GlobalStore.emitChange();
        break;
      case GlobalConstants.REFRESH_GAME:
        _data.game = action.data;
        localStorage.set(STORAGE_KEY, _data);
        GlobalStore.emitChange();
        break;
      case GlobalConstants.REFRESH_PLAYER:
        _data.player = action.data;
        localStorage.set(STORAGE_KEY, _data);
        GlobalStore.emitChange();
        break;
      case GlobalConstants.GET_CARDS_RETURN:
        _data.cards = action.data;
        localStorage.set(STORAGE_KEY, _data);
        GlobalStore.emitChange();
        break;
        // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

//if we don't have any data, let's sync up with the server now
if (!_data.player) {
  GlobalActions.newPlayer();
}
if (!_data.cards) {
  GlobalActions.getCards();
}
if (_data.player && _data.game) {
  GlobalActions.sync({
    playerId: _data.player._id,
    gameName: _data.game.name
  });
}

module.exports = GlobalStore;