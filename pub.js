var randstring = require("randomstring");
var spotify = require("spotify-node-applescript");
var winston = require("winston");
var Pusher = require("pusher-client")
var pusher = new Pusher('2551e0edf68a000a0f5a', {secret: '9cbc9df1f384ff20eb24'})

var channel_id = null
var channel = null

function start() {
    spotifyRunning()
    channel_id = randstring.generate(8);

    winston.log("info", "Your channel ID is " + channel_id);

    channel = pusher.subscribe('private-' + channel_id);

    // channel.bind('client-joined', newUser)

    startStreaming()
}

// function newUser(err, data) {
//   console.log(err, data)
// }

function spotifyRunning() {
  spotify.isRunning(function(err, isRunning) {
      if (!isRunning) {
        winston.error('Please start Spotify')
        process.exit()
      }
  });
}

function startStreaming() {
  previous_track_id = null

  setInterval(function() {
    spotify.getState(function(err, state) {
      var track_id = state.track_id;

      if (previous_track_id == null) {
        previous_track_id = track_id
      }

      var st = state.state;
      var pos = state.position;
      console.log("STATE " + st + "  " + "POS "+ pos)
      channel.trigger('client-song', {'song': track_id, 'position': pos})

      if (previous_track_id != track_id) {
        console.log("NEW SONG YAY")
        console.log()
        previous_track_id = track_id
        channel.trigger('client-new-song', {'song': track_id, 'position': pos})
      }
    });
  }, 1000);
}

exports.start = start