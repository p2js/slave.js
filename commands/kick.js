const Discord = require("discord.js")
const botconfig = require("../botconfig")
module.exports.run = async(bot, msg, args) => {
  let mentionedUser = msg.mentions.members.first()
  if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.channel.send("You do not have the Kick Members permission.");
  if (!msg.guild.me.permissions.has("KICK_MEMBERS")) return msg.channel.send("I do not have the Kick Members permission.");
  console.log(args[0])
  let kickreason = args.slice(1).join(" ");
  if (!kickreason) {
    kickreason = "No reason provided."
  }
  if (mentionedUser) {
    const member = mentionedUser
    if (member) {
      member.kick(kickreason).then(() => {
        msg.reply(`Successfully kicked <@${mentionedUser.id}>`);
      }).catch(err => {
        msg.reply('I was unable to kick the member');
        console.error(err);
      });
    } else {
      msg.reply('That user isn\'t in this guild!');
    }
  } else {
    msg.reply('You didn\'t mention the user to kick!');
  }
  const kickEmbed = new Discord.RichEmbed()
  .setTitle("kick")
  .setColor("#FFFF00")
  .setFooter(bot.user.username, bot.user.displayAvatarURL)
  .addField("kicked member", `${mentionedUser} with ID ${mentionedUser.id}`)
  .addField("kicked by", `${msg.author} with ID ${msg.author.id}`)
  .addField("Reason", kickreason)
  .setTimestamp()
  const channel = msg.guild.channels.find(c => c.name === "logs");
  if (!channel) return msg.reply("Couldn't find #logs channel. User has still been kicked.").then(m => m.delete(5000));
  return channel.send(kickEmbed);
}
module.exports.help = {
  name: "kick"
}
