var spotify = require("spotify-node-applescript");
var winston = require("winston");

function Player() {
  this.track = null;
  this.state = null;
  this.position = null;
}

Player.prototype.update = function() {
  var that = this;
  setInterval(function() {
    spotify.getState(function(err, state) {
      if (state || state != undefined || state != null) {
        var track_id = state.track_id;
        var track_state = state.state;
        var position = state.position;

        if (that.track == null) {
          that.track = track_id;
        }

        if (that.state == null) {
          that.state = track_state;
        }

        if (that.position == null) {
          that.position = position;
        }

        if (that.state != track_state) {
          // winston.info('LOCAL: State Change ' + track_state)
          that.state = track_state
          process.emit('state-changed', track_state)
        }

        if (that.track != track_id) {
          // winston.info('LOCAL: New Song ' + track_id + ' '  + position)
          that.track = track_id
          that.position = position
          process.emit('song-changed', track_id, position);
        } else if (Math.abs(position - that.position) >= 5) {
          // winston.info('LOCAL: Changed position')
          that.position = position;
          process.emit('position-changed', position)
        }

        that.track = track_id;
        that.state = track_state;
        that.position = position;
      }
    });
  }, 1000);
}

Player.prototype.setState = function(state) {
  if (state === 'playing') {
      this.state = 'playing';
      spotify.play();
  } else if (state === 'paused') {
      this.state = 'paused';
      spotify.pause();
  }
}

Player.prototype.setSong = function(track, position, state) {
  var that = this;
  spotify.playTrack(track, function() {
    spotify.jumpTo(position);

    that.track = track;
    that.position = position;

    that.setState(state);
  });
}

Player.prototype.setPosition = function(position) {
  this.position = position;
  spotify.jumpTo(position);
}

module.exports = Player;