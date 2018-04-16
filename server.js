console.log('May Node be with you');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
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
app.use(express.static('public'));
app.use(bodyParser.json());

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
        },
        (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        })
});
