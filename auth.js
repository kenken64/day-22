var LocalStrategy = require("passport-local").Strategy;

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

var FacebookStrategy = require("passport-facebook").Strategy

//Setup local strategy
module.exports = function (app, passport) {
    function authenticate(username, password, done) {
        var valid = username == "username@email.com" ? true : false;

        if (valid) {
            return done(null, username);
        }

        return done(null, false);
    }

    function verifyCallback(accessToken, refreshToken, profile, done) {
        // console.log("Access Token", accessToken)
        // console.log("Refresh Token", refreshToken)
        // console.log("Profile info", profile)
        done(null, profile)
    }

    passport.use(new GoogleStrategy({
        clientID: '559296573129-drvlt6pl3nvmv4n9gkaciufmi3pev8lq.apps.googleusercontent.com',
        clientSecret: 'XkkUWyAPmwcr6r_b94e-DTdn',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }, verifyCallback))

    passport.use(new FacebookStrategy({
        clientID: '262549424131277',
        clientSecret: 'ffbcebb8150031b60dd08869433b0079',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, verifyCallback))

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, authenticate));

    passport.serializeUser(function (profile, done) {
        done(null, profile)
    });

    passport.deserializeUser(function (profile, done) {
        done(null, profile);
    });

};
