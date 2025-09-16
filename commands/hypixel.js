const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {


    let username = args.slice(0).join(" ");
    if (!username) username = "hypixel"

    let {body} = await superagent
    .get(`https://api.hypixel.net/player?key=${botconfig.hypixel_key}&name=${username}`)
    if(!{body}) return message.channel.send("Failed to connect to Hypixel.")

    if(body.player === null){
        let noPlayerEmbed = new Discord.RichEmbed()
            .setTitle(`${username}'s Hypixel Stats`)
            .setDescription("This player has not played on the Hypixel Network")
            .setFooter("MCStat", bot.user.displayAvatarURL)
        message.channel.send(noPlayerEmbed);
    }

    // overall wins
    var wins = 0
    // Arcade Games
    wins += parseFloat(body.player.stats.Arcade.wins_simon_says) || 0
    wins += parseFloat(body.player.stats.Arcade.seeker_wins_hide_and_seek) || 0
    wins += parseFloat(body.player.stats.Arcade.wins_party) || 0
    wins += parseFloat(body.player.stats.Arcade.wins_mini_walls) || 0
    wins += parseFloat(body.player.stats.Arcade.wins_dayone) || 0
    wins += parseFloat(body.player.stats.Arcade.wins_oneinthequiver) || 0
    wins += parseFloat(body.player.stats.Arcade.wins_hole_in_the_wall) || 0
    wins += parseFloat(body.player.stats.Arcade.hider_wins_hide_and_seek) || 0
    // Paintball
    wins += parseFloat(body.player.stats.Paintball.wins) || 0
    // Hunger Games
    wins += parseFloat(body.player.stats.HungerGames.wins) || 0
    // MCGO (Cops & Crims / Minecraft CS:GO)
    wins += parseFloat(body.player.stats.MCGO.game_wins) || 0
    // Quakecraft
    wins += parseFloat(body.player.stats.Quake.wins_teams) || 0
    wins += parseFloat(body.player.stats.Quake.wins_solo) || 0
    // TNT Games
    wins += parseFloat(body.player.stats.TNTGames.wins) || 0
    // Walls
    wins += parseFloat(body.player.stats.Walls.wins) || 0
    // Battleground
    wins += parseFloat(body.player.stats.Battleground.wins) || 0
    // Skywars
    wins += parseFloat(body.player.stats.SkyWars.wins) || 0
    // Build Battle
    wins += parseFloat(body.player.stats.BuildBattle.wins) || 0
    // Murder Mystery
    wins += parseFloat(body.player.stats.MurderMystery.wins) || 0
    // Bedwars
    wins += parseFloat(body.player.stats.Bedwars.wins_bedwars) || 0
    // Duels
    wins += parseFloat(body.player.stats.Duels.wins) || 0
    // Super Smash
    wins += parseFloat(body.player.stats.SuperSmash.wins) || 0
    // Arena
    wins += parseFloat(body.player.stats.Arena.wins) || 0


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

    let richEmbed = new Discord.RichEmbed()
        .setTitle(`${body.player.displayname}'s Hypixel Stats`)
        .setColor(rankcolor)
        .addField("Rank: ", rank, true)
        .addField("Network EXP:", body.player.networkExp, true)
        .addField("Wins: ", wins, true)
        .setFooter("MCStat", bot.user.displayAvatarURL)

    message.channel.send(richEmbed);
}


module.exports.config = {
    name: "hypixel",
    aliases: ["hpixel", "hp", "hy"]
}

// HYPIXEL.player.uuid to get UUID from Hypixel's API
// HYPIXEL.player.stats.Bedwars.wins_bedwars to get Bedwars Wins
// HYPIXEL.player.stats.SkyWars.wins to get Skywars Wins
// HYPIXEL.player.networkExp Network EXP
