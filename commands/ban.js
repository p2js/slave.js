const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
module.exports.run = async(bot, msg, args) => {
let mentionedUser = msg.mentions.members.first()
if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.channel.send("You do not have the Ban Members permission.");
if (!msg.guild.me.permissions.has("BAN_MEMBERS")) return msg.channel.send("I do not have the Ban Members permission.");
let banreason =  args.slice(1).join(" ");
if (!banreason) {
  banreason = "No reason provided."
}
if (mentionedUser) {
  const member = mentionedUser;
  if (member) {
    member.ban(banreason).then(() => {
      msg.reply(`Successfully banned <@${mentionedUser.id}>`);
    }).catch(err => {
      msg.reply('I was unable to ban the member');
      console.error(err);
    });
  } else {
    msg.reply('That user isn\'t in this guild!');
    return;
  }
} else {
  msg.reply('You didn\'t mention the user to ban!');
   return;
}
const banEmbed = new Discord.RichEmbed()
.setTitle("ban")
.setColor("#FFFF00")
.setFooter(bot.user.username, bot.user.displayAvatarURL)
.addField("banned member", `${mentionedUser} with ID ${mentionedUser.id}`)
.addField("banned by", `${msg.author} with ID ${msg.author.id}`)
.addField("reason", banreason)
.setTimestamp()
const channel = msg.guild.channels.find(c => c.name === "logs");
if (!channel) return msg.reply("Couldn't find #logs channel. User has still been banned.").then(m => m.delete(5000));
return channel.send(banEmbed);
}
module.exports.help = {
  name: "ban"
}
