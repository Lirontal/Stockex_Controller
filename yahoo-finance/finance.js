// var util = require('util');
function Finance()//'AAPL','2018-01-01'
{

}

Finance.prototype.GetEntriesFor = function(Symbol, FromDate , ToDate)
{
    var resultArray = [];
    var yahooFinance = require('yahoo-finance');
    yahooFinance.historical({
        symbol: Symbol,
        from: FromDate,
        to: ToDate,
        period: 'd'
    }, function (err, quotes) {
        if (err) {
            throw err;
        }
        // console.log(util.format(
        //     '=== %s (%d) ===',
        //     SYMBOL,
        //     quotes.length
        // ).toString());
        return quotes;
        quotes.forEach(function (quote) {
            console.log(JSON.stringify(quote, null, 2));
        })
    });
};

module.exports = Finance;
