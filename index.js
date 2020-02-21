//bot setup
console.log('starting up bot...\n')
const botconfig = require("./botconfig.json")
const Discord = require('discord.js');
const { RichEmbed, Role } = require("discord.js");
const fs = require ("fs");
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err)
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    console.log(`${f} loaded.`);
    bot.commands.set(props.help.name, props);
  })
})
let xp = require("./xp.json");
let prefix = botconfig.prefix
bot.on('ready', () => {
  bot.user.setActivity((prefix) + 'help');
  console.log('\nSlave is online!')
})
bot.on('message', async msg => {
//filter to prevent dm commands
  if (!msg.guild) return;
//filter to prevent other bots from activating commands
  if (msg.author.bot) return;
//xp system
  let xpAdd = Math.floor(Math.random() * 12) + 12;
  if (!xp[msg.author.id]) {
    xp[msg.author.id] = {
      xp: 0,
      level: 1
    };
  }
  let curxp = xp[msg.author.id].xp;
  let curlvl = xp[msg.author.id].level;
  let coeff = xp[msg.author.id].level * xp[msg.author.id].level
  let nxtLvl = coeff * 75
  xp[msg.author.id].xp = curxp + xpAdd;
  if(nxtLvl <= xp[msg.author.id].xp) {
    xp[msg.author.id].level = curlvl + 1;
    let lvluplvl = curlvl + 1
    msg.channel.send(`<@${msg.author.id}>, you just leveled up to level ${lvluplvl}!`).then(msg => {msg.delete(20000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if (err) console.log(err)
  });
//command handler
  if (!msg.content.startsWith(prefix)) return;
  let messageArray = msg.content.split(" ")
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const commandfile = bot.commands.get(cmd);
      if (commandfile){
          if(!msg.member) msg.member = await msg.guild.fetchMember(msg);
          commandfile.run(bot, msg, args);
      }
});
bot.login(botconfig.token)
