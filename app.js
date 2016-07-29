//Load express
var express = require("express");
//Create an instance of express application
var app = express();

var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Initialize session
app.use(session({
    secret: "something-crypric",
    resave: false,
    saveUninitialized: true
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

require("./auth")(app, passport);
require("./routes")(app);

app.post("/login", passport.authenticate("local", {
    successRedirect: "/status/201",
    failureRedirect: "/status/403"
}));

app.get("/status/:code", function (req, res) {

    console.log("Saved user------",req.user);

    var code = parseInt(req.params.code);

    res.status(code).end();
});

app.get("/logout", function(req, res) {
    req.logout();             // clears the passport session
    req.session.destroy();    // destroys all session related data
    res.redirect("/")         // redirect to "/" of the application
})

app.listen(3000, function () {
    console.log("Listening on ", 3000)
});
