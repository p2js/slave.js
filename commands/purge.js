const Discord = require("discord.js")
module.exports.run = async(bot, msg, args) => {
  if (!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.channel.send('You do not have the Manage Messages permission.');
  if (!msg.guild.me.permissions.has("MANAGE_MESSAGES")) return msg.channel.send("I do not have the Manage Messages permission.");
  let deleteCount =Number(args[0]);
  msg.delete()
  if (isNaN(deleteCount)) return msg.channel.send("What you provided is not a number.");
  deleteCount++;
  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
  return msg.reply("Please provide a number between 2 and 100 for the number of messages to delete");
  const fetched = await msg.channel.fetchMessages({limit: deleteCount});
  msg.channel.bulkDelete(fetched)
  .catch(error => msg.reply(`Couldn't delete messages because of error: ${error}`));
  msg.channel.send(`Purged ${deleteCount - 1} messages.`).then(m => m.delete(5000));
}
module.exports.help = {
  name: "purge"
}
