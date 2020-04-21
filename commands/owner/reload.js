const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const botowner = botconfig.botowner

module.exports.run = async (bot, message, args) => {


    if(message.author.id !=`${botowner}`) return message.channel.send("You don't code me... Go away. Stop touching me.")

    if(!args[0]) return message.channel.send("Please give me a command to reload")


    let commandName = args[0].toLowerCase()
    try{
        delete require.cache[require.resolve(`./${commandName}.js`)]
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    }catch(e){
        return message.channel.send(`Could not reload \`${args[0].toUpperCase()}\``)
    
    }
    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reload.`)
}


module.exports.config = {
    name: "reload",
    aliases: ["r"],
    noaliase: "No Aliases",
    usage: `${prefix}reload`,
    description: "Reloads commands. Bot owner can only do this.",
    accessableby: "Bot Owner"
}