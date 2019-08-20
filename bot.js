const Discord = require('discord.js') ;
const client = new Discord.Client() ;

client.on('ready' , () => {

  console.log('I am ready!') ;

}) ;


client.on('message' , message => {

  // message checking
  if (message.content === 'ping')
  {
    // what pinging this message type will do
    message.reply('pong')
  }

}) ;


client.login(process.env.BOT_TOKEN) ;
