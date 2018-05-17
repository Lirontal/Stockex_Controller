var Entry = require('../entry/entry').Entry;
var zmq = require("zeromq");

var requester = zmq.socket('req');
// var client = new zerorpc.Client();
// client.connect("tcp://localhost:4242");

function Model(serverAddress) {
    requester.connect(serverAddress);
}

// //TODO: add more parameters
Model.prototype.getFeatured = function()
{
    var response;
    // client.invoke("getFeatured", "", function(error, res, more) {
    //     response = res;
    // });
    response = featuredPlaceHolder();
    return response;
};

function featuredPlaceHolder()
{
    var applEnt = new Entry('AAPL', Open = '176.18',  High = '177.36', Low = '175.65', Close = '177.22', Adj_Close = '177.09',Volume = '25,226,000');
    var googEnt = new Entry('GOOG', Open = '1,102.41',  High = '1,124.29', Low = '1,101.15', Close = '1,122.26', Adj_Close = '1,122.26', Volume = '2,000,000');
    var entryArray = [applEnt, googEnt];

    // var jsonObject = {};
    // var i=0;
    // entryArray.forEach(function(item)
    // {
    //     jsonObject[i++]= item;
    // });
    return entryArray;
}

send = function(str)
{
    console.log("sending: "+str+"...");
    requester.send(str);
    return new Promise(function (fulfill){
        requester.on("message", function (reply) {
            fulfill(reply.toString());
        });
    });
};

//TODO: add more parameters
Model.prototype.easySearch = function(budget)
{
    var request = '{"0": {"action":"easySearch", "budget":"'+ budget +'"}}';
    return send(request);
};

//TODO: remove easySearch placeholder
Model.prototype.advSearch = function(budget, companyType, companyName)
{
    var request = '{"0": {"action":"advancedSearch", "budget":"'+ budget +'", "companyType":"'+ companyType +'", "companyName":"'+ companyName +'"}}';
    return send(request);
};

Model.prototype.tryCommunication = function(str)
{

    return send(str);
};

module.exports = Model;