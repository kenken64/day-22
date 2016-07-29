var LocalStrategy = require("passport-local").Strategy;

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//Setup local strategy
module.exports = function (app, passport) {
    function authenticate(username, password, done) {
        var valid = username == "username@email.com" ? true : false;

        if (valid) {
            return done(null, username);
        }

        return done(null, false);
    }

    function googleAuthenticate(accessToken, refreshToken, profile, done) {
        console.log(arguments);
        console.log("Access Token", accessToken)
        console.log("Refresh Token", refreshToken)
        console.log("Profile info", profile)
        done(null, profile)
    }

    passport.use(new GoogleStrategy({
        clientID: '559296573129-drvlt6pl3nvmv4n9gkaciufmi3pev8lq.apps.googleusercontent.com',
        clientSecret: 'XkkUWyAPmwcr6r_b94e-DTdn',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }, googleAuthenticate))

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, authenticate));

    passport.serializeUser(function (username, done) {
        done(null, username)
    });

    passport.deserializeUser(function (username, done) {
        done(null, username);
    });

};
