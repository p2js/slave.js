const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
let xp = require("../xp.json");
let mentionedUser = msg.mentions.users.first()
if (!mentionedUser) {mentionedUser = msg.author}
if(!xp[mentionedUser.id]){
  xp[mentionedUser.id] = {
    xp: 0,
    level: 1
  };
}
const curxp = xp[mentionedUser.id].xp;
const curlvl = xp[mentionedUser.id].level;
const embedcoeff = curlvl * curlvl;
const nxtLvlXp = embedcoeff * 75
const nxtLevel = curlvl + 1
const difference = nxtLvlXp - curxp;
const lvlEmbed = new Discord.RichEmbed()
.setAuthor(mentionedUser.username)
.setColor("FFFF00")
.setThumbnail(mentionedUser.avatarURL)
.setFooter(bot.user.username, bot.user.displayAvatarURL)
.setTimestamp()
.addField("Level", curlvl, true)
.addField("XP", curxp, true)
.addField(`XP until level ${nxtLevel}`, difference)
msg.channel.send(lvlEmbed)
}
module.exports.help = {
  name: "xp"
}
