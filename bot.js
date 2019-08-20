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
        axios.all([axios.get('https://lolchess.gg/profile/na/iceman0160'),
                   axios.get('https://lolchess.gg/profile/na/sanuksom')]).then(axios.spread((res1, res2) => {

            cheer1 = cheerio.load(res1.data)
            user1 = cheer1('span.profile__summoner__name')
            console.log(cheer1(user1).text())
        }))
    }


}) ;

/*
axios.all([axios.get('https://lolchess.gg/profile/na/iceman0160'),
           axios.get('https://lolchess.gg/profile/na/sanuksom')]).then(axios.spread((res1, res2) => {

    cheer1 = cheerio.load(res1.data)
    user1 = cheer1('span.profile__summoner__name')
    console.log(cheer1(user1).text())

})) ;
*/

client.login(process.env.BOT_TOKEN) ;
