const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  if (Math.floor(Math.random() * Math.floor(2)) == 1) {
    msg.channel.send("Result: Heads.");
  } else {
    msg.channel.send("Result: Tails.");
  }
}
module.exports.help = {
  name: "coinflip"
}
