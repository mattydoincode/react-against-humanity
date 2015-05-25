var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

//Now include all components needed for routing
var Layout = require('./components/Layout');
var Welcome = require('./components/Welcome');
var Loading = require('./components/Loading');
var Game = require("./components/Game");

module.exports = (
  <Route name="home" path="/" handler={Layout}>
  	<Route name="game" path="/game" handler={Game}/>
  	<Route name="welcome" path="/welcome" handler={Welcome}/>
    <DefaultRoute handler={Loading}/>
  </Route>
);

