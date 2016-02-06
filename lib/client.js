var config = require('../config');
var Player = require('./player');
var faye = require('faye');

function Client(channel_id, owner, anarchy) {
  this.pubsub = new faye.Client(config.HOST);
  this.player = new Player();

  this.owner = owner;
  this.anarchy = anarchy;
  this.needs_info = true;

  this.channel_id = channel_id;
  this.channel = '/'+channel_id;
  this.status_channel = this.channel+'/status';

  this.player.update();

  process.on("song-changed", this.songChanged.bind(this));
  process.on ("state-changed", this.stateChanged.bind(this));
  process.on('position-changed', this.positionChanged.bind(this));

  process.on('SIGINT', this.exit.bind(this));
}

Client.prototype.songChanged = function(track, position) {
  console.log(this.owner, this.anarchy, this.channel_id);

  if (this.owner) {
    this.sendSongChange()
    return;
  } 

  if (this.anarchy) {
    this.sendSongChange()
    return;
  }

  this.needs_info = true;
  this.pubsub.publish(this.status_channel, 'here');
}

Client.prototype.stateChanged = function(state) {
  if (this.owner && !this.anarchy) {
    this.sendStateChange()
    return;
  } 

  this.needs_info = true;

  if (state === 'playing' && this.needs_info) {
    this.pubsub.publish(this.status_channel, 'here')
  }
}

Client.prototype.positionChanged = function(position) {
  if (this.owner) {
    this.sendPositionChange()
    return;
  } 

  if (this.anarchy) {
    this.sendPositionChange()
    return;
  }

  this.needs_info = true;
  this.pubsub.publish(this.status_channel, 'here');
}

Client.prototype.exit = function() {
  console.log('Gonna unsub')
  // this.pubsub.publish(this.channel, '/meta/unsubscribe');
  // this.pubsub.publish(this.status_channel, '/meta/unsubscribe');

  this.pubsub.publish(this.channel, 'peace');
  process.exit()

}

Client.prototype.sendSongChange = function() {
  var ev = {}
  ev.event = 'song-changed'
  ev.status = {track: this.player.track, 
               position: this.player.position, 
               state: this.player.state};

  this.pubsub.publish(this.channel, ev)
}

Client.prototype.sendPositionChange = function() {
  var ev = {}
  ev.event = 'position-changed'
  ev.position = this.player.position;

  this.pubsub.publish(this.channel, ev)
}

Client.prototype.sendStateChange = function() {
  var ev = {}
  ev.event = 'state-changed'
  ev.state = this.player.state;

  this.pubsub.publish(this.channel, ev)
}

Client.prototype.setSongFromMessage = function(message) {
  var status = message.status;

  var track = status.track;
  var position = status.position;
  var state = status.state;

  this.player.setSong(track, position, state);
}

Client.prototype.setPositionFromMessage = function(message) {
  var position = message.position;

  this.player.setPosition(position);
}

Client.prototype.setStateFromMessage = function(message) {
  var state = message.state;

  this.player.setState(state);
}

Client.prototype.initPlayer = function(message) {
  this.needs_info = false;

  this.anarchy = message.anarchy;

  var status = message.status;

  var track = status.track;
  var position = status.position;
  var state = status.state;

  this.player.setSong(track, position, state);
}

process.stdin.resume();

module.exports = Client;
