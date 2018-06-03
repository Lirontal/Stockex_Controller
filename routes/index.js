var express = require('express');
//
// var Finance = require('../yahoo-finance/finance');
var Model = require('../model_interface/model');
// var finance = new Finance();
var router = express.Router();
var model = new Model("tcp://localhost:5555");
/* This executes on every route */
router.use(function timeLog (req, res, next) {
    makeResponseValid(res);
    //sanitizeRequest(req);
    next();
});
/* Get JSON with entries for the featured stocks, ordered by our algorithm's rating  */
router.get('/featured', function(req, res, next)
{
    var results = model.getFeatured();
    results.then(function(result){res.send(result);});
    return next;
});
/* Alter response's header so that angular accepts our response */
function makeResponseValid(res)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}

/* Get data about a stock with symbol "symbol" in the range "fromDate" to "toDate" */
//TODO: maybe more parameters?
router.get('/getDataSingle', function(req, res, next){
    var results = finance.GetEntriadvfesFor(req.query.symbol,req.query.from,req.query.to);
    results.then(function(result){res.send(result);});
    return next;

});

router.get('/getPredHistory', function(req, res, next){
    var results = model.getPredHistory(req.query.symbol,req.query.start,req.query.end);
    results.then(function (result) {
        res.send(JSON.parse(result));
    });
    return next;
});

/* Get data about multiple stocks from the list "symbols": "symb1,symb2,..." in the range "fromDate" to "toDate" */
//TODO: maybe more parameters?
router.get('/getDataMulti', function(req, res, next){
    var array = req.query.symbols.split(',');
    var results = finance.GetEntriesForMulti(array,req.query.from,req.query.to);
    results.then(function(result){res.send(result);});
    return next;
});

router.get('/easySearch', function(req, res, next){
    var budget = req.query.budget;
    if(!isNaN(budget)) {
        var results = model.easySearch(budget);
        results.then(function (result) {
            res.send(JSON.parse(result));
        });
    }
    else res.send('please send numbers only');
    return next;
});

router.get('/advancedSearch', function(req, res, next){
    var budget = req.query.budget;
    var company_type = req.query.company_type;
    var company_name = req.query.company_name;
    if(!isNaN(budget)) {
        var results = model.advSearch(budget,company_type,company_name);
        results.then(function (result) {
            res.send((result));
        });
    }
    else res.send('please send numbers only');
    return next;
});

/* A communication test */
router.get('/comm', function(req, res, next){
    model.tryCommunication('{"0": {"action":"getHistorical", "symbol":"GOOGL", "start":"2018-04-12", "end":"2018-04-12"}}').then(function(result){
        console.log("Received reply from model: ");
        var resStr = result;
        console.log(resStr);
        res.send(resStr);

        return next;
    });

});

/* If not found, redirect to home page */
router.get('*', function(req, res) {
    res.render('index', { title: 'DEFAULT HOMEPAGE' });
});

module.exports = router;