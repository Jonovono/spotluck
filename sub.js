var spotify = require("spotify-node-applescript");
var winston = require("winston");
var Pusher = require("pusher-client")
var pusher = new Pusher('2551e0edf68a000a0f5a', {secret: '9cbc9df1f384ff20eb24'})

var channel = null;
var currentSong = null;

function start(channel_id) {
    spotifyRunning()
    winston.log("info", "You are connected to " + channel_id);

    channel = pusher.subscribe('private-' + channel_id);

    channel.bind('client-song', song);
    channel.bind('client-new-song', newSong);

    // channel.trigger('client-joined', {'test':'test'});
}


function newSong(data) {
  var spotify_uri = data.song;
  var position = data.position;

  console.log(spotify_uri)

  playSong(spotify_uri, position)
}

function song(data) {
  var spotify_uri = data.song;
  var position = data.position;

  console.log(spotify_uri)

  if (currentSong == null) {
    playSong(spotify_uri, position)
  }
}

function playSong(uri, pos) {
  spotify.playTrack(uri, function() {
    spotify.jumpTo(pos)
  })
}

function spotifyRunning() {
  spotify.isRunning(function(err, isRunning) {
      if (!isRunning) {
        winston.error('Please start Spotify')
        process.exit()
      }
  });
}

exports.start = start;