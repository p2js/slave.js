const Discord = require("discord.js")
const fs = require("fs")
const botconfig = require("../botconfig.json")
module.exports.run = async(bot, msg, args) => {
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))
  let mentionedUser = msg.mentions.users.first()
  if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.reply ("This command is for moderators only. (mods are identified via ban permission)")
  if(!mentionedUser) return msg.reply("Couldn't find user.");
  const server = warns[msg.guild.id] || {};
  if (server[mentionedUser.id] === undefined)
   server[mentionedUser.id] = { warns: 0 };
  ++server[mentionedUser.id].warns;
  warns[msg.guild.id] = server
  let reason = args.slice(1).join(" ");
  if (!reason) {
    reason = "No reason provided."
  }
  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
  if (err) console.log(err);
  });
  const warnEmbed = new Discord.RichEmbed()
  .setTitle("Warns")
  .setColor("#FFFF00")
  .setFooter(bot.user.username, bot.user.displayAvatarURL)
  .setTimestamp()
  .addField("Warned User", `<@${mentionedUser.id}>`)
  .addField("Warned by", `${msg.author}`)
  .addField("Warned In", msg.channel)
  .addField("Number of warnings so far", warns[msg.guild.id][mentionedUser.id].warns)
  .addField("Reason", reason);
  const channel = msg.guild.channels.find(c => c.name === "logs");
  if (!channel) return msg.reply("Couldn't find \"#logs\" channel. User has still been warned, but it has not been logged.")
  msg.channel.send(`<@${mentionedUser.id}> has been warned.`)
  return channel.send(warnEmbed);
  if(warns[mentionedUser.id].warns == 20) {
      msg.guild.member(mentionedUser).kick("Autokick for 20th warn")
      msg.channel.send("User has been AutoKicked for 20th warn.")
      const warnKickEmbed = new Discord.RichEmbed()
      .setTitle("kick")
      .setColor("#FFFF00")
      .setFooter(bot.user.username, bot.user.displayAvatarURL)
      .addField("kicked member", `${mentionedUser} with ID ${mentionedUser.id}`)
      .addField("kicked by", `${msg.author} with ID ${msg.author.id}`)
      .addField("Reason", "Autokick for 20th warn")
      .setTimestamp()
      const channel = msg.guild.channels.find(c => c.name === "logs");
      channel.send(warnKickEmbed)
  }
}
module.exports.help = {
  name: "warn"
}
