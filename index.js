const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ms = require('ms');
const keepAlive = require('./server.js');

const prefix = 'm!';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Meyser has Logged In');

    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot)return;
            const args = message.content.slice(prefix.length).split(/ +/);
            const command = args.shift().toLowerCase();
            if(command === 'ping'){
                client.commands.get('ping').execute(message, args, Discord);
            }
            else if(command === 'message'){   
                client.commands.get('message').execute(message, args, Discord, client);
            }
            else if(command === 'ban'){   
                client.commands.get('ban').execute(message, args, Discord, client);
            }  
            else if(command === 'mute'){   
                client.commands.get('mute').execute(message, args, Discord, ms);
            }
            else if(command === 'clear'){   
                client.commands.get('clear').execute(message, args);
            }
            else if(command === 'meme'){   
                client.commands.get('meme').execute(message, args, Discord);
            }
    });
});

keepAlive();
client.login(process.env.BOTTOKEN); //this was made with replit.com
