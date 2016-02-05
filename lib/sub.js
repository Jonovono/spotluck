var spotify = require("spotify-node-applescript");
var winston = require("winston");
var client = require('./client').createClient();

var player = require('./player')

var currentSong = null;

var new_user = true;

function start(channel_id) {
    winston.log("info", "You are connected to " + channel_id);

    client.on("message", message)

    vent = {}
    vent.event_type = 'joined'

    client.publish(channel_id, JSON.stringify(vent));

    client.subscribe(channel_id)

    player.playerStatus()
}

function message(channel, message) {
  var message = JSON.parse(message.toString())

  var event_type = message.event_type;

  if (event_type === 'info') {
    if (new_user) {
      console.log('Starting playing for new User')
      new_user = false;

      var message = message.message;
      var track = message.track;
      var position = message.position;

      playSong(track, position);
    }
  } else if (event_type === 'new-song') {
      newSong(message.message)
  } else if (event_type === 'new-state') {
    player.changeState(message.message);
  } else if (event_type === 'new-position') {
    player.changePosition(parseInt(message.message))
  }
  // var ev = message.event;
  // var m = message.message;
}

function newSong(data) {
  var spotify_uri = data.track;
  var position = data.position;

  console.log(spotify_uri)

  playSong(spotify_uri, position)
}

function song(data) {
  var spotify_uri = data.song;
  var position = data.position;

  if (currentSong == null) {
    currentSong = spotify_uri
    playSong(spotify_uri, position)
  }
}

function playSong(uri, pos) {
  console.log('Playing Song '+ uri)
  spotify.playTrack(uri, function() {
    spotify.jumpTo(pos)
  })
}

exports.start = start;