const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  msg.channel.send('Result: ' + (Math.floor(Math.random() * Math.floor(parseInt(args[0], 10))) + 1))
}
module.exports.help = {
  name: "random"
}
