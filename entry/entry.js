var escape = require('js-string-escape');

function Entry(Symbol, Open, High, Low, Close, Adj_Close, Volume)
{
    this.Symbol = Symbol;
    this.Open = Open;
    this.High = High;
    this.Low = Low;
    this.Close = Close;
    this.Adj_close = Adj_Close;
    this.Volume = Volume;
}

module.exports = Entry;