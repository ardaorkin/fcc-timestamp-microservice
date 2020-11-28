var express = require('express');
var app = express()


app.get('/json', (req, res) => {
    res.json({date: "data"})
})

module.exports = app;