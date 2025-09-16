// discord bot stuff
const Discord = require('discord.js');
const botconfig = require('./botconfig.json');
const bot = new Discord.Client();
const fs = require("fs");

bot.on("ready", async () => {
    // log to console and set activity
    console.log(`MCStat is Running!`)
    bot.user.setPresence({ game: { name: 'MCStat', type: "streaming", url: "https://www.twitch.tv/twitch"}}); 
})

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

// load the commands as modules
fs.readdir("./commands/", (err, files) => {
    if (err) {
        console.log(err)
    }

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        return console.log("command not available");
    }

    jsfile.forEach(file => {
        let cmdModule = require(`./commands/${file}`);

        // load the modules into commands and aliases
        bot.commands.set(cmdModule.config.name, cmdModule);
        cmdModule.config.aliases.forEach(alias => {
            bot.aliases.set(alias, cmdModule.config.name)
        });
    });
});

// message listener
bot.on("message", async message => {
    // ignore messages from bot or DM
    if (message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(
        cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length))
        );
    
    if (commandfile) {
        commandfile.run(bot, message, args)
    }
})

// log into bot
bot.login(botconfig.token);