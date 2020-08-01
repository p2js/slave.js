const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/313724216123850752/553299844857593877/3M4Hqsu.png');
  msg.channel.send(attachment);
}
module.exports.help = {
  name: "mosque"
}
