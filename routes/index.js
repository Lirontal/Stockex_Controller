var express = require('express');
var Entry = require('../entry/entry');
var finance_interface = new require('../yahoo-finance/finance');
var router = express.Router();

var zerorpc = require("zerorpc");

/* get JSON with entries for each day  */
router.get('/featured', function(req, res, next)
{
    var fromDate = req.params.FromDate;
    var toDate = req.params.ToDate;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var applEnt = new Entry(Symbol = 'APPL', Open = '176.18',  High = '177.36', Low = '175.65', Close = '177.22', Adj_Close = '177.09',Volume = '25,226,000');
    var googEnt = new Entry(Symbol = 'GOOG', Open = '1,102.41',  High = '1,124.29', Low = '1,101.15', Close = '1,122.26', Adj_Close = '1,122.26', Volume = '2,000,000');

    console.log(applEnt.high);
    var jsonObject = {};
    jsonObject['values'] = [];
    var entryArray = [ applEnt, googEnt];
    entryArray.forEach(function(item)
    {
        jsonObject['values'].push(item);
    });
    res.send(jsonObject);
    return next;
});

router.get('/tryPy', function (req, res, next) {


    var client = new zerorpc.Client();
    client.connect("tcp://127.0.0.1:4242");

    client.invoke("hello", "RPC", function(error, res, more) {
        console.log(res);
    });
})

router.get('/products/:id', function (req, res, next) {

})
/* GET home page. */
router.get('*', function(req, res, next) {
    res.render('index', { title: 'DEFAULT HOMEPAGE' });
});
module.exports = router;