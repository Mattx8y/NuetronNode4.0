const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) => {

    const Discord = require("discord.js");
    const botconfig = require("../../botconfig.json");
    const colours = require("../../colours.json");
    const superagent = require("superagent");
    const prefix = botconfig.prefix
    
    module.exports.run = async (bot, message, args) => {
    
        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

        let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        
        if(!kickMember) return message.channel.send("Please provide a user to kick!")

        let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"
    
        if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")
        
        kickMember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() => 
        kickMember.kick()).catch(err => console.log(err))
        
        message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete({timeout: 5000}))

    let embed = new Discord.MessageEmbed()
    .setColor(colours.red_dark)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "kick")
    .addField("Mutee:", kickMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    let sChannel = message.guild.channels.cache.get(`${botconfig.botlogs}`)
sChannel.send(embed)
    
    
    }
    
    
    module.exports.config = {
        name: "kick",
        aliases: ["k", "remove", "boot"],
        noaliase: "No Aliases",
        usage: `${prefix}kick`,
        description: "Kickss a user",
        accessableby: "Moderator"
    }


}


module.exports.config = {
    name: "kick",
    aliases: ["boot" , "k"],
    noaliase: "No Aliases",
    usage: `${prefix}boot`,
    description: "Bans a user",
    accessableby: "Moderator"
}