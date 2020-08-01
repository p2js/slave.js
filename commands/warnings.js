const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async(bot, msg, args) => {
  let mentionedUser = msg.mentions.users.first()
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))
	   if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.reply ("This command is for moderators only. (mods are identified via ban permission)")
     if(!mentionedUser) return msg.reply("Couldn't find user.");
     const server = warns[msg.guild.id] || {};
     if (server[mentionedUser.id] === undefined)
      server[mentionedUser.id] = { warns: 0 };
		 const warnlevel = warns[msg.guild.id][mentionedUser.id].warns;
		 msg.reply(`<@${mentionedUser.id}> has ${warnlevel} warnings.`)
	   return;
   }
module.exports.help = {
  name: "warnings"
}
