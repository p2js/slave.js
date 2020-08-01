const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  let mentionedUser = msg.mentions.users.first()
  if (!mentionedUser && msg.mentions.users.size) member = await msg.guild.fetchMember(msg.mentions.users.first());
   if (!mentionedUser) return msg.channel.send("Couldn't find user.").then(m => m.delete(5000));
   if (mentionedUser.id === msg.author.id) return msg.reply("You can't report yourself.").then(m => m.delete(5000));
   const reportreason = args.slice(1).join(" ") || "none";
   msg.channel.send("User reported.")
   const reportEmbed = new Discord.RichEmbed()
   .setTitle("Report")
   .setColor("#FFFF00")
   .setFooter(bot.user.username, bot.user.displayAvatarURL)
   .setTimestamp()
   .addField("Reported User", `${mentionedUser} with ID: ${mentionedUser.id}`)
   .addField("Reported By", `${msg.author} with ID: ${msg.author.id}`)
   .addField("In channel", msg.channel)
   .addField("Reason", reportreason)
   const channel = msg.guild.channels.find(c => c.name == "logs");
   if (!channel) return msg.reply("Couldn't find logs channel. Report has not been filed.").then(m => m.delete(5000));
   channel.send(reportEmbed);
   msg.delete();
}
module.exports.help = {
  name: "report"
}
