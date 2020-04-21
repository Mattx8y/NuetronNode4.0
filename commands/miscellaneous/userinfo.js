const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix
const fetch = require("node-fetch");


module.exports ={
  config: {
    name: "userinfo",
    aliases: ["ui"],
    noaliase: "No Aliases",
    usage: `${prefix}userinfo`,
    description: "Gives the user that runs the command there info.",
    accessableby: "Members"
  
},

run: async (bot, message, args ) => {

    let sEmbed = new Discord.MessageEmbed()
      .setColor(colours.NuetronNode)
      .setTitle("User Information")
      .addField("**Username:**", `${message.author.username}`, true)
      .addField("**ID number:**", `#${message.author.discriminator}`, true)
      .addField("**User ID for the nerds**", `${message.author.id}`, true)
      .addField("**Created on:**", `${message.author.createdAt}`, true)
      .addField("**Status**", `${message.author.presence.status}`, true)
      .setTimestamp()
      .setFooter("Manned by SkippTekk#6969", message.guild.iconURL())
      .setThumbnail(message.guild.iconURL())
      message.channel.send({embed: sEmbed});
  }
}