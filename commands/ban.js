const Discord = require('discord.js');
  const { log } = require('mathjs');
  const db = require('quick.db')
  exports.run = async (client, msg, args) => {
        if(!msg.member.hasPermission("BAN_MEMBERS","ADMINISTRATOR")) {
      return msg.channel.send(`**${msg.author.tag} you dont have enough perms**. Permission required: \`BAN_MEMBERS\` or \`ADMINISTRATOR\` `)
    }
    if(!msg.guild.me.hasPermission("KICK_MEMBERS")) {
      return msg.channel.send(`I dont have enough perms to do that!`)
    }
      let userArray = msg.content.split(" ")
      let userArgs = userArray.slice(1)
      let target = msg.mentions.members.first() || msg.guild.members.cache.get(userArgs[0]) || msg.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]);
    if(!target) {
      return msg.channel.send("```Correct format: ban <member> <reason>```")
    }
    if(target.id === msg.author.id) {
      return msg.channel.send(`**${msg.author.username}**, you cant ban yourself.`)
     }
    if(target.id === `${msg.guild.owner}`) {
      return msg.channel.send(`**${msg.author.username}**,you can't ban the owner of the server!.`)
    }
  
     let Reason = msg.content.slice( 20 + 7 || null);
     if (Reason == null) {
       return msg.channel.send(
           "**No reson provided**"
         );
       }
      target.ban().then((target) => {
    let embed = new Discord.MessageEmbed()
    .setTitle(`${target} was banned`)
    .setDescription(`Banned account id:(${target.id})\nReason:"${Reason.slice(1)}""\nDate:${new Intl.DateTimeFormat("en-US").format(Date.now())}`)
    .setColor('RED')
    .setTimestamp()
    msg.channel.send(embed)
    let chx = db.get(`modlog_${msg.guild.id}`, channel.id)
    
    if(chx === null) {
      return;
    }
  
    let embed1 = new Discord.MessageEmbed()
    .setAuthor(`${msg.author.tag} - ${msg.author.id}`, msg.author.displayAvatarURL({size: 4096, dynamic: true}))
    .setTitle(`Logs ${msg.guild.name}`)
    .setDescription(`${target}was banned.\nMore Informations:\n\nBanned account id:(${target.id})\nReason:"${Reason.slice(1)}""\nDate:${new Intl.DateTimeFormat("en-US").format(Date.now())}`)
    .setColor("#478800")
    .setTimestamp()
    bot.channels.cache.get(chx).send(embed1)
  
})
}
  module.exports.help = {
    name:"ban",
    usage: '!ban <user || userid || username>',
  }