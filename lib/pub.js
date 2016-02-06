var randstring = require("randomstring");
var winston = require("winston");

var Client = require('./client');


Pub.prototype = new Client();
Pub.prototype.constructor = Client;

function Pub() {}

Pub.prototype.start = function() {
  this.player.update();

  this.channel_id = randstring.generate(8);

  winston.log("info", "Your channel ID is " + this.channel_id);

  process.on("song-changed", this.songChange);
  // process.on("state-changed", stateChange);
  // process.on('position-changed', newPosition);

  // client.subscribe(channel_id)

  // client.on('message', message);
}

Pub.prototype.songChange = function(track, position) {
  console.log("COOOL", track, position)
}

module.exports = Pub;