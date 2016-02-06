var log = require('winston');
var argv = require("yargs");
var spotify = require("spotify-node-applescript");
var Pub = require("../lib/pub")
var sub = require("../lib/sub")

function CLI() {
  var args = argv
    .default('anarchy', false)
    .argv;

  var commands = args['_'];
  var anarchy = args.anarchy;

  command = commands[0];
  channel_id = commands[1];

  if (command === 'start') {
    pub = new Pub();
    pub.start(anarchy)
  } else if (command === 'play') {

    if (channel_id == undefined) {
      log.error("Enter a channel ID");
      process.exit()
    }

    sub.start(channel_id, anarchy)
  } else {
    console.log('Unknown command')
    process.exit()
  }
}

module.exports = CLI