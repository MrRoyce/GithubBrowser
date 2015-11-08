'use strict';

const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

const Login = require('./Login'),
      AppContainer = require('./AppContainer'),
      Utility = require('./utilities/utility.js'),
      AuthService = require('./AuthService');

const styles = StyleSheet.create({
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

class GithubBrowser extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            checkingAuth: true
        };

        Utility.bind(this, ['onLogin', 'componentDidMount']);
    }

    // Only executed once
    componentDidMount () {
        AuthService.getAuthInfo((err, authInfo)=> {
          this.setState({
            checkingAuth: false,
            isLoggedIn: authInfo !== null
          });
        });
    }

    onLogin () {
        this.setState({isLoggedIn: true});
    }

    render () {
        if (this.state.checkingAuth) {
          return (
            <View style={styles.container}>
              <ActivityIndicatorIOS
                animating
                size="large"
                style={styles.loader} />
            </View>
          );
        }

      if (this.state.isLoggedIn)  {
        return (
          <AppContainer />
        );
      } else {
        return (
          <Login onLogin={this.onLogin} />
        );
      }
    }
}

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
