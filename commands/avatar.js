const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  let mentionedUser = msg.mentions.users.first()
  if (!mentionedUser) mentionedUser = msg.author
  msg.reply(mentionedUser.avatarURL);
}
module.exports.help = {
  name: "avatar"
}
