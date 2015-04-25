var http = require('http');

var statusCode = 200;
var count = 1;

setImmediate(function start() {

    var uri = "http://httpstat.us/" + statusCode;
    console.log('http request #' + (count++) + ' to ' + uri);
    http.get(uri, function (res) {
        console.log('# statusCode', res.statusCode)

        var bufs = [];
        res.on('data', function (data) {
            bufs.push(new Buffer(data));
            console.log('# received', new Buffer(data).toString());
        })
        res.on('end', function () {
            console.log('done.');
            setImmediate(start);
        })
    }).on('error', function (e) {
        console.log('not ok -', e.message, 'error event')
        setImmediate(start);
    });
});