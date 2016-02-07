var winston = require("winston");

var Client = require('./client');

function Sub(client_id, owner) {
  Client.call(this, channel_id, owner)
}

Sub.prototype = Object.create(Client.prototype)
Sub.prototype.constructor = Client;

Sub.prototype.play = function() {
  // winston.log("info", "You are tuned in to channel ID " + this.channel_id);

  this.pubsub.subscribe(this.channel, this.message.bind(this))
  this.pubsub.publish(this.status_channel, 'here')
}

Sub.prototype.message = function(message) {
  var that = this;
  var event_type = message.event;

  if (event_type === 'status' && this.needs_info) that.initPlayer(message);
  if (event_type === 'song-changed') that.setSongFromMessage(message);
  if (event_type === 'position-changed') that.setPositionFromMessage(message);
  if (event_type === 'state-changed') that.setStateFromMessage(message);
  if (event_type === 'stat') that.updateStats(message);
}

module.exports = Sub;