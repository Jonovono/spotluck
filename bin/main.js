#! /usr/bin/env node

var pub = require("../lib/pub")
var sub = require("../lib/sub")
var player = require('../lib/player');

player.spotifyRunning()

var args = process.argv.slice(2)

var command = args[0]
var channel_id = args[1]

if (command !== 'start' || command !== 'play') {
  console.log('Enter a command')
}

if (command === 'play') {
  sub.start(channel_id)
} else if (command === 'start') {
    pub.start()
}
