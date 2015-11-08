'use strict';

const React  = require('react-native');

const {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

const octocat = require('./img/Octocat.png'),
      Utility = require('./utilities/utility.js');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
        borderRadius: 0,
        color: '#48BBEC'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

class Login extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            showProgress: false
        };
        Utility.bind(this, ['onLoginPressed']);
    }

    onLoginPressed () {
        console.log('Login user: ' + this.state.username);
        this.setState({showProgress: true});

        const authService = require('./AuthService');

        authService.login({
            username: this.state.username,
            password: this.state.password
        }, (results) => {
            this.setState(Object.assign({
                showProgress: false
            }, results));

            if (results.success && this.props.onLogin) {
                this.props.onLogin();
            }
        });
    }

    render () {
        let errorCtrl = <View />;

        if (!this.state.success && this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work.
            </Text>;
        }

        if (!this.state.success && this.state.unknownError) {
            errorCtrl = <Text style={styles.error}>
                An unknown error has occurred!!.
            </Text>;
        }

        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={octocat} />
                <Text style={styles.heading}>
                    Github Browser
                </Text>
                <TextInput
                    onChangeText={(text) => this.setState({username: text})}
                    style={styles.input}
                    placeholder="Github Username" />
                <TextInput
                    onChangeText={(text) => this.setState({password: text})}
                    style={styles.input}
                    placeholder="Github Password"
                    secureTextEntry/>
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>
                {errorCtrl}
                <ActivityIndicatorIOS
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                />
            </View>
        );
    }
}

Login.propTypes = {
    onLogin : React.PropTypes.func.isRequired
};

module.exports = Login;
