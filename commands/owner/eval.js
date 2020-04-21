const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const { inspect } = require("util");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) => {
    if(message.author.id == `${botconfig.botowner}`) {
        let toEval = args.join(" ");
        let evaluated = inspect(eval(toEval, { depth: 0 } ))
        try {
            if(toEval) {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart)
                return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
                
            } else {
                message.channel.send("Error whilst evaluating: `cannot evaluated air`")
            }
        } catch(e) {
            message.channel.send(`Error whilst evaluating: \`${e.message}\``)
        }
    } else {
        return message.reply(" you dont have permission to use this command.").then(m => m.delete(10000))
    }

}


module.exports.config = {
    name: "eval",
    aliases: [],
    noaliase: "No Aliases",
    usage: `${prefix}eval`,
    description: "",
    accessableby: "Bot Owner"
}