const Discord = require("discord.js");
exports.run = async (client, msg, args) => {
  let user;
  if (msg.mentions.users.first()) {
    user = msg.mentions.users.first();
  } else if (args[0]) {
    user = msg.author;
  }
      if(!user) {
      return msg.channel.send("No user specified.")
  }
  avatar = user.displayAvatarURL({dynamic: true});
  const embed = new Discord.MessageEmbed()
  .setTitle(`${user.tag}'s avatar`)
  .setDescription(`[Avatar **${user.tag}**](${avatar})`)
  .setColor(0x1d1d1d)
  .setImage(avatar)
  .setFooter(`Requested by: ${msg.author.tag}`)
  
  return msg.channel.send(embed);
}

module.exports.help = {
  name:"avatar",
  usage: '!avatar <person | user >',
}