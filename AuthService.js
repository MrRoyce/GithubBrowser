'use strict';

const buffer = require('buffer');
const AsyncStorage = require('react-native').AsyncStorage;
const _ = require('lodash');

const authKey = 'auth';
const userKey = 'user';

class AuthService {
    getAuthInfo (cb) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {

            let authInfo;

            if (err) {
                return cb(err);
            }

            if (!val) {
                return cb();
            }

            // Turn nested array into an object
            const zippedObj = _.zipObject(val);

            if (!zippedObj[authKey]) {
                return cb();
            }

            authInfo = {
                header: {
                    Authorization: 'Basic ' + zippedObj[authKey]
                },
                user: JSON.parse(zippedObj[userKey])
            };

            return cb(null, authInfo);
        });
    }

    login (creds, cb) {
        const b = new buffer.Buffer(creds.username + ':' + creds.password),
            encodedAuth = b.toString('base64');

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization' : 'Basic ' + encodedAuth
            }
        })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;  // pass it on if it is good
            }

            throw {
                badCredentials: response.status === 401,
                unknownError: response.status !== 401
            };
        })
        .then((response) => {  //Sucessful login
            return response.json();
        })
        .then((results) => {
            AsyncStorage.multiSet([
                [authKey, encodedAuth],
                [userKey, JSON.stringify(results)]
            ], (err) => {
                if (err) {
                    throw err;
                }

                return cb({success: true});
            });
        })
        .catch((err) => {
            return cb(err);
        })
        ;
    }
}

module.exports = new AuthService();
