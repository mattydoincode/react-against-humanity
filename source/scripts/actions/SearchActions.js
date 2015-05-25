/**
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SearchConstants = require('../constants/SearchConstants');
var SearchServer = require('../servers/SearchServer');

var TodoActions = {

  /**
   * @param  {string} text
   */
  search: function(text) {
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.SEARCH_PERFORM_SEARCH,
      text: text
    });
    var result = SearchServer.search();
    setTimeout(function () {
      if(Math.random() > .1){
        AppDispatcher.handleViewAction({
          actionType: SearchConstants.SEARCH_RETURN_SUCCESS,
          data: result
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: SearchConstants.SEARCH_RETURN_FAILURE
        });
      }
      
    }, 300);
  },

  /**
   * @param  {string} id
   */
  searchSuccess: function(data) {
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.SEARCH_RETURN_SUCCESS,
      id: id
    });
  },


  searchFail: function(id) {
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.SEARCH_RETURN_SUCCESS,
      id: id
    });
  },

};

module.exports = TodoActions;