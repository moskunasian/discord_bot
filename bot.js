const Discord = require('discord.js')
const client = new Discord.Client()
const cheerio = require('cheerio')
const axios = require('axios')

client.on('ready' , () => {

    console.log('I am ready!')

}) ;


client.on('message' , message => {

    if (message.content === '!ranks')
    {
        message.reply('!ranks , not implemented yet. . .')
    }


}) ;


client.login(process.env.BOT_TOKEN) ;
