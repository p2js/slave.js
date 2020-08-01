const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
module.exports.run = async(bot, msg, args) => {
  if (msg.author.id !== botconfig.ownerID) {
    msg.channel.send("This command is for the bot owner only.");}
  else {
    let mentionedUser = msg.mentions.users.first()
    if (!mentionedUser) return msg.channel.send("You have to mention  a user!")
    let numberOfTimes = Number(args[1])
    if(!numberOfTimes) return msg.channel.send(`proper synthax: ${botconfig.prefix}spam @user [number] [message]`);
    for(i=0;i<numberOfTimes;i++) {
      mentionedUser.send(args.slice(2).join(" "))
    }
    msg.channel.send("succesfully spammed user.")
  }
}
module.exports.help = {
  name: "spam"
}
