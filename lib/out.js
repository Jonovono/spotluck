var tui = require("terminal-ui");
var chalk = require('chalk')

tui.clear();

function Out() {
  this.channel_id = null;
  this.anarchy = null;
  this.owner = null;
}

Out.prototype.init = function(channel_id, anarchy, owner) {
  this.channel_id = channel_id;
  this.anarchy = anarchy;
  this.owner = owner;

  this.channelMessage();
  this.howToMessage();
  this.noticeMessage();
}

Out.prototype.channelMessage = function() {
  var cm = '';
  if (this.owner) cm = "Your channel ID is " + chalk.underline.red(this.channel_id) + '    🔥';
  else cm = "You are listening to channel ID is " + chalk.underline.red(this.channel_id) + '    🔥';

  tui.drawChars(cm, 1, 0);
}

Out.prototype.howToMessage = function() {
  var howToUse = "Others can tune in with the command: " + chalk.blue('spotluck play ' + this.channel_id);
  tui.drawChars(howToUse, 2, 0);
}

Out.prototype.noticeMessage = function() {
  var m = '';
  if (this.anarchy) m = 'Anyone can control the music on this channel';
  else if (this.owner) m = 'Only you can control the music on this channel';
  else m = 'You cannot control the music on this channel';

  m = chalk.red('NOTE: ') + m;

  tui.drawChars(m, 3, 0);
}

Out.prototype.updateUsers = function(count) {
    numUsers = chalk.magenta(count) + " Users currently listening"

    tui.drawChars(numUsers, 5, 0);
}

Out.prototype.bye = function() {
  var m = 'PEACE OUT 🖖';
  tui.drawChars(m, 6, 0)
}

module.exports = Out;

// var channelMessage = "Your channel ID is " + chalk.underline.red("Yt4Rose") + '    🔥';
// var howToUse = "Others can tune in with the command: " + chalk.blue('spotluck play Yt4Rose') 
// var notice = chalk.yellow('NOTE: ') + "Anyone can control the music on this channel"

// var numUsers = chalk.magenta(0) + " Users currently listening"
// // var notice = chalk.red('NOTE: ') + "Only you can control the music on this channel"
// // var notice = chalk.red("NOTE: ") + "You cannot control the music on this channel"

// tui.drawChars(channelMessage, 1, 0)
// tui.drawChars(howToUse, 2, 0)
// tui.drawChars(notice, 3, 0)

// tui.drawChars(numUsers, 5, 0)

// // tui.drawChars(chalk.bgRed('HELLO'), 10, 0)


// // tui.drawChars(' TEST ', 1, 20)

// // tui.drawChars('', 2, 0)
// // tui.drawChars('', 3, 0)
// // tui.drawChars('', 4, 0)
// // tui.drawChars('', 5, 0)
// tui.drawChars('', 6, 0)

// count = 0
// setInterval(function() {
//   numUsers = chalk.magenta(count) + " Users currently listening"

//   tui.drawChars(numUsers, 5, 0)
//   count += 1

//   // tui.drawChars
//   // if(!changes.length) process.exit();
//   //  tui.drawChars.apply(tui,changes.shift());
// },500);
