const Discord = require('discord.js');
const ms = require('ms');
exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission("MANAGE_MESSAGES","ADMINISTRATOR")) return msg.channel.send(`**${msg.author.tag} you dont have enough perms**. Permission required: \`MANAGE_MESSAGES\` or \`ADMINISTRATOR\` `);

        let channel = msg.mentions.channels.first();

        if (!channel) return msg.channel.send('Correct format : **giveaway-fast <channel> <time> <winner(s)> <prize>**');

        let giveawayDuration = args[1];

        if (!giveawayDuration || isNaN(ms(giveawayDuration))) return msg.channel.send('Correct format : **giveaway-fast <channel> <time> <winner(s)> <prize>**');

        let giveawayWinners = args[2];

        if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return msg.channel.send('Correct format : **giveaway-fast <channel> <time> <winner(s)> <prize>**');

        let giveawayPrize = args.slice(3).join(" ");

        if (!giveawayPrize) return msg.channel.send('Sorry but i can\'t giveaway air. Put a prize!');

        bot.giveawaysManager.start(channel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinners,

            msgs: {
                giveaway: (bot.config.everyoneMention ? "@everyone\n\n" : "") + "🎉 GIVEAWAY 🎉",
                giveawayEned: (bot.config.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY ENDED",
                timeRemaining: "Time remaining: **{duration}**",
                inviteToParticipate: "React with 🎉 to enter ",
                winmsg: "Congratulations {winners}, you won **{prize}**",
                embedFooter: "Giveaway!",
                noWinner: "Look's like nobody wanted a giveaway :(  No winners.... ",
                hostedBy: `Hosted by ${msg.author.tag}`,
                winners: "winner(s)",
                endedAt: "Ends at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        })

        msg.channel.send(`${msg.author.tag}, you started giveaway on ${channel} with succes. `);
}
module.exports.help = {
    name:"giveaway-fast",
    usage: 'Giveaway yohooo.',
    group: "misc"
  }

