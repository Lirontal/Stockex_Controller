var util = require('util');
var yahooFinance = require('yahoo-finance');
function Finance(){}

//'AAPL','2018-01-01', '2018-01-24'
/* Get entries for the date range "FromDate - ToDate" for stock with symbol "Symbol" */
Finance.prototype.GetEntriesFor = function(Symbol, FromDate , ToDate)
{
    console.log(util.format("getting entries for %s, from %s to %s...",Symbol, FromDate, ToDate));
    //var quotes;
    var p = new Promise(function (fulfill, reject){
        yahooFinance.historical({
            symbol: Symbol,
            from: FromDate,
            to: ToDate,
            period: 'd'
        }, function (err, q) {
            if (err) {
                reject(err);
            }
            console.log("Received response from finance API");

            fulfill(q);
        });
    });
    console.log("returning");
    return p;

};

Finance.prototype.GetEntriesForMulti = function(Symbol_list, FromDate , ToDate)
{
    console.log(util.format("getting entries for %s, from %s to %s...",Symbol, FromDate, ToDate));
    //var quotes;
    var p = new Promise(function (fulfill, reject){
        yahooFinance.historical({
            symbols: Symbol_list,
            from: FromDate,
            to: ToDate,
            period: 'd'
        }, function (err, q) {
            if (err) {
                reject(err);
            }
            console.log("Received response from finance API");

            fulfill(q);
        });
    });
    console.log("returning");
    return p;

};

module.exports = Finance;
