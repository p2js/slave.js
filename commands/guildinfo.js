const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  const serverembed = new Discord.RichEmbed()
  .setTitle("Server Information")
  .setColor("#FFFF00")
  .setThumbnail(msg.guild.iconURL)
  .setFooter(bot.user.username, bot.user.displayAvatarURL)
  .setTimestamp()
  .addField("Server name", msg.guild.name,)
  .addField("Total Members", msg.guild.memberCount, true)
  .addField("Online Members", msg.guild.members.filter(m => m.presence && m.presence.status == "online").size, true)
  .addField("Created On", msg.guild.createdAt)
  .addField("Server Owner", `<@${msg.guild.owner.id}>`)
  .addField("Roles", msg.guild.roles.size, true)
  .addField("Text Channels", msg.guild.channels.filter(c => c.type == "text"), true)
  return msg.channel.send(serverembed)
}
module.exports.help = {
  name: "guildinfo"
}
