const Discord = require('discord.js')
const client = new Discord.Client()
const cheerio = require('cheerio')
const axios = require('axios')


client.on('ready' , () => {

    console.log('I am ready!')

}) ;


client.on('message' , message =>
{

    function doneSort(outputList)
    {
         // this function will do the sorting ?
         // sort based on matching groups from other array - type situation
         message.reply('testing before ranking: ')
         message.reply(outputList)
    }


    // 'sort subset of list?'
    // tiers = ["Iron" , "Bronze" , "Silver" , "Gold" , "Platinum" , "Diamond"]
    // divisions = ["4" , "3" , "2" , "1"]
    // individiual LP values
    let currNames = ["iceman0160" , "sanuksom" , "Rexox" , "Pentameme" ,
                     'Swash' , 'K0BI' , 'Hisoka x Chrollo' , 'VioIation']
    let output = []
    let count = 0

    if (message.content === '!ranks')
    {
        for (let i = 0 ; i < currNames.length ; i++)
        {
            axios.get('https://lolchess.gg/profile/na/' + currNames[i]).then(function(result)
            {
                $ = cheerio.load(result.data)
                userTier = $('span.profile__tier__summary__tier')
                userDiv = $(userTier).text().slice(-1)
                userTier = $(userTier).text().slice(0 , -1)
                userName = $('span.profile__summoner__name')
                userLP = $('span.profile__tier__summary__lp')
                output.push([$(userName).text() , userTier , userDiv , $(userLP).text().slice(0 , 2)])
                count++

                if (count == currNames.length)
                    doneSort(output)
            })
        }
    }
}) ;


client.login(process.env.BOT_TOKEN)
