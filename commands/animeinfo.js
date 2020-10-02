const Discord = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();
var aq = require('animequote');
const fetch = require("node-fetch")
exports.run = async (client, msg, args) => {
if (!args[0]) {
    return msg.channel.send("Incorrect format. Give the name of an anime.");
     
   }
       var search = msg.content.split(/\s+/g).slice(1).join(" ");
       kitsu.searchAnime(search).then(async result => {
           if (result.length === 0) {
               return message.channel.send(`No results for : **${search}**!`);
           }
         
         var anime = result[0]

           let embed = new Discord.MessageEmbed()
               .setColor('#FF2050')
               .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
               .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
               .addField('❯\u2000\Iformations', `•\u2000\**Name:** ${anime.titles.romaji}\n\•\u2000\**Age :** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
               .addField('❯\u2000\Stats', `•\u2000\**Rating:** ${anime.averageRating}\n\•\u2000\**Rank:** ${anime.ratingRank}\n\•\u2000\**Rank(popularity):** ${anime.popularityRank}`, true)
               .addField('❯\u2000\Status', `•\u2000\**Episods:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start:** ${anime.startDate}\n\•\u2000\**End:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
           
               .setThumbnail(anime.posterImage.original, 100, 200);
         

           return msg.channel.send({ embed })
       }).catch(err => {
           console.log(err) //cathing error
           return msg.channel.send(`No results for : **${search}**!`);
       });
   }
   module.exports.help = {
    name:"anime-info",
    usage:"anime info"
  }