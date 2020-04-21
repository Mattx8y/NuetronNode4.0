const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = botconfig.prefix
const fetch = require("node-fetch");

module.exports = {
    config:{
    name: "ping",
    aliases: ["latency"],
    noaliase: "No Aliases",
    usage: `${prefix}ping`,
    description: "Pings the server's time from where it's hosted.",
    accessableby: "Members"
},
run: async (bot, message, args) => {

    message.channel.send("Pinging...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = ["Is this really my ping", "Is it okay? I cant look", "I hope it isnt bad"]
        let response = choices[Math.floor(Math.random() * choices.length)]

        m.edit(`${response}: Bot Latency: \`${ping}\`ms, API Latency: \`${Math.round(bot.ping)}\`ms`)
    })

}
}