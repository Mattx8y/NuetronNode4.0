const { prefix } = require("../botconfig.json")
module.exports = (bot) => {
    let prompt = process.openStdin()
    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
            bot.channels.get(`${botconfig.botchatter}`).send(x.join(" "));
        });
    }