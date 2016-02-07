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
      this.help()
      process.exit()
    }

    sub = new Sub(channel_id, false)
    sub.play()
    return
  } 

  this.help()

  process.exit()
}


CLI.prototype.help = function() {
  var help_message = 'How to use Spotluck: \n \
  spotluck start <channel_id> (if you dont specify one, a random channel_id will be created) \n \
  spotluck play [channel_id] \
  '

  console.log(help_message)
}

module.exports = CLI