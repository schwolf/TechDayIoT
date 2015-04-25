var https = require('https');
var crypto = require('crypto');

var namespace = 'collisionDetection-ns';
var hubname = 'collisiondetection';
var deviceName = '1';
var eventHubAccessKeyName = 'SendRule';
var createdSAS = 'SharedAccessSignature sr=https%3A%2F%2FcollisionDetection-ns.servicebus.windows.net%2Fcollisiondetection%2Fpublishers%2F1%2Fmessages&sig=DpiMPxFL2jy6rtJM8hJnn7OHGdi5pT3AgflbI%2BXgax8%3D&se=1454612852&skn=SendRule';
console.log('Namespace: ' + namespace);
console.log('hubname: ' + hubname);
console.log('publisher: ' + deviceName);
console.log('eventHubAccessKeyName: ' + eventHubAccessKeyName);
console.log('SAS Token: ' + createdSAS);
console.log('----------------------------------------------------------------------');
console.log('');

// Payload to send
var payload = '{\"Id\":\"1\", \"Xcoordinate\":\"3\", \"Ycoordinate\":\"4\"}';

// Endpoint=sb://collisiondetection-ns.servicebus.windows.net/;SharedAccessKeyName=SendRule;SharedAccessKey=xmEOMGlBO7+NsLFKsWrH5Ejrh7U01TS+Yi01IuOYfGc=

// Send the request to the Event Hub
var options = {
    hostname: namespace + '.servicebus.windows.net',
    port: 443,
    path: '/' + hubname + '/publishers/' + deviceName + '/messages',
    method: 'POST',
    headers: {
        'Authorization': createdSAS,
        'Content-Length': payload.length,
        'Content-Type': 'application/atom+xml;type=entry;charset=utf-8'
    }
};

console.log(options);

var req = https.request(options, function (res) {
    console.log('----------------------------------------------------------------------');
    console.log("statusCode: ", res.statusCode);
    console.log('----------------------------------------------------------------------');
    console.log('');
    res.on('data', function (d) {
        process.stdout.write(d);
    });
});

req.on('error', function (e) {
    console.log('error');
    console.error(e);
});

req.write(payload);
req.end();