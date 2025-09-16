const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let pingcommand = new Discord.RichEmbed()
        .setTitle('Pong!')
        .setColor("#3a785a")
        .addField('MS:', bot.ping, true)
        .setFooter("MCStat", bot.user.displayAvatarURL)

    message.channel.send(pingcommand)
}

module.exports.config = {
    name: "ping",
    aliases: []
}