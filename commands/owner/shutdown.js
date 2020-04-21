const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const botowner = botconfig.botowner

module.exports.run = async (bot, message, args) => {

    if(message.author.id !=`${botowner}`) return message.channel.send("You don't code me... Go away. Stop touching me.")
    try{
        await message.channel.send("Powering down....")
    process.exit()
    }catch(e){
        message.channel.send(`ERROR: ${e.message}`)
    }
}


module.exports.config = {
    name: "shutdown",
    aliases: [],
    noaliase: "No Aliases",
    usage: `${prefix}shutdown`,
    description: "Shuts down the bot. Only Bot owner can.",
    accessableby: "Bot Owner"
}