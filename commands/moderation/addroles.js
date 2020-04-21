const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) => {



    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("Denied.")

    let rMemmber = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.memmbers.get(args[0])
    if(!memmber) return message.channel.send("I don't know what user your talking about.")

    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!roles) return message.channel.send("What role goes to this person.")

    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send("Give it a reason.")

        if(!message.roles.has(role.id)) {
    if(rMemmber.roles.has(role.id))
            return message.channel.send(`${rMemmber.displayName}, already has the role.`)
    } else{
            rMemmber.role.add(role.id).catch(e => console.log(e.message))
            message.channel.send(`The role ${role.name}, has been added to ${rMemmber.displayName}.`)
    }

    let embed = new Discord.MessageEmbed()
    .setColor(colours.green_light)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Addrole")
    .addField("Mutee:", rMemmber.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    let sChannel = message.guild.channels.cache.get(`${botconfig.botlogs}`)
sChannel.send(embed)
}


module.exports.config = {
    name: "addrole",
    aliases: [],
    noaliase: "No Aliases",
    usage: `${prefix}addrole`,
    description: "Adds a role to a user.",
    accessableby: "Moderator"
}