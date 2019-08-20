const Discord = require('discord.js')
const client = new Discord.Client()
const cheerio = require('cheerio')
const axios = require('axios')

// to do: better method structure and modularity

client.on('ready' , () => {

    console.log('I am ready!')

}) ;


client.on('message' , message =>
{
    function doneSort(outputList)
    {
         // 0           1       2           3
         // userName    tier    division    lp
         var map = {}
         tiers = ["Iron" , "Bronze" , "Silver" , "Gold" , "Platinum" , "Diamond"]
         for (let i = 0 ; i < tiers.length ; i++)
            map[tiers[i]] = i

        // sorts by tier correctly
        outputList.sort(function(a , b)
        {
            return (map[a[1]] - map[b[1]]) || (b[2] - a[2]) || (a[3] - b[3])
        })
        outputList.reverse()

        // outputting testing
        let outputString = ''
        for (let i = 0 ; i < outputList.length ; i++)
        {
            // to do: better string formatting here like in c/python
            // also try to get columns so cleaner looking
            outputString += '\n' + (i + 1) + '. ' + outputList[i][0] + ' ' + outputList[i][1] + ' ' + outputList[i][2]
                         + ' ' + outputList[i][3] + 'LP'
        }
        console.log('\nCurrent TFT Leaderboard:')
        console.log(outputString)
    }

    // 'sort subset of list?'
    // tiers = ["Iron"(1) , "Bronze"(2) , "Silver"(3) , "Gold"(4) , "Platinum"(5) , "Diamond"(6)]
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
            // this is slow because GET'ing each username , realtime so not caching anywhere
            axios.get('https://lolchess.gg/profile/na/' + currNames[i]).then(function(result)
            {
                $ = cheerio.load(result.data)
                userTier = $('span.profile__tier__summary__tier')
                userDiv = $(userTier).text().slice(-1)
                userTier = $(userTier).text().slice(0 , -2)
                userName = $('span.profile__summoner__name')
                userLP = $('span.profile__tier__summary__lp')
                output.push([$(userName).text() , userTier , parseInt(userDiv) , parseInt($(userLP).text().slice(0 , 2))])
                count++

                if (count == currNames.length)
                    doneSort(output)
            })
        }
    }
}) ;


//client.login(process.env.BOT_TOKEN)
client.login('NjEzMTc4MTY5OTg5NjYwNjcz.XVxK7A.nSACk1tQsdWkftoP6flkI358abw')
