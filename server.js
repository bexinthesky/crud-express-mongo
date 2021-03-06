const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db;

// connect to mongo
MongoClient.connect('mongodb://R2-D2:whistlewhistlebeep@ds014118.mlab.com:14118/zellwk_tut', (err, client) => {
    if (err) return console.log(err);
    db = client.db('zellwk_tut');
    app.listen(3000, () => {
        console.log('listening to 3000');
    });
});

// middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// handlers
app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err);
        // renders index.ejs
        res.render('index.ejs', { quotes: result });
    });
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        res.redirect('/');
    });
});

app.put('/quotes', (req, res) => {
    // Handle put request
    db.collections('quotes').findOneAndUpdate({ name: 'Yoda' }, {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    }, {
            sort: { _id: -1 },
            upsert: true
        }, (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        });
});

app.delete('/quotes', (req, res) => {
    // Handle delete event here
    db.collection('quotes').findOneAndDelete({ name: req.body.name }, (err, result) => {
        if (err) return res.send(500, err);
        res.send({ message: 'A Darth Vader quote was deleted' });
    });
});
