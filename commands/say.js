const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  msg.delete();
  {msg.channel.send(msg.cleanContent.slice(4));}
}
module.exports.help = {
  name: "say"
}
