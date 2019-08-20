const Discord = require('discord.js')
const client = new Discord.Client()
const cheerio = require('cheerio')
const axios = require('axios')

client.on('ready' , () => {

    console.log('I am ready!')

})


client.on('message' , message => {

    // message checking
    if (message.content === '!ranks')
    {
        // testing - trying to scrape the requisite lolchess pages
        // really inefficient but working as is for now
        let res1 , res2 = axios.all([axios.get('https://lolchess.gg/profile/na/iceman0160') ,
                                     axios.get('https://lolchess.gg/profile/na/sanuksom')])

        // could loop this or something , no repeating needed
        cheer1 = cheerio.load(res1.data)
        user1 = cheer1('span.profile__summoner__name')
        console.log(cheer1(user1).text())

        cheer2 = cheerio.load(res2.data)
        user2 = cheer2('span.profile__summoner__name')
        console.log(cheer2(user2).text())
    }

})


client.login(process.env.BOT_TOKEN) ;
