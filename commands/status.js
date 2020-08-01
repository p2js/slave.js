const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
module.exports.run = async(bot, msg, args) => {
  if (msg.author.id !== botconfig.ownerID) {
    msg.channel.send("This command is for the bot owner only.");}
  else {
    let status;
    switch (args[0]) {
      case "online":
        bot.user.setStatus('online');
        status = args.slice(1).join(" ");
        if(status) bot.user.setActivity(status);
        break;
      case "idle":
        bot.user.setStatus('idle');
        status = args.slice(1).join(" ");
        if(status) bot.user.setActivity(status);
        break;
      case "dnd":
        bot.user.setStatus('dnd');
        status = args.slice(1).join(" ");
        if(status) bot.user.setActivity(status);
        break;
      case "invisible":
        bot.user.setStatus('invisible');
        status = args.slice(1).join(" ");
        if(status) bot.user.setActivity(status);
        break;
      default:
        status = args.join(" ");
        if(status) bot.user.setActivity(status);
    }
  }
}
module.exports.help = {
  name: "status"
}
