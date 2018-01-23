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

        return quotes;
    });
};

module.exports = Finance;
