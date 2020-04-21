const botconfig = require("../../botconfig.json");
const prefix = botconfig.prefix

module.exports = async bot => {
    console.log(`${bot.user.username} is online and in ${bot.guilds.cache.size} server`)
   // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

   let statuses = [
        `${bot.guilds.cache.size} servers!`,
        `${prefix}help`,
        `Server Has ${bot.users.cache.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 3000)

}