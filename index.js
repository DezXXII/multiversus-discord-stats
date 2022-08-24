// Discord client
const Discord = require("discord.js");
const dotenv = require('dotenv').config();
const bot = new Discord.Client();

// Para los comandos
const command = require('./commands');

// Multiversus API
// Token
// tttVhEVHWFIMa23VCEJXFZHDPewZ8Fdazmqo1mLBaOom7JsEhKNL8+EVVg5y0H9MRRt4ZGGo7C6QZ/i5mWIGRkOpzsk9pVW574n/woI3cteXukrGaCqqkG0/erd755oY3BX+OLHxh9E4WTP4qoPIKGqEa8BzzdjMV3iQTHGLpYdbjBZbivCMDg==
const { Client } = require('multiversus.js');
const client = new Client({accessToken: 'tttVhEVHWFIMa23VCEJXFZHDPewZ8Fdazmqo1mLBaOom7JsEhKNL8+EVVg5y0H9MRRt4ZGGo7C4sq6untNr5rkOpzsk9pVW574n/woI3cteXukrGaCqqkG0/erd755oY3BX+OLHxh9E4WTP4qoPIKGqEa8BzzdjMV3iQTHGLpYdbjBZbivCMDg=='});

// Starting the bot
bot.login(process.env.TOKEN)
bot.on("ready", () => {
    console.log('Multiversus bot working!')
});


bot.on('message', async message => {
    if(message.content.startsWith(",")) {
        let slicedMessage = message.content.substring(1);
        const userId = await client.profiles.search(slicedMessage);
        const accountId = await userId.results[0].result.account_id;
        const userProfile = await client.profiles.fetch(accountId);
        const user2v2Wins = userProfile["2v2"].win;
        const user1v1Wins = userProfile["1v1"].win;
        const userTotalMatches = userProfile.server_data.matches_played;
        const userTotalWins = userProfile.server_data.stat_trackers.TotalWins;

        const profileEmbed = new Discord.MessageEmbed()
        .setColor(0x6b0505)
        .setTitle('Welcome!')
        .setDescription(`These are your stats ${slicedMessage}`)
        .addFields(
            { name: "Total matches", value: userTotalMatches, inline: true},
            { name: "Total wins", value: userTotalWins, inline: true }
        )
        .addFields(
            { name: '1v1 wins', value: user1v1Wins, inline: true},
            { name: '2v2 wins', value: user2v2Wins },
        )
    
        message.channel.send(profileEmbed);
            console.log(userProfile);
    } else if(message.content.startsWith("++++{}")){
        message.channel.send("That account doesn't exist");
    }
})

