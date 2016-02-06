var winston = require("winston");

var Client = require('./client');

function Sub(client_id, owner) {
  console.log('init sub')
  Client.call(this, channel_id, owner)
}

Sub.prototype = Object.create(Client.prototype)
Sub.prototype.constructor = Client;

Sub.prototype.play = function() {
  winston.log("info", "You are tuned in to channel ID " + this.channel_id);

  this.pubsub.subscribe(this.channel, this.message.bind(this))

  this.pubsub.publish(this.status_channel, 'here')
}

Sub.prototype.message = function(message) {
  console.log('Got event ', message)
  var that = this;
  var event_type = message.event;

  if (event_type === 'status' && this.needs_info) that.initPlayer(message);
  if (event_type === 'song-changed') that.setSongFromMessage(message);
  if (event_type === 'position-changed') that.setPositionFromMessage(message);
  if (event_type === 'state-changed') that.setStateFromMessage(message);
}

// Sub.prototype.initPlayer = function(message) {
//   console.log('Initing Player')
//   this.needs_info = false;

//   this.anarchy = message.anarchy;

//   var status = message.status;

//   var track = status.track;
//   var position = status.position;
//   var state = status.state;

//   this.player.setSong(track, position, state);
// }

// Pub.prototype.songChange = function(track, position) {
//   console.log("COOOL", track, position)
// }

module.exports = Sub;


















// var spotify = require("spotify-node-applescript");
// var winston = require("winston");
// var client = require('./client').createClient();

// var player = require('./player')

// var currentSong = null;

// var new_user = true;

// function start(channel_id) {
//     winston.log("info", "You are connected to " + channel_id);

//     client.on("message", message)

//     vent = {}
//     vent.event_type = 'joined'

//     client.publish(channel_id, JSON.stringify(vent));

//     client.subscribe(channel_id)

//     player.playerStatus()
// }

// function message(channel, message) {
//   var message = JSON.parse(message.toString())

//   var event_type = message.event_type;

//   if (event_type === 'info') {
//     if (new_user) {
//       console.log('Starting playing for new User')
//       new_user = false;

//       var message = message.message;
//       var track = message.track;
//       var position = message.position;

//       playSong(track, position);
//     }
//   } else if (event_type === 'new-song') {
//       newSong(message.message)
//   } else if (event_type === 'new-state') {
//     player.changeState(message.message);
//   } else if (event_type === 'new-position') {
//     player.changePosition(parseInt(message.message))
//   }
//   // var ev = message.event;
//   // var m = message.message;
// }

// function newSong(data) {
//   var spotify_uri = data.track;
//   var position = data.position;

//   console.log(spotify_uri)

//   playSong(spotify_uri, position)
// }

// function song(data) {
//   var spotify_uri = data.song;
//   var position = data.position;

//   if (currentSong == null) {
//     currentSong = spotify_uri
//     playSong(spotify_uri, position)
//   }
// }

// function playSong(uri, pos) {
//   console.log('Playing Song '+ uri)
//   spotify.playTrack(uri, function() {
//     spotify.jumpTo(pos)
//   })
// }

// exports.start = start;