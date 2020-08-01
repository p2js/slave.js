const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
module.exports.run = async(bot, msg, args) => {
  if (msg.author.id !== botconfig.ownerID) {
    msg.channel.send("This command is for the bot owner only.");}
  else {
    await bot.user.setStatus('invisible')
    await console.log ("shutting down...");
    await msg.channel.send("Shutting down...")
    .then(msg => process.exit());
  }
}
module.exports.help = {
  name: "shutdown"
}
