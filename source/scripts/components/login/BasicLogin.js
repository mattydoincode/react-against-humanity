//var Footer = require('./Footer.react');
//var Header = require('./Header.react');
//var MainSection = require('./MainSection.react');
var React = require('react');
var router = require('../../router');
var Link = require("react-router").Link;
var LoginActions = require('../../actions/LoginActions');

var BasicLogin = React.createClass({


  getInitialState: function() {
    return {
      email: '',
      password: ''
    };
  },

  login: function () {
    LoginActions.login(this.state.email, this.state.password);
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
      <div className="login-form">
        <div className="signin">Sign in</div>
        <div className="input-group">
          <label className="login-label">Username</label>
          <input type="email" className="login-input"
            value={this.state.email} 
            onChange={this.handleChange.bind(this, 'email')} />
          <label className="login-label">Password</label>
          <input type="password" className="m43-password login-input"
            value={this.state.password} 
            onChange={this.handleChange.bind(this, 'password')} />
          <div className="warning">
            Incorrect username/password
          </div>
        </div>
        <div>
          <button type="button" className="login-submit login-button" onClick={this.login}>ENTER</button>
        </div>
        <div className="mini-message" >
          <Link to="forgotpassword"> Forgot your password?</Link>
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

module.exports = BasicLogin;