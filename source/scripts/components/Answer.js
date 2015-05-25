//var Footer = require('./Footer.react');
//var Header = require('./Header.react');
//var MainSection = require('./MainSection.react');
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var router = require('../router');
var GlobalActions = require('../actions/GlobalActions');
var GlobalStore = require('../stores/GlobalStore');

var Answer = React.createClass({


  getInitialState: function() {
    return {
      areYouSure: false
    };
  },
  

  componentWillUpdate: function (nextProps, nextState) {
  },

  componentDidMount: function() {
    //any event listeners go here
    //GlobalStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    //any event listeners dispose here
    //GlobalStore.removeChangeListener(this._onChange);
  },

  areYouSure: function () {
    if(this.props.playable){
      this.setState({
        areYouSure: true
      });      
    }

  },

  nevermind: function () {
    this.setState({
      areYouSure: false
    });
  },


  /**
   * @return {object}
   */
  render: function() {
    console.log(this.props);
    
    if(this.state.areYouSure) {
      return (
        <div>
          <div onClick={this.nevermind} className="tile with-button" dangerouslySetInnerHTML={{__html: this.props.card.text}}></div>
          <div className="tile play-button">PLAY</div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div onClick={this.areYouSure} className="tile" dangerouslySetInnerHTML={{__html: this.props.card.text}}></div>
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

module.exports = Answer;