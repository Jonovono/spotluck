var config = require('../config');
var mqtt    = require('mqtt');
var Player = require('./player');

function Client() {
  this.pubsub = mqtt.connect(config.HOST);
  this.player = new Player();

  this.channel_id = null;
}


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
