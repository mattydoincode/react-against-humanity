var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var init = {
    header: 'District of Columbia',
    subheader: 'Metropolitan Police Department',
    image: '/dc.jpg',
    logo: '/loginLogo.png'
};


var Login = React.createClass({
  render: function () {
    return (
        <div className="login-body">
            <img src={init.image} className="login-background"/>
            <div className="login-title">
                <img className="login-logo" src={init.logo}/>
                <div className="login-header">{init.header}</div>
                <div className="login-subheader">{init.subheader}</div>
            </div>
            <div className="login-sidebar">
                <RouteHandler/>
            </div>
        </div>
    );
  }
});

module.exports = Login;