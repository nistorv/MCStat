const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let queueReq, priQueueReq
    try {
        queueReq = await superagent.get(`https://2b2t.io/api/queue?last=true`)
        priQueueReq = await superagent.get(`https://api.2b2t.dev/prioq`)
    } catch (ex) {
        console.trace(ex)
        return message.channel.send("Failed to get information from 2B2T")
    }

    let richEmbed = new Discord.RichEmbed()
        .setTitle("2b2t Queue Information")
        .setColor("#3A785A")
        .addField("Queue: ", queueReq.body[0][1], true)
        .addField("Priority Queue: ", priQueueReq.body[1], true)
        .setFooter("MCStat", bot.user.displayAvatarURL)

    message.channel.send(richEmbed);
}

module.exports.config = {
    name: "queue2b2t",
    aliases: ["2b2tqueue", "2b2tq", "q2b2t"]
}