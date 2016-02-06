var config = require('../config');
var Player = require('./player');
var faye = require('faye');

function Client(channel_id, owner, anarchy) {
  console.log(channel_id, owner, anarchy)
  this.pubsub = new faye.Client(config.HOST);
  this.player = new Player();

  this.owner = owner;
  this.anarchy = anarchy;

  this.channel_id = channel_id;

  this.player.update();

  process.on("song-changed", this.songChanged.bind(this));
  process.on ("state-changed", this.stateChanged.bind(this));
  process.on('position-changed', this.positionChanged.bind(this));

  process.on('SIGINT', this.exit.bind(this));
}

Client.prototype.songChanged = function(track, position) {
  console.log("COOOL", track, position)
  console.log(this.owner, this.anarchy, this.channel_id)
}

Client.prototype.stateChanged = function(state) {
  console.log('stae')
}

Client.prototype.positionChanged = function(position) {
  console.log('pos')
}

Client.prototype.exit = function() {
  console.log('exit', this.anarchy, this.channel_id);
  process.exit()
}

process.stdin.resume();


// function newUser() {
//   player.getCurrentStatus(function(current_status) {
//     var vent = {}
//     vent.event_type = 'info'
//     vent.message = {}
//     vent.message.track = current_status.track
//     vent.message.position = current_status.position;

//     client.publish(channel_id, JSON.stringify(vent))
//   });
// }

// function stateChange(state) {
//   var vent = {}
//   vent.event_type = 'new-state'
//   vent.message = state

//   vent = JSON.stringify(vent)

//   client.publish(channel_id, vent)
// }

// function songChange(msg) {
//   var vent = {}
//   vent.event_type = 'new-song'
//   vent.message = msg

//   vent = JSON.stringify(vent)

//   client.publish(channel_id, vent)
// }

// function newPosition(position) {
//   var vent = {}
//   vent.event_type = 'new-position'
//   vent.message = position

//   vent = JSON.stringify(vent)

//   client.publish(channel_id, vent)
// }

// function message(topic, message) {
//   console.log('Got message')
//   var message = JSON.parse(message.toString())

//   if (message.event_type === 'joined') {
//     newUser()
//   }
// }


module.exports = Client;
