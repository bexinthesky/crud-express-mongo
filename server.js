console.log('May Node be with you');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile('/Users/rebeccahorwitz/Desktop/projects/crud-express-mongo' + '/index.html');
    // console.log(_dirname);
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/');
    });
});

const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://R2-D2:whistlewhistlebeep@ds014118.mlab.com:14118/zellwk_tut', (err, client) => {
    if (err) return console.log(err);
    db = client.db('zellwk_tut');
    app.listen(3000, () => {
        console.log('listening to 3000');
    });
});