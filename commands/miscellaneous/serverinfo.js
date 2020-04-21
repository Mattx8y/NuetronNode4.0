const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix
const fetch = require("node-fetch");


module.exports = {
    config: {
        name: "serverinfo",
        aliases: [],
        noaliase: "No Aliases",
        usage: `${prefix}serverinfo`,
        description: "Gives the current server information.",
        accessableby: "Members"
    
},

run: async(bot, message, args) => {


    let sEmbed = new Discord.MessageEmbed()
    .setColor(colours.NuetronNode)
    .setTitle("Server Information")
    .addField("**Guilde Name:**", `${message.guild.name}`, true)
    .addField("**Guild Owner**", `${message.guild.owner}`, true)
    .addField("**Member Count**", `${message.guild.memberCount}`, true)
    .addField("**Role Count**", `${message.guild.roles.cache.size}`, true)
    .setTimestamp()
    .setFooter("Manned by SkippTekk#6969", bot.user.displayAvatarURL())
    .setThumbnail(message.guild.iconURL())
    message.channel.send({embed: sEmbed});
}  
}