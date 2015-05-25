//var Footer = require('./Footer.react');
//var Header = require('./Header.react');
//var MainSection = require('./MainSection.react');
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var router = require('../router');
var GlobalActions = require('../actions/GlobalActions');
var GlobalStore = require('../stores/GlobalStore');

var Answer = require("./Answer");

var Game = React.createClass({


  getInitialState: function() {
    return this.getGlobalState();
  },
  

  getGlobalState: function () {
    return {
      player: GlobalStore.getPlayer(),
      game: GlobalStore.getGame(),
      cards: GlobalStore.getCards(),
      ready: false, 
      numAnswers: 0
    }
  },

  componentWillUpdate: function (nextProps, nextState) {
  },

  componentDidMount: function() {
    //any event listeners go here
    GlobalStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    //any event listeners dispose here
    GlobalStore.removeChangeListener(this._onChange);
  },


  getFullCards: function () {
    var self = this;
    return _.map(this.state.player.cards, function (obj){
      return self.state.cards[obj.id];
    });
  },

  becomeJudge: function () {
    GlobalActions.becomeJudge();
  },


  /**
   * @return {object}
   */
  render: function() {
    if(!this.state.cards || !this.state.game || !this.state.player) {
      return(
        <h1>Loading...</h1>
      );
    }

    var playable = this.state.game.judgePlayerId && this.state.game.judgePlayerId != this.state.player._id;
    var amJudge = this.state.game.judgePlayerId == this.state.player._id;


    var cards = _.map(this.getFullCards(), function (card) {
      return <Answer key={card.id} playable={playable} card={card}/>
    });

    if(amJudge){

    }
    else if(playable){
      return (
        <div>
            {cards}
        </div>
      );
    }
    else {
      return (
        <div>
            {cards}
          <div className="tile button" onClick={this.becomeJudge}>Become Judge</div>
        </div>
      );
    }
    
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

module.exports = Game;