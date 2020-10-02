const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');
module.exports.run = async (client, msg) => {
  //args
  const args = msg.content.split(" ").slice(1);

  if (args[0].toLowerCase() === "logchannel") {
    args.shift();

    let LoggingChannel = msg.mentions.channels.first();

    if (!LoggingChannel)
      return msg.channel.send(`**PLEASE MENTION A VALID CHANNEL**`);

    var guildicon = msg.guild.iconURL();

    const succes = new Discord.msgEmbed()
      .setTitle(`Alt Logging Channel has been Setted!`)
      .setThumbnail(guildicon)
      .setFooter("Bot Made By Denis </>#3914");
    msg.channel.send(succes);

    db.delete(`LoggingChannel_${msg.guild.id}`);

    db.set(`LoggingChannel_${msg.guild.id}`, LoggingChannel.id);

    let embed2 = new Discord.msgEmbed()
      .setTitle(`:white_check_mark: Everything Ready!`)

    msg.channel.send(embed2);
  } else if (args[0].toLowerCase() === "notifyrole") {
    args.shift();

    let notifyRole = msg.mentions.roles.first();

    if (!notifyRole)
      return msg.channel.send(`**PLEASE MENTION A VALID ROLE**`);

    var guildicon = msg.guild.iconURL();

    const succes = new Discord.msgEmbed()
      .setTitle(`Alt Notify Role has been Setted!`)
      .setDescription(`New Role is ${notifyRole}`)
      .setThumbnail(guildicon)
      .setFooter("Bot Made By Denis </>#3914");

    msg.guild.roles.cache.get(notifyRole);
    msg.channel.send(succes);

    db.delete(`notifyRole_${msg.guild.id}`);

    db.set(`notifyRole_${msg.guild.id}`, notifyRole);

    let embed = new Discord.msgEmbed()
      .setTitle(`:white_check_mark: Everything Ready!`)
      .setFooter("Bot Made By Denis </>#3914");

    msg.channel.send(embed);
  }else msg.channel.send("Unknown config variable...")
};

module.exports.help = {
    name:"altsetup",
    usage:"altsetup"
  }