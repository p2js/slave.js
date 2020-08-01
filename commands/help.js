const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const botInvLink = botconfig.invLink
const prefix = botconfig.prefix
module.exports.run = async(bot, msg, args) => {
  const helpEmbed = new Discord.RichEmbed ()
  .setColor("#FFFF00")
  .setFooter(bot.user.username, bot.user.displayAvatarURL)
  .setTimestamp()
  .setTitle("Bot commands")
  .setDescription(`**General Commands**\n${prefix}help\n${prefix}crepls\n${prefix}avatar | Usage: ${prefix}avatar [@user]\n${prefix}coinflip\n${prefix}random | Usage: ${prefix}random [max#]\n${prefix}say | Usage: ${prefix}say [text]\n${prefix}ping\n${prefix}botinfo\n${prefix}guildinfo\n${prefix}xp | usage: ${prefix}xp [@user]\n\n**Moderation Commands**\n${prefix}report | Usage: ${prefix}report[@user][reason] | Requires #logs\n${prefix}warn | Usage: ${prefix}warn[@user][reason]\n${prefix}warnings | Usage: ${prefix}warnings[@user]\n${prefix}mute | Usage: ${prefix}mute [@user] [time]\n${prefix}kick | Usage: ${prefix}kick [@user]\n${prefix}ban | Usage: ${prefix}ban [@user]\n${prefix}purge | Usage: ${prefix}purge[delete#]\n\n**Useful links**\nAdd Slave to your server: [Click here](${botInvLink})\nJoin the Slave Hub: [Click here](https://discord.gg/rbuxGtG)`)
  msg.channel.send(helpEmbed)
}
module.exports.help = {
  name: "help"
}
