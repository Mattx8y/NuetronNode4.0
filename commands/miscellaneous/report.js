const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const fetch = require("node-fetch");

module.exports = {
    config:{
    name: "report",
    aliases: [],
    noaliase: "No Aliases",
    usage: `${prefix}report`,
    description: "Reports a person to the staff directly.",
    accessableby: "Members"
},

run: async (bot, message, args) => {
    
    message.delete()
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!target) return message.channel.send("Please give a username. Otherwise it won't work").then(m => m.delete({timeout: 15000}))


    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send(`Please provide a reason for reporting **${target.username.tag}**`).then(m => m.delete({timeout: 15000}))


    let sChannel = message.guild.channels.cache.get(`${botconfig.reportlogs}`)

    message.channel.send("Your report has been submited. Thanks!").then(m => m.delete({timeout: 15000}))
    sChannel.send(`**${message.author.tag}** has reported ${target.user.tag} for **${reason}**`).then(async msg => {
        await msg.react("✅")
        await msg.react("❌")
    })
    


}

}