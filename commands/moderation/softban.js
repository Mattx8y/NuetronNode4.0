const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Permission denied.");

let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!banMember) return message.channel.send("I don't know who to ban... Gimme a name")

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason was given."

if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Pssst I don't have perms...Gimme")

message.delete()
banMember.send(`You have been softbanned from ${message.guild.name} for ${reason}`).then(() => {
    message.guild.members.ban(banMember, { days: botconfig.banlength, reason: reason}).then(() => message.guild.members.unban(banMember.id, { reason: "softban"})).catch(err => console.log(err))

    message.channel.send(`**${banMember.user.username}** has been softbanned, and ${botconfig.banlength} days of messages are gone!`)

    let embed = new Discord.MessageEmbed()
    .setColor(colours.red_dark)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Softbanned")
    .addField("Mutee:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    let sChannel = message.guild.channels.cache.get(`${botconfig.botlogs}`)
sChannel.send(embed)
})


}


module.exports.config = {
    name: "softban",
    aliases: ["sb", "sremove"],
    noaliase: "No Aliases",
    usage: `${prefix}softban`,
    description: "Softbans a user",
    accessableby: "Moderator"
}