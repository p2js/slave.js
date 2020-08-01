const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  msg.delete();
  msg.channel.send("Processing latency...").then(m => m.edit(`Current latency is ${m.createdTimestamp - msg.createdTimestamp}ms, while the API Latency is ${Math.round(bot.ping)}ms`) );
}
module.exports.help = {
  name: "ping"
}
