var winston = require("winston");
var Client = require('./client');

function Pub(channel_id, owner, anarchy) {
  console.log('init')
  Client.call(this, channel_id, owner, anarchy)
}

Pub.prototype = Object.create(Client.prototype)
Pub.prototype.constructor = Client;


Pub.prototype.start = function() {
  winston.log("info", "Your channel ID is " + this.channel_id);

  this.pubsub.subscribe(this.channel, this.message.bind(this))
  this.pubsub.subscribe(this.status_channel, this.status.bind(this))
}

Pub.prototype.message = function(message) {
  if (!this.anarchy) return;

  var that = this;
  var event_type = message.event;

  if (event_type === 'status' && this.needs_info) that.initPlayer(message);
  if (event_type === 'song-changed') that.setSongFromMessage(message);
  if (event_type === 'position-changed') that.setPositionFromMessage(message);
}

Pub.prototype.status = function(status) {
  var ev = {}
  ev.event = 'status'
  ev.anarchy = this.anarchy;
  ev.listeners = 10
  ev.status = {track: this.player.track, 
               position: this.player.position, 
               state: this.player.state};

  this.pubsub.publish(this.channel, ev)
}

module.exports = Pub;