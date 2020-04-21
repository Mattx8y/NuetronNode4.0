const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("Permision denied.");

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have the perms to add roles!");

    let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!mutee) return message.channel.send("Please supply a user to be muted!");


let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given... Shame"


let muterole = message.guild.roles.cache.get(r => r.name == "Muted")
if(!muterole) return message.channel.send("There is no mute role to remove.")


mutee.roles.remove(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hello, your mute has been removed. Hope you learned your lesson.`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} had there mute role taken away.`)
})


let embed = new Discord.MessageEmbed()
.setColor(colours.green_light)
.setAuthor(`#{message.guild.name} Modelogs`, message.guild.icondURL())
.addField("Moderation:", "unmute")
.addField("Mutee:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("Reason:", reason)
.addField("Date:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.cache.get(`${botconfig.botlogs}`)
sChannel.send(embed)



}


module.exports.config = {
    name: "unmute",
    aliases: [],
    noaliase: "No Aliases",
    usage: `${prefix}unmute`,
    description: "Umutes a person",
    accessableby: "Moderator"
}