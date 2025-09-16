const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    var username = args.slice(0).join(" ");
    if (!username) username = null

    let {body} = await superagent
    .get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    if(!{body}) return message.channel.send("Failed to connect to Minecraft.")

    if(body.name === undefined){
        let noPlayerEmbed = new Discord.RichEmbed()
            .setTitle(`${username}'s Minecraft Profile`)
            .setDescription("This user doesn't exist.")
            .setFooter("MCStat", bot.user.displayAvatarURL)
        message.channel.send(noPlayerEmbed);
    }

    var uuid = body.id

    console.log(`${uuid}/${body.name} - Minecraft Basic Info`)
    if(body.name === username){
        let richEmbed = new Discord.RichEmbed()
        .setTitle(`${body.name}'s Minecraft Proifle`)
        .setColor("#3A785A")
        .setThumbnail(`https://crafatar.com/avatars/${uuid}?size=25`)
        .addField('UUID: ', uuid)
        .addField(`NameMC Profile: `, `[Click Here!](https://namemc.com/profile/${uuid})`)
        .setFooter("MCStat", bot.user.displayAvatarURL)

    message.channel.send(richEmbed);
    }
}

module.exports.config = {
    name: "minecraft",
    aliases: ["mc", "mincecraft", "mine", "craft"]
}