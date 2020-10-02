const Discord = require("discord.js")
const db = require('quick.db')
exports.run = async (client, msg, args) => {
let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle("AUTO SETUP FOR ALT ACCOUTNS")
  .setDescription(`${msg.author.tag} this setup will prevent alt account's to join your server.`)
  .setTimestamp()
  .setFooter("Bot Made By Denis </>#3914");
  
  let xd = await msg.channel.send(embed)
  xd.react("✅")
  xd.react("❌")

const filter = (reaction, user) => {
    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === msg.author.id;
};

xd.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(async collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '✅') {
            let channel = client.channels.cache.find(x => x.name === "alt-logging")
  if (channel) {
    channel.delete().catch(console.log)
  }
  await msg.guild.channels.create('alt-logging', {
    type: 'text',
    permissionsOverwrites: [{
    id: msg.guild.id,
    deny: ['SEND_MESSAGES'],
    allow: ['VIEW_CHANNEL']
    }]
  })
let role = msg.guild.roles.cache.find(role => role.name === "alt-notify")
if (role) {
  role.delete().catch(console.log)
} 
  await msg.guild.roles.create({
    data: {
      name: 'alt-notify',
      color: 'RANDOM',
    }
    }) 

    let LoggingChannel = client.channels.cache.find(x => x.name === "alt-logging")
  await db.delete(`LoggingChannel_${msg.guild.id}`)         
  await db.set(`LoggingChannel_${msg.guild.id}`, LoggingChannel.id)

  let notifyRole = msg.guild.roles.cache.find(role => role.name === "alt-notify")
   await db.delete(`notifyRole_${msg.guild.id}`) 
   await db.set(`notifyRole_${msg.guild.id}`, notifyRole)

  let AutoSetupEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**__DOING AUTOSETUP__** \n **Please Wait For While ....**`)
  .setFooter("Bot Made By Denis </>#3914");

  let AutoSetupDoneEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**__AUTO SETUP DONE__** \n **Now Alt Logging Channel is ${LoggingChannel} \n And Alt Notify Role is ${notifyRole}**`)
  
  msg = await
  msg.channel.send(AutoSetupEmbed)
  setTimeout(() => {
    msg.edit(AutoSetupDoneEmbed);
    }, 1000);
} else {
    msg.reply('Alright ! Process Has Been Cancelled');
  } 
})
.catch(collected => {
if(xd.reactions.cache.size !== null) return
  else msg.reply(`Time Up ! You Didn't Reacted`);
    })
}
module.exports.help = {
    name:"alt-autosetup",
    usage:"<prefix>alt-autosetup"
  }