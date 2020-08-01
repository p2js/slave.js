const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const prefix = botconfig.prefix
const ownerID = botconfig.ownerID
module.exports.run = async(bot, msg, args) => {
  let totalSeconds = (bot.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds.toFixed(0)} seconds`;
  let botembed = new Discord.RichEmbed ()
  .setTitle("Bot information")
  .setColor("#FFFF00")
  .setThumbnail(bot.user.displayAvatarURL)
  .setFooter(bot.user.username, bot.user.displayAvatarURL)
  .setTimestamp()
  .addField("Bot name", bot.user.username)
  .addField("Bot owner", "<@" + ownerID + ">")
  .addField("Bot prefix", prefix)
  .addField("Bot API", "Slave Architecture V2, created by <@313350543835922432>")
  .addField("Bot version", "0.3.0")
  .addField("Bot account created on", bot.user.createdAt)
  .addField("Bot uptime", uptime);
  return msg.channel.send(botembed);
}
module.exports.help = {
  name: "botinfo"
}
