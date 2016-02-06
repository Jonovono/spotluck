var log = require('winston');
var argv = require("yargs");
var randstring = require("randomstring");
var spotify = require("spotify-node-applescript");
var Pub = require("../lib/pub")
var Sub = require("../lib/sub")

function CLI() {
  var args = argv
    .default('anarchy', false)
    .argv;

  var commands = args['_'];
  var anarchy = args.anarchy;

  command = commands[0];
  channel_id = commands[1];

  if (command === 'start') {

    var channel = channel_id || randstring.generate(8);
    pub = new Pub(channel, true, anarchy);
    pub.start(anarchy)
    return

  } 

  if (command === 'play') {
    if (channel_id == undefined) {
      log.error("Enter a channel ID");
      process.exit()
    }

    sub = new Sub(channel_id, false)
    sub.play()
    return
  } 

  console.log('Unknown command')
  process.exit()
}

module.exports = CLI