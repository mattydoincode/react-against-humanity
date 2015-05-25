var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../constants/SearchConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'search-store-change';

var _search = null; //the single search we're caching
var _isSearching = false;
var _errorOccured = false;

var SearchStore = assign({}, EventEmitter.prototype, {

  getSearchResult: function () {
    return _search;
  },

  getIsSearching: function () {
    return _isSearching;
  },

  getIsError: function () {
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
    var text;

    switch(action.actionType) {
      case SearchConstants.SEARCH_PERFORM_SEARCH:
        _isSearching = true;
        SearchStore.emitChange();
        break;

      case SearchConstants.SEARCH_RETURN_SUCCESS:
        _search = payload.action.data;
        _isSearching = false;
        _errorOccured = false;
        SearchStore.emitChange();
        break;
      case SearchConstants.SEARCH_RETURN_FAILURE:
        _isSearching = false;
        _errorOccured = true;
        SearchStore.emitChange();
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = SearchStore;