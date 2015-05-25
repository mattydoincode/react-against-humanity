//var Footer = require('./Footer.react');
//var Header = require('./Header.react');
//var MainSection = require('./MainSection.react');
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var router = require('../router');
var GlobalActions = require('../actions/GlobalActions');
var GlobalStore = require('../stores/GlobalStore');

var Loading = React.createClass({


  getInitialState: function() {
    var state = this.getGlobalState();
    if(state.player && state.game){
      router.transitionTo('game');
    }
    state.name = '';
    return state;
  },
  

  getGlobalState: function () {
    return {
      player: GlobalStore.getPlayer(),
      game: GlobalStore.getGame()
    }
  },

  componentWillUpdate: function (nextProps, nextState) {
    if(nextState.game) {
      router.transitionTo('game');
    }
  },

  componentDidMount: function() {
    //any event listeners go here
    GlobalStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    //any event listeners dispose here
    GlobalStore.removeChangeListener(this._onChange);
  },

  joinGame: function () {
    GlobalActions.joinGame({
      playerId: this.state.player._id, 
      gameName: this.state.name
    });
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
      <h1>Welcome, type the game name</h1>
      <input type="text" className="game-name"
            value={this.state.name}
            onChange={this.handleChange.bind(this, 'name')} />
      <div onClick={this.joinGame} className="join-game button">Go</div>
      </div>
    );
  },

  handleChange: function (name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  },

  _onChange: function() {
    this.setState(this.getGlobalState());
  }

});

module.exports = Loading;