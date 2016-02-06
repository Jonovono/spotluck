var winston = require("winston");

var Client = require('./client');


// Pub.prototype = new Client();

function Pub(channel_id, owner, anarchy) {
  console.log('init')
  Client.call(this, channel_id, owner, anarchy)

  // process.on('SIGINT', this.exit);
}

Pub.prototype = Object.create(Client.prototype)
Pub.prototype.constructor = Client;


Pub.prototype.start = function() {
  winston.log("info", "Your channel ID is " + this.channel_id);

  this.subscribe()
}

Pub.prototype.subscribe = function() {
  var status_channel = `/${this.channel_id}/status`
  this.pubsub.subscribe('/' + this.channel_id, this.message)
  this.pubsub.subscribe(status_channel, this.status)
}

Pub.prototype.message = function(message) {
  console.log('mesage')
}

Pub.prototype.status = function(status) {
  console.log("send status")
}

// Pub.prototype.songChange = function(track, position) {
//   console.log("COOOL", track, position)
// }

module.exports = Pub;