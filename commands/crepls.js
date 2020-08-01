const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  msg.delete();
  msg.channel.send("crepls");
}
module.exports.help = {
  name: "crepls"
}
