var crypto = require('crypto');

// Event Hubs parameters
var namespace = 'collisionDetection-ns';
var hubname = 'collisiondetection';
var deviceName = '1';
var eventHubAccessKeyName = 'SendRule';
var eventHubAccessKey = 'xmEOMGlBO7+NsLFKsWrH5Ejrh7U01TS+Yi01IuOYfGc=';


// Full Event Hub publisher URI
var eventHubUri = 'https://' + namespace + '.servicebus.windows.net' + '/' + hubname + '/publishers/' + deviceName + '/messages';

function createSASToken(uri, keyName, key) {
    //Token expires in december
    var expiry = '1454612852';

    var signedString = encodeURIComponent(uri) + '\n' + expiry;
    var hmac = crypto.createHmac('sha256', key);
    hmac.update(signedString);
    var signature = hmac.digest('base64');
    var token = 'SharedAccessSignature sr=' + encodeURIComponent(uri) + '&sig=' + encodeURIComponent(signature) + '&se=' + expiry + '&skn=' + keyName;

    return token;
}

var createdSASToken = createSASToken(eventHubUri, eventHubAccessKeyName, eventHubAccessKey)
console.log(createdSASToken);