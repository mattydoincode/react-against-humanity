//var Footer = require('./Footer.react');
//var Header = require('./Header.react');
//var MainSection = require('./MainSection.react');
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var router = require('../router');
var Link = require("react-router").Link;
var GlobalActions = require('../actions/GlobalActions');

var Layout = React.createClass({


  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    //any event listeners go here
  },

  componentWillUnmount: function() {
    //any event listeners dispose here
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
    	<RouteHandler/>
    );

  },

  handleChange: function (name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  },

  _onChange: function() {
    this.setState(this.getState());
  }

});

module.exports = Layout;