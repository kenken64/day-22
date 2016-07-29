var LocalStrategy = require("passport-local").Strategy;
//Setup local strategy
module.exports = function (app, passport) {
    function authenticate(username, password, done) {
        var valid = username == "username@email.com" ? true : false;

        if (valid) {
            return done(null, username);
        }

        return done(null, false);
    }

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