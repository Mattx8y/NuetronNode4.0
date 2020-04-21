const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../botconfig.json")
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const { colours } = require("../../colours.json")



module.exports = {
    config: {
    name: "help",
    noaliase: "No Aliases",
    aliases: ["helpme"],
    usage: `${prefix}Help`,
    description: "List of commands for the Discord server",
    accessableby: "Members"
    },

run: async (bot, message, args ) => {

    const embed = new MessageEmbed()
    .setColor(colours.green)
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
    .setThumbnail(bot.user.displayAvatarURL)


    if(!args[0]) {
        const categories = readdirSync("./commands/")

        embed.setDescription(`These are the commands for ${message.guild.me.displayName}\n The bot prefix is **${prefix}**`)
        embed.setFooter(` ${message.guild.me.displayName} | Total commands: ${bot.commands.size}`, bot.user.displayAvatarURL());

        categories.forEach(category => {
            const dir = bot.commands.filter(c => c.config.category === category)
            const capitalise = category.slice(0,1).toUpperCase() + category.slice(1)

            try{
                embed.addField(`> ${capitalise} [${dir.size}]:`, dir.map(c => `\`\${c.config.name}\``)).join(" ")
            }catch(e){
                console.log(e)
            }
        })
        return message.channel.send(embed)

    } else {
        let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
        if(!command) return message.channel.send(embed.setTitle("Invalide Command.").setDescription(`Do \`${prefix}help\` for the list of commands.`))
        command = command.config

        embed.setDescription(stripIndents`The bot's prefix is \`${prefix}\`\n
        **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send(embed)
    }
}
}