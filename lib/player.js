var spotify = require("spotify-node-applescript");
var winston = require("winston");

function getCurrentStatus(cb) {
  spotify.getState(function(err, state) {
    var track_id = state.track_id;
    var track_state = state.state;
    var position = state.position;

    var out = {}

    out.track = track_id
    out.position = position
    cb(out)
  });
}

function playerStatus() {
  var previous_track_id = null;
  var current_state = null;
  var current_position = null;

  setInterval(function() {
    spotify.getState(function(err, state) {
      var track_id = state.track_id;
      var track_state = state.state;
      var position = state.position;

      if (previous_track_id == null) {
        previous_track_id = track_id
      }

      if (current_state == null) {
        current_state = track_state
      }

      if (current_position == null) {
        current_position = position;
      }

      if (current_state != track_state) {
        winston.info('LOCAL: State Change ' + track_state)
        current_state = track_state
        stateChange(track_state)
      }

      if (previous_track_id != track_id) {
        winston.info('LOCAL: New Song ' + track_id)
        previous_track_id = track_id
        songChange(track_id, position)
      } else if (Math.abs(position - current_position) >= 5) {
        winston.info('LOCAL: Changed position')
        current_position = position;
        changedPosition(position)
      }

      current_position = position

    });
  }, 1000);
}

function spotifyRunning() {
  spotify.isRunning(function(err, isRunning) {
      if (!isRunning) {
        winston.error('Please start Spotify')
        process.exit()
      }
  });
}

function stateChange(state) {
  process.emit('state-changed', state)
}

function changeState(state) {
  if (state === 'playing') {
      spotify.play()
  } else if (state === 'paused') {
      spotify.pause()
  }
}

function changedPosition(position) {
  process.emit('new-position', position)
}

function songChange(uri, pos) {
  process.emit('song-changed', {'track': uri, 'position': pos});
}

function playSong(uri, pos) {
  console.log('Playing Song '+ uri)
  spotify.playTrack(uri, function() {
    spotify.jumpTo(pos)
  })
}


function changePosition(position) {
  spotify.jumpTo(position)
}

exports.playSong = playSong;
exports.playerStatus = playerStatus;
exports.spotifyRunning = spotifyRunning;
exports.getCurrentStatus = getCurrentStatus;
exports.changeState = changeState;
exports.changePosition = changePosition