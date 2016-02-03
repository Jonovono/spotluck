var pub = require("./pub")
var sub = require("./sub")

// console.log(pub.test())

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
