//var Footer = require('./Footer.react');
//var Header = require('./Header.react');
//var MainSection = require('./MainSection.react');
var React = require('react');
var Link = require('react-router').Link;
var Navigation = require('react-router').Navigation;
var LoginActions = require('../../actions/LoginActions');

var ForgotPassword = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return {
      email: ''
    };
  },

  submitEmail: function () {
    LoginActions.forgotPassword(this.state.email);
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
     <div className="login-form">
        <div className="signin">
            Enter your email
        </div>
        <div className="input-group">
            <label className="login-label">Email</label>
            <input type="text" className="login-email login-input"/>
        </div>
        <div>
            <button type="button" className="login-send-email login-button">Submit</button>
        </div>
        <div className="mini-message" >
          <Link to="login">Back to login</Link>
        </div>
    </div>
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

module.exports = ForgotPassword;