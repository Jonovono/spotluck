#! /usr/bin/env node

var spotify = require("spotify-node-applescript");
var CLI = require('../lib/cli');

spotify.isRunning(function(err, isRunning) {
  if (!isRunning) {
    console.log('Please start Spotify')
    process.exit()
  }

  new CLI()
});