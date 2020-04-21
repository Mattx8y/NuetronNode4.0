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
if(!muterole) {
    try{
        muterole = await message.guild.roles.create({
            data: {
                name: "Muted",
                color: "#514f48",
                permissions: [],
            },
            reason: "`${reason}`",
        });

    message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.overwritePermissions([{
            id: muterole,
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false
        },
    ], "Gotta change permissions, one sec.")
    });
    } catch(e) {
        console.log(e.stack);
    }
};



mutee.roles.add(muterole.id).then(() =>{
    message.delete()
    message.send(`Hello, you have been in ${message.guild.name} for ${reason}`)
    message.channel.send(`${mutee.user.username} was given the Mute role.`)
});


let embed = new Discord.MessageEmbed()
.setColor(colours.red_dark)
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
.addField("Moderation:", "mute")
.addField("Mutee:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("Reason:", reason)
.addField("Date:", message.createdAt.toLocaleString())


let sChannel = message.guild.channels.cache.get(`${botconfig.botlogs}`)
sChannel.send(embed)

}


module.exports.config = {
    name: "mute",
    aliases: [],
    noaliase: "No Aliases",
    usage: `${prefix}mute`,
    description: "",
    accessableby: "Moderator"
}