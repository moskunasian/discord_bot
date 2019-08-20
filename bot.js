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
        currName = getUserInfo('iceman0160')
        $ = cheerio.load(currName.data)
        textData = $('span.profile__summoner__name')
        message.reply($(textData).text())
    }


}) ;


function getUserInfo(userName)
{
    return axios.get('https://lolchess.gg/profile/na/' + userName)
}

client.login(process.env.BOT_TOKEN) ;
