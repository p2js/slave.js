const Discord = require("discord.js")
const botconfig = require("../botconfig")
module.exports.run = async(bot, msg, args) => {
  if (msg.author.id !== botconfig.ownerID) {
    msg.channel.send("This command is for the bot owner only.");}
  else
    msg.channel.send(bot.guilds.map(g => g.name))
}
module.exports.help = {
  name: "servers"
}
