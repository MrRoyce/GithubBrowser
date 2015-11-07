'use strict';

const React = require('react-native');
const {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableHighlight
} = React;

const octocat = require('./img/Octocat.png');

let styles = StyleSheet.create({
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
    }
});

let Login = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={octocat} />
                <Text style={styles.heading}>
                    Github Browser
                </Text>
                <TextInput style={styles.input} placeholder="Github Username" />
                <TextInput style={styles.input} placeholder="Github Password" secureTextEntry="true"/>
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

module.exports = Login;
