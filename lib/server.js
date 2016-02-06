var http = require('http'),
    faye = require('faye');

var redis = require("redis"),
    client = redis.createClient();

client.on("error", function(err) {
  console.log("Error " + err);
});

var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

function sendUpdate(channel, num) {
  console.log('Sending update ' + channel + ' of num ' + num);
  var ev = {}
  ev.event_type = 'stat';
  ev.count = parseInt(num);
  bayeux.getClient().publish(channel, ev)
}

// Handle non-Bayeux requests
var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello, non-Bayeux request');
});

bayeux.on('subscribe', function(clientId, channel) {
  console.log('[  SUBSCRIBE] ' + clientId + ' -> ' + channel);

  client.incr(channel, function(err, num) {
    console.log(num);
    sendUpdate(channel, num);
  });
});

bayeux.on('unsubscribe', function(clientId, channel) {
  console.log('[UNSUBSCRIBE] ' + clientId + ' -> ' + channel);
  client.decr(channel, function(err, num) {
    sendUpdate(channel, num);
  });
});

bayeux.on('disconnect', function(clientId) {
  console.log('[ DISCONNECT] ' + clientId);
});

bayeux.on('publish', function(clientId, channel, data) {
  console.log('[ PUBLISH ] ' + clientId, channel, data)
});

bayeux.attach(server);
console.log('Listening');
server.listen(8000);