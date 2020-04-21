const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) => {


     if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Permission denied.")

     let bannedMember = await bot.user.fetch(args[0])
        if(!bannedMember) return message.channel.send("I need to know who your trying to unban.")

        
    let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason was given."

        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channe.send("I don't have the perms to do this.")
    message.delete()
    try{
        message.guild.members.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} has been unbanned from ${message.guild.name}`)
    }catch(e){
        console.log(e.message)
    }

    let embed = new Discord.MessageEmbed()
    .setColor(colours.red_dark)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "unban")
    .addField("Moderated on:", `${bannedMember.username} (${bannedMember.id})`)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    let sChannel = message.guild.channels.cache.get(`${botconfig.botlogs}`)
sChannel.send(embed)

}


module.exports.config = {
    name: "unban",
    aliases: [],
    noaliase: "No Aliases",
    usage: `${prefix}unban`,
    description: `Unbans a user from this discord.`,
    accessableby: "Moderator"
}