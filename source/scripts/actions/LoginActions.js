/**
 * LoginActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');
var LoginAPI = require('../apis/LoginAPI');

var LoginActions = {

  /**
   * @param  {string} text
   */
  login: function(email, password) {
    AppDispatcher.handleViewAction({
      actionType: LoginConstants.LOGIN,
      text: text
    });
    LoginAPI.login(email, password);
  },

  /**
   * @param  {string} id
   */
  loginSuccess: function(data) {
    AppDispatcher.handleViewAction({
      actionType: LoginConstants.SEARCH_RETURN_SUCCESS,
      id: id
    });
  },


  loginFail: function(id) {
    AppDispatcher.handleViewAction({
      actionType: LoginConstants.SEARCH_RETURN_SUCCESS,
      id: id
    });
  },

};

module.exports = LoginActions;