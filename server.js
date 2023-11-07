const express = require("express");
const helmet = require('helmet');
const app = express();
var compression = require('compression')
// var csrf = require('@dr.pogodin/csurf')
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var cors = require("cors");
var path = require("path");


/**
 * Pino log rotator
 */
const passport = require("passport");

app.use(compression())
app.use(cookieParser());
app.use(helmet());
app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "https: data: blob:"],
        },
    })
);
app.use(
    session({
        secret: "keyboard cat",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use(bodyParser.json({ limit: "20MB" }));
app.use(bodyParser.urlencoded({ limit: "20MB", extended: true }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
require("./config/passport");
app.get("/", (req, res) => {
    res.redirect("/ping")
})


app.get('/register', (req, res) => {
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    res.sendFile(path.join(__dirname, 'frontend/register.html'));
})

app.get('/login', (req, res) => {
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    res.sendFile(path.join(__dirname, 'frontend/login.html'));
})
app.get('/home', (req, res) => {
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    res.sendFile(path.join(__dirname, 'frontend/home.html'));
})

app.get('/dashboard', (req, res) => {
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    res.sendFile(path.join(__dirname, 'frontend/dashboard.html'));
})

app.get('/addMovie', (req, res) => {
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    res.sendFile(path.join(__dirname, 'frontend/addMovie.html'));
})

app.get("/ping", (req, res) => {
    console.log("PING")
    res.json({
        status: "OK",
        time: new Date().toTimeString(),
        msg: "SERVER IS UP AND RUNNING"
    })
});
const userV1 = require("./routes/v1/users")
const movieV1 = require("./routes/v1/movies")





// app.use('/ui/admin', express.static('public'));
// app.use("/ui/admin/login", (req, res) => {
//     res.sendFile(`${__dirname}/public/login2.html`,)
// })
app.use("/api/v1/user", userV1);
app.use("/api/v1/movie", movieV1);


module.exports = app;
