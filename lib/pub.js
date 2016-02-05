var randstring = require("randomstring");
var spotify = require("spotify-node-applescript");
var winston = require("winston");
var player = require('./player')

var client = require('./client').createClient();

var channel_id = null
var channel = null

function newUser() {
  player.getCurrentStatus(function(current_status) {
    var vent = {}
    vent.event_type = 'info'
    vent.message = {}
    vent.message.track = current_status.track
    vent.message.position = current_status.position;

    client.publish(channel_id, JSON.stringify(vent))
  });
}

function stateChange(state) {
  var vent = {}
  vent.event_type = 'new-state'
  vent.message = state

  vent = JSON.stringify(vent)

  client.publish(channel_id, vent)
}

function songChange(msg) {
  var vent = {}
  vent.event_type = 'new-song'
  vent.message = msg

  vent = JSON.stringify(vent)

  client.publish(channel_id, vent)
}

function newPosition(position) {
  var vent = {}
  vent.event_type = 'new-position'
  vent.message = position

  vent = JSON.stringify(vent)

  client.publish(channel_id, vent)
}

function message(topic, message) {
  console.log('Got message')
  var message = JSON.parse(message.toString())

  if (message.event_type === 'joined') {
    newUser()
  }
}

function start() {
    channel_id = randstring.generate(8);

    winston.log("info", "Your channel ID is " + channel_id);

    process.on("song-changed", songChange);
    process.on("state-changed", stateChange);
    process.on('new-position', newPosition);

    client.subscribe(channel_id)

    client.on('message', message);

    player.playerStatus()
}

// function newUser(err, data) {
//   console.log(err, data)
// }

// function startStreaming() {
//   previous_track_id = null

//   setInterval(function() {
//     spotify.getState(function(err, state) {
//       var track_id = state.track_id;

//       if (previous_track_id == null) {
//         previous_track_id = track_id
//       }

//       var st = state.state;
//       var pos = state.position;
//       console.log("STATE " + st + "  " + "POS "+ pos)
//       channel.trigger('client-song', {'song': track_id, 'position': pos})

//       if (previous_track_id != track_id) {
//         console.log("NEW SONG YAY")
//         console.log()
//         previous_track_id = track_id
//         channel.trigger('client-new-song', {'song': track_id, 'position': pos})
//       }
//     });
//   }, 1000);
// }

exports.start = start