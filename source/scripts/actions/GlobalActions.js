/**
 * LoginActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var GlobalConstants = require('../constants/GlobalConstants');
var ClientSocket = require('../servers/ClientSocket');

//SETUP ALL RETURNS FROM THE SERVER AT THE TOP
//THESE COULD HAPPEN AT ANYTIME


ClientSocket.on(GlobalConstants.NEW_PLAYER_CREATED, function(data) {
  console.log('new player created');
  console.log(data);
  AppDispatcher.handleViewAction({
    actionType: GlobalConstants.NEW_PLAYER_CREATED,
    data: data
  });
});

ClientSocket.on(GlobalConstants.REFRESH_GAME, function(data) {
  console.log('game refreshed');
  console.log(data);
  AppDispatcher.handleViewAction({
    actionType: GlobalConstants.REFRESH_GAME,
    data: data
  });
});

ClientSocket.on(GlobalConstants.REFRESH_PLAYER, function(data) {
  console.log('player refreshed');
  console.log(data);
  AppDispatcher.handleViewAction({
    actionType: GlobalConstants.REFRESH_PLAYER,
    data: data
  });
});

ClientSocket.on(GlobalConstants.GET_CARDS_RETURN, function(data) {
  console.log('cards gotten');
  console.log(data);
  AppDispatcher.handleViewAction({
    actionType: GlobalConstants.GET_CARDS_RETURN,
    data: data
  });
});

var GlobalActions = {

  /**
   * @param  {string} text
   */
  newPlayer: function(email, password) {
    AppDispatcher.handleViewAction({
      actionType: GlobalConstants.NEW_PLAYER
    });
    console.log('saying new player!!!');
    ClientSocket.emit(GlobalConstants.NEW_PLAYER);
  },

  joinGame: function(data) {
    AppDispatcher.handleViewAction({
      actionType: GlobalConstants.JOIN_GAME
    });
    console.log('joining game!');
    ClientSocket.emit(GlobalConstants.JOIN_GAME, data);
  },

  getCards: function () {
    AppDispatcher.handleViewAction({
      actionType: GlobalConstants.GET_CARDS
    });
    console.log('retrieving cards!');
    ClientSocket.emit(GlobalConstants.GET_CARDS);
  },

  becomeJudge: function () {
    AppDispatcher.handleViewAction({
      actionType: GlobalConstants.BECOME_JUDGE
    });
    console.log('becoming judge!');
    ClientSocket.emit(GlobalConstants.BECOME_JUDGE);
  },
  sync: function (data) {
    AppDispatcher.handleViewAction({
      actionType: GlobalConstants.SYNC
    });
    console.log('sync!');
    ClientSocket.emit(GlobalConstants.SYNC, data);
  },

};

module.exports = GlobalActions;