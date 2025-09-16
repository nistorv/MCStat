const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let username = args.slice(0).join(" ");
    if (!username) username = "hypixel"

    let { body } = await superagent.get(`https://api.hypixel.net/player?key=${botconfig.hypixel_key}&name=${username}`)
    if (!{ body }) return message.channel.send("Failed to connect to Hypixel.")

    if (body.player === null) {
        let noPlayerEmbed = new Discord.RichEmbed()
            .setTitle(`${username}'s Hypixel Stats`)
            .setDescription("This player has not played on the Hypixel Network")
            .setFooter("MCStat", bot.user.displayAvatarURL)
        message.channel.send(noPlayerEmbed);
    }

    // Prestigous Heads
    var headPrestige = 0
    headPrestige += parseFloat(body.player.stats.SkyWars.heads_salty) || 0
    headPrestige += parseFloat(body.player.stats.SkyWars.heads_tasty) || 0
    headPrestige += parseFloat(body.player.stats.SkyWars.heads_succulent) || 0
    headPrestige += parseFloat(body.player.stats.SkyWars.heads_sweet) || 0
    headPrestige += parseFloat(body.player.stats.SkyWars.heads_divine) || 0
    headPrestige += parseFloat(body.player.stats.SkyWars.heads_heavenly) || 0


    // rank color detection
    if (body.player.newPackageRank === "MVP_PLUS") {
        var rank = "MVP+"
        var rankcolor = "#3CE6E6"
    }
    if (body.player.newPackageRank === "MVP") {
        var rank = "MVP"
        var rankcolor = "#3CE6E6"
    }
    if (body.player.newPackageRank === "VIP_PLUS") {
        var rank = "VIP+"
        var rankcolor = "#3CE63C"
    }
    if (body.player.newPackageRank === "VIP") {
        var rank = "VIP"
        var rankcolor = "#3CE63C"
    }
    if (body.player.monthlyPackageRank === "SUPERSTAR") {
        var rank = "MVP++"
        var rankcolor = "#FFAA00"
    }
    if (body.player.newPackageRank === undefined) {
        var rank = "Rankless"
        var rankcolor = "#AAAAAA"
    }

    var recentHeadUUID = body.player.stats.SkyWars.head_collection.recent[0].uuid
    console.log(`${body.player.stats.SkyWars.head_collection.recent[0].uuid}`)
    let uuidCatch, forcedReq
    try {
        uuidCatch = (await superagent.get(`https://api.hypixel.net/player?key=${botconfig.hypixel_key}&uuid=${recentHeadUUID}`)).body
        forcedReq = await superagent.get(`https://api.2b2t.dev/prioq`)
    } catch (ex) {
        console.trace(ex)
        return message.channel.send("Failed to get info from Hypixel")
    }
    console.log(`${uuidCatch.player.displayname}`)

    console.log(`${body.player.displayname}-${rank} - Hypixel Stats - Skywars Heads`)

    let richEmbed = new Discord.RichEmbed()
        .setTitle(`${body.player.displayname}'s Skywars Heads`)
        .setColor(rankcolor)
        .addField("Prestigious Heads: ", headPrestige, true)
        .addField("Total Heads:", body.player.stats.SkyWars.heads, true)
        .addField("Most Recent Head: ", `[${uuidCatch.player.displayname}](https://namemc.com/profile/body.player.stats.SkyWars.head_collection.recent[0].uuid)`, true)
        .setFooter("MCStat", bot.user.displayAvatarURL)

    message.channel.send(richEmbed);
}


module.exports.config = {
    name: "hypixelheads",
    aliases: ["hpixelhead", "hyhead", "skyheads", "skywarsheads", "skywarheads"]
}

// HYPIXEL.player.uuid to get UUID from Hypixel's API
// HYPIXEL.player.stats.Bedwars.wins_bedwars to get Bedwars Wins
// HYPIXEL.player.stats.SkyWars.wins to get Skywars Wins
// HYPIXEL.player.networkExp Network EXP
