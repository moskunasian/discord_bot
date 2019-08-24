const Discord = require('discord.js')
const client = new Discord.Client()
const cheerio = require('cheerio')
const axios = require('axios')

// to do:   better method structure and modularity
//          better string formatting so resembles normal convention
//          cleaner column formatting in leaderboard output
//          add bot description / activity for better appearence on server

client.on('ready' , () => {

    console.log('I am ready!')
    client.user.setPresence(({name: 'Just TFT Tings...' , type: 0}))

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
        let maxName = 0
        for (let i = 0 ; i < outputList.length ; i++)
        {
            if (outputList[i][0].length > maxName)
                maxName = outputList[i][0].length
        }

        for (let i = 0 ; i < outputList.length ; i++)
        {
            currLen = outputList[i][0].length
            outputString += '\n' + (i + 1) + '. ' +
                            outputList[i][0] + ': ' +
                            outputList[i][1] + ' ' +
                            outputList[i][2] + ' ' +
                            outputList[i][3] + 'LP'
        }
        message.reply('\nCurrent TFT Leaderboard:\n---' + outputString + '\n---')
    }

    let currNames = ["Snakebite0160" , "sanuksom" , "Rexox" , "Pentameme" ,
                     'Swash' , 'K0BI' , 'Hisoka x Chrollo' , 'VioIation' , 'FattyTerps']
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

client.login(process.env.BOT_TOKEN)
