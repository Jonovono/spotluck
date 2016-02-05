var config = require('./config');
var mqtt    = require('mqtt');

function createClient() {
  // var client = redis.createClient(config.PORT, config.HOST, {no_ready_check: true})
  var client  = mqtt.connect(config.HOST);
  return client
}

module.exports.createClient = createClient;
