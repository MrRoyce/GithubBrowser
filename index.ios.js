/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

var Login = require('./Login');

var GithubBrowser = React.createClass({
  render: function() {
    var message = 'Hello there!!!';

    return (
      <Login />
    );
  }
});



AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
