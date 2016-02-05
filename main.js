var pub = require("./lib/pub")
var sub = require("./lib/sub")
var player = require('./lib/player');

player.spotifyRunning()

var args = process.argv.slice(2)

var command = args[0]
var channel_id = args[1]

if (command !== 'start' ) {
  console.log('Enter a command')
}

if (command === 'start' && channel_id) {
  sub.start(channel_id)
} else if (command === 'start') {
    pub.start()
}
