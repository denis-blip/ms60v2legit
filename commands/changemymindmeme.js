const Discord = require('discord.js');
module.exports.run = async (client, msg, args) => {
        if(!args[0]) return msg.channel.send('correct format: ?meme-2 <text>');
        const name = args.join(' ')
        const regex = !/[^a-zA-Z0-9]+/g.test(name)
        if(!regex) return msg.channel.send('Fara spatiu si alte simboluri.')
        const embed = new Discord.MessageEmbed()
        .setTitle(`Change my mind meme`)
        .setImage(`https://vacefron.nl/api/changemymind?text=${name}`)
        .setColor('RANDOM')
        .setFooter(`Requested by ${msg.author.tag}`)
        msg.channel.send(embed)
}
exports.help = {
	name:"changemymind",
	usage: "changemymind <meme>",
	group: "misc"
}