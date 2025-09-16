const Discord = require("discord.js")
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    let helpcommand = new Discord.RichEmbed()
        .setTitle("MCStat Commands")
        .setColor("#3a785a")
        .addField('h!help - Help Commands', 'h!ping - Ping, Pong?')
        .addField('h!queue2b2t - Find out queue on 2b2t', "h!hypixel - Find out Hypixel Stats | Usage: h!hypixel <username>")
        .addField('h!minecraft - Find out about an account | Usage: h!minecraft <username>', "h!hypixelheads - Find stats about the heads a user owns | Usage h!hypixelheads <username>")
        .setFooter("MCStat", bot.user.displayAvatarURL)

    message.channel.send(helpcommand)
}

module.exports.config = {
    name: "help",
    aliases: ["hlep", "hepl", "gi"]
}