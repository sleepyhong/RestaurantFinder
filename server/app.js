const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

const routes = require("./router");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(routes);

module.exports = app;