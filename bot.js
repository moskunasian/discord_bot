// Ian Moskunas / ianmosk19@gmail.com

const Discord = require("discord.js") ;
const client = new Discord.Client() ;
const cheerio = require("cheerio") ;
const axios = require("axios") ;


client.on("ready" , () => {

    console.log("I am ready!") ;
    client.user.setPresence(({name: "Just TFT Tings..." , type: 0})) ;

}) ;


// have !update command to refresh what is present in the output list
// then have ranks , which will just output whatever was last in update command
client.on("message" , message =>
{
    function rankSortOutput(outputList)
    {
        var rankMap = {} ;
        rankTiers = ["Iron" , "Bronze" , "Silver" , "Gold" , "Platinum" , "Diamond"] ;
        for (let i = 0 ; i < rankTiers.length ; i++)
            rankMap[rankTiers[i]] ;

        outputList.sort(function(a , b)
        {
            return (rankMap[a[1]] - rankMap[b[1]]) || (b[2] - a[2]) || (a[3] - b[3]) ;
        })
        outputList.reverse() ;

        var maxName = 0 ;
        for (let i = 0 ; i < outputList.length ; i++)
        {
            if (outputList[i][0].length > maxName)
                maxName = outputList[i][0].length ;
        }

        var outputString = "" ;
        for (let i = 0 ; i < outputList.length ; i++)
        {
            currLen = outputList[i][0].length ;
            outputString += "\n" + (i + 1) + ". " +
                            outputList[i][0] + ": " +
                            outputList[i][1] + " " +
                            outputList[i][2] + " " +
                            outputList[i][3] + "LP" ;
        }
        message.reply("\nCurrent TFT Leaderboard:\n---" + outputString + "\n---") ;
    }

    let rankCache = []

    if (message.content == "!update")
    {
        var count = 0 ;
        var currNames = ["Snakebite0160" , "sanuksom" , "Rexox" , "Pentameme" ,
                         "Swash" , "K0BI" , "Hisoka x Chrollo" , "VioIation" , "FattyTerps"] ;

        for (let i = 0 ; i < currNames.length ; i++)
        {
            axios.get("https://lolchess.gg/profile/na/" + currNames[i]).then(function(result)
            {
                $ = cheerio.load(result.data)
                userTier = $("span.profile.tier__summary__tier")
                userDiv = $(userTier).text().slice(-1)
                userTier = $(userTier).text().slice(0 , -2)
                userName = $("span.profile__summoner__name")
                userLP = $("span.profile__tier__summary__lp")
                output.push([$(userName).text() , userTier , parseInt(userDiv) , parseInt($(userLP).text().slice(0 , 2))])
                count++

                if (count == currNames.length)
                    message.reply("\nRanks successfully updated.")
            })
        }
    }

    if (message.content === "!ranks")
    {
        rankSortOutput(rankCache)
    }
}) ;

client.login(process.env.BOT_TOKEN)
