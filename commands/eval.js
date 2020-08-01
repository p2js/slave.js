const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const ownerID = botconfig.ownerID
const prefix = botconfig.prefix
function clean(text) {
     if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
     else
     return text;
   }
module.exports.run = async(bot, msg, args) => {
  let messageArray = msg.content.split(" ")
  let cmd = messageArray[0]
  if (msg.author.id !== ownerID) {
    msg.channel.send("This command is for the bot owner only.");}
  else
  try {
    const code = msg.content.slice(cmd.length)
    let evaled = eval(code);
    if (typeof evaled !== "string")
    evaled = require("util").inspect(evaled);
    msg.channel.send(clean(evaled), {code:"x1"});
    console.log(evaled)
  } catch (err) {
    msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
}
module.exports.help = {
  name: "eval"
}
