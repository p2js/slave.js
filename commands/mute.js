const Discord = require("discord.js")
const ms = require("ms")
const {Role} = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  let mentionedUser = msg.mentions.members.first()
  if (!mentionedUser) return msg.reply("Couldn't find user.").then(m => m.delete(5000));
  let role = msg.guild.roles.find(r => r.name === "muted");
  if (!role) {
    try {
      role = await msg.guild.createRole({
        name: "muted",
        color: "#000000"
      })
      await Promise.all(msg.guild.channels.map(chan => chan.overwritePermissions(role, {
        SEND_MESSAGES: false
      })))
     } catch(_) {
       return msg.reply("Couldn't find \"muted\" role, please create it.").then(m => m.delete(5000));
     }
  }
  const time = args[1] || "30m";
  await mentionedUser.addRole(role);
  msg.reply(`${mentionedUser} has been muted for ${time}`);
  setTimeout(() => {
  mentionedUser.removeRole(role);
  msg.channel.send(`${mentionedUser} has been unmuted.`)
  }, ms(time));
  const embed = new RichEmbed()
  .setTitle("Mute")
  .setColor("#FFFF00")
  .setFooter(bot.user.username, bot.user.displayAvatarURL)
  .addField("Muted member", `${mentionedUser} with ID ${mentionedUser.id}`)
  .addField("Muted by", `${msg.author} with ID ${msg.author.id}`)
  .addField("Time", time)
  .setTimestamp()
  const channel = msg.guild.channels.find(c => c.name === "logs");
  if (!channel) return msg.reply("Couldn't find #logs channel. User has still been muted.").then(m => m.delete(5000));
  return channel.send(embed);
}
module.exports.help = {
  name: "mute"
}
