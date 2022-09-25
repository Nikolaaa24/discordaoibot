const aoijs = require("aoi.js")
const {Panel} = require("@akarui/aoi.panel")
var exec = require('child_process').exec;
const bot = new aoijs.Bot({
token: "OTY3MTE0Mjc0Njc5OTQ3MzY0.GjPajl.5N8ZbiyROGxbZb4qXEgG7XhVp9MJrf4vyD8Has",
prefix: ".",
intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]
})




//exec('');





const panel = new Panel({
    username: "root",//username for logging in
    password: "vexbotroot",//password for logging in
    secret: "aoijs",//session secret
    port: 8080,//port on which website is hosted, Not required! Default 3000
    bot: bot,//your aoi.js client
    mainFile: "index.js",//Main file where code is running.Not required, default taken from package.json
    commands: "commands"// folder name in which all the edit needing files are there.
})
panel.loadPanel()//Load The Panel

panel.onError()//Will detect errors, and send it to aoi.panel's error page.

bot.onMessage()

bot.onInteractionCreate()

bot.command({
name: "slash",
code: `
$createApplicationCommand[$guildID;send-dm;make the bot send a dm to a user;true;slash;user:user to dm:true:6;message:message to send to user:true:3]



$onlyIf[$hasPerms[$guildID;$authorID;admin]==true;You do not have a permission to execute this command!]
`
})

/*
TODO LIST:
-Make all ids be variables that you can set with aoi.panel!
*/
//Ready Event
bot.readyCommand({
    channel: "",
    code: `$log[Ready on $userTag[$clientID]]
    $channelSendMessage[1008459627442225262;Repl.it database has been established. Bot ready on $userTag[$clientID]. Bot developed by Nikolaaa#7846.;no]`
})

bot.variables({
reason: "No reason provided.",
warn: "0"
})

bot.command({
name: "discrules",
code: `
$onlyIf[$hasPerms[$guildID;$authorID;admin]==true;You do not have a permission to execute this command!]

\`\`\`
-You are prohibited from joining in this server with multiple accounts.
-Nationalism and regionalism are strongly prohibited.
-You are prohibited from sending any malicious links in our server.
-Toxic behaviour is strongly prohibited.
-Spamming messages or any other content is strongly prohibited.
-Yelling or playing music/soundboard on microphone is strongly prohibited.
-Advertising other servers in our server is extremely prohibited.
-Moderators have the final say.
-Talking about software piracy is extremely prohibited.

-By joining the server you agree to all the rules listed above.
Breaking any of these rules will result in a punishment ranging from mute to ban.
\`\`\`
`
}) 

bot.command({
name: "clientrules",
code: `
$onlyIf[$hasPerms[$guildID;$authorID;admin]==true;You do not have a permission to execute this command!]

\`\`\`
-You are prohibited from reuploading our client to the internet. (Legal actions will be taken)
-

\`\`\`
`
}) 



bot.command({
name: "upd",
code: `
$onlyIf[$hasPerms[$guildID;$authorID;admin]==true;You do not have a permission to execute this command!]

\`\`\`
We realised that we can not provide a good Minecraft Server experience for now, so we will be turning this discord server to a community. Please invite your friends to join, we want to grow this community as much as possible. Those who invite a lot of friends will get rewarded.
\`\`\`
$addButton[1;Read More;link;https://universecommunity.cf;no;📖]

`
}) 
  

bot.command({ //improve rules here!!!
name: "setupsuggestions",
code: `
$onlyIf[$hasPerms[$guildID;$authorID;admin]==true;Nope bozo]
\`\`\`
READ CAREFULLY BEFORE MAKING ANY SUGGESTIONS.
RULES FOR MAKING SUGGESTIONS:
1.Do not request something that we already have.
2.Do not spam suggestions, its enough to suggest something one time.
3.Make it clear what you want to say.
4.Keep it real, do not suggest something that you know we can not do.
5.Trolling results in a permanent ban.
ALL SUGGESTIONS WILL BE LOOKED INTO, TO SEE WHAT SUGGESTIONS WERE APPROVED GO TO APPROVED SUGGESTUONS CHANNEL
\`\`\`

$addButton[1;Suggest Something;primary;suggestionCreator;no;💡]

`
}) 

bot.interactionCommand({
name: "suggestionCreator",
prototype: "button",
code: `
$interactionDelete
$wait[1s]
$interactionReply[Created a new suggestion.;;;;;no]

$interactionModal[Hey, Looking to suggest something? Fill this.;suggestionSubmit;
  {actionRow:
    {textInput:Suggestion Title:1:stitleInput:yes::3:50}
  }
  {actionRow:
    {textInput:Description:2:descInput:yes:Describe your suggestion with as much detail as you can!:50:350}
  }
]

$cooldown[10m;<@$authorID>, Wait %min% minutes and %sec% seconds before creating a new suggestion.{delete:3s}]
`
})

/*
$textInputValue[stitleInput]
$textInputValue[descInput]
*/
bot.interactionCommand({
  name: "suggestionSubmit", //make it embed!!!
  prototype: 'modal',
  code: `
$interactionDelete
$wait[3s]
$interactionReply[User <@$authorID> submited a suggestion]


$apiMessage[1008841672072908840;;{newEmbed:
    {title:**$textInputValue[stitleInput]**}
    {description: $textInputValue[descInput]}
    {color:WHITE}
    {footer:Requested by $usertag}
    {thumbnail:$serverIcon}
    {author:$usertag:$authorAvatar}
    {timestamp};{actionRow:{button:Approve:3:suggestionApprove:false}}]

  `
}); 

bot.interactionCommand({
name: "suggestionApprove",
prototype: "button",
code: `
$interactionDelete
$wait[1s]
$interactionReply[Approved.;;;;;no]

$interactionModal[Describe a suggestion you want to approve!;suggestionApproval;
  {actionRow:
    {textInput:Approved Suggestion Title:1:approveInput:yes::5:100}
  }
]

`
})

bot.interactionCommand({
name: "suggestionApproval",
prototype: "modal",
code: `
$interactionDelete
$wait[1s]
$interactionReply[Approved.;;;;;no]

$apiMessage[1009155391353004113;;{newEmbed:
    {title:**$textInputValue[approveInput]**}
    {color:GREEN}
    {footer:Approved by $usertag}
    {thumbnail:$serverIcon}
    {timestamp}};;;;;;;no] 


`
})


/*
{newEmbed:
    {title:**$textInputValue[stitleInput]**}
    {description: $textInputValue[descInput]}
    {color:WHITE}
    {footer:Requested by $usertag}
    {thumbnail:$serverIcon}
    {author:$usertag:$authorAvatar}
    {timestamp}}


{actionRow:{button:Approve:3:suggestionApprove:false}
{button:Deny:4:suggestionDeny:false}
}

*/


//command for seting up tickets.
bot.command({
name: "setuptickets",
code: `
$onlyIf[$hasPerms[$guildID;$authorID;admin]==true;Nope bozo]
\`\`\`

READ CAREFULLY BEFORE CREATING TICKETS.
RULES FOR TICKETS:

1.Any disrespectful behaviour can result in a punishment.(from mute to ban)
2.Any off-topic questions, for example "how do I install steam" will result in your request being closed without an answer.
3.Spamming ticket creation results in a ban.
4.Do not ask if you can be a mod, for that there will be forms which you will need to fill.
5.Moderators have have the final say.
USE THIS TO REPORT PLAYERS!
WHEN YOU HAVE READ ALL THAT, YOU CAN GO AHEAD AND CREATE A TICKET
---
PROCITAJ PAZLJIVO PRIJE KREIRANJA TIKETA.
PRAVILA ZA TIKETE:
1.Bilo koje nepristojno ponasanje moze rezultirati u kazni.(od muta do bana)
2.Bilo koja pitanje ne vezana za temu, na primjer "kako da instaliram steam" ce rezultirati zatvaranje vaseg tiketa bez odgovora.
3.Spamanje kreacije tiketa ce rezultirati u banu.
4.Nemojte pitati da li mozete biti mod, za to ce biti forme koje ce te morati ispuniti.
5.Moderatori imaju zadnju rijec.
KORISTITE OVO DA PRIJAVITE IGRACE!
KADA STE PROCITALI SVE GORE NAVEDENO, MOZETE NAPRAVITI TIKET

\`\`\`

$addButton[1;Create Ticket;primary;ticketCreator;no;🎟️]

$addButton[1;Napravi Tiket;primary;rsTicketCreator;no;🎟️]
`
}) 



//ticket system here--------



bot.command({
name: "close",
code: `
$deleteChannels[$channelID]

$onlyIf[$hasPerms[$guildID;$authorID;admin]==true;Nope bozo]
$onlyIf[$checkContains[$channelName[$channelID];│ticket-]==true;You can not close a normal channel. You can only close open tickets.]
`
})
bot.interactionCommand({
name: "rsTicketCreator",
prototype: "button",
code: `


$deleteChannels[$get[channelId]]
$suppressErrors
$wait[20s]
$interactionDelete
$wait[3s]
$interactionReply[Napravljen je novi tiket.;;;;;no]

$modifyChannelPerms[$guildID;$get[channelId];-viewchannel;-sendmessage]

$modifyChannelPerms[1008499061659279421;$get[channelId];+viewchannel;+sendmessage]


$modifyChannelPerms[$authorID;$get[channelId];+viewchannel;+sendmessage]

$let[channelId;$newTicket[│ticket-$random[100;10000];Pozdrav <@$authorID>, opisite problem koji imate i <@&1008499061659279421> ce vam pomoci uskoro.;1008499987623202928;yes]]

$cooldown[10m;<@$authorID>, Sacekaj %min% minuta prije kreiranja novog tiketa.{delete:3s}]

`
})


bot.interactionCommand({
name: "ticketCreator",
prototype: "button",
code: `


$deleteChannels[$get[channelId]]
$suppressErrors
$wait[20s]
$interactionDelete
$wait[1s]
$interactionReply[Created a new ticket.;;;;;no]

$modifyChannelPerms[$guildID;$get[channelId];-viewchannel;-sendmessage]

$modifyChannelPerms[1008499061659279421;$get[channelId];+viewchannel;+sendmessage]


$modifyChannelPerms[$authorID;$get[channelId];+viewchannel;+sendmessage]

$let[channelId;$newTicket[│ticket-$random[100;10000];Hello<@$authorID>, describe the issue you are having and <@&1008499061659279421> will reply shortly after.;1008499987623202928;yes]]

$cooldown[10m;<@$authorID>, Wait %min% minutes before creating a new ticket.{delete:3s}]

`
})





//VOICE / MUSIC RELATED CONFIGURATION
const voice = new aoijs.Voice(bot, {
  soundcloud: {
    //clientId: "SoundCloud clientID", //remove the double slash if you want soundcloud
  },
  cache: {
    cacheType: "Memory",//Disk, Memory,
    //directory: "./cache/",
    enabled: true,
  },
}, false); //true or false for pruneMusic

bot.status({
text: "Created by Nikolaaa#7846",
type: "watching", // playing, streaming, watching, listening
status: "dnd", // online idle dnd
duration: "1000"
})

bot.status({
text: "subara je dobar lik",
type: "playing", // playing, streaming, watching, listening
status: "dnd", // online idle dnd
duration: "4000"
})

bot.status({
text: "your commands.",
type: "listening", // playing, streaming, watching, listening
status: "dnd", // online idle dnd
duration: "1000"
})


bot.command({
name: "join",
$if: "v4", //enabling pseudo $if
code: `
$if[$hasPlayer==false]
    $joinVc
$endif`
})

bot.command({
name: "delmsg",
code: `
<@$get[delmsgid]>
\`Your message was deleted due to unacceptable behaviour. If you think this is a mistake please contact a server administrator.\`
$deleteMessage[$message[1];$channelID]
$let[delmsgid;$msg[$channelID;$message[1];authorId]]
`
})

bot.command({
name: "showping",
code: `$pingms`
})

bot.command({
name: "lucic",
code: `https://tenor.com/view/petar-petar-deez-nuts-deez-nuts-akyplaygame-nikola-gif-20467245`
})


bot.command({
name: "wtf",
code: `https://tenor.com/view/what-the-fuck-wtf-what-huh-shocked-gif-17215720`
})

bot.command({
name: "ip",
code: `bedrock and java: 147.185.221.212:23152`
})
//Command Example (ping)
bot.command({
name: "play",
$if: "v4", //enabling pseudo $if
code: `
$playTrack[youtube;$message]
$suppressErrors[Please use .join before trying to play anything.]
`
});

bot.command({
name: "bass",
code: `
Set bass to $message.
$let[a;$setFilter[{ "bass":$message }]]

$onlyIf[$hasPerms[$guildID;$authorID;admin]==true;Nope bozo]
`
/*
This sets the bass to '50' and sets the speed to '2x' speed
*/
})


bot.command({
  name: "volume",
  code: `
  Set volume to $message%.
  $volume[$message]

$onlyIf[$hasPerms[$guildID;$authorID;admin]==true;Nope bozo]
$suppressErrors[You can not put text in volume.]

  `
});
 // Sets the volume to mentioned number.

//$onlyif[$voiceid!~;You need to join a voice chat first.]
bot.command({
name: "queue",
code: `
$title[1;Queue]
$author[1;Requested By $usertag;$authorAvatar]
$description[1;$queue[$if[$message==;1;$message]]]
$footer[1;number of songs ->$queueLength]
$color[1;RANDOM]
$addTimestamp[1]
    `
});

bot.command({
name: "leave",
code: `I left.
$leaveVC
$suppressErrors[The Bot is not connected to any channel.]
`
})



bot.command({
name: "skip",
code: `Skipped the song!
$skip
$suppressErrors[Can not skip a song if nothing is playing.]
`
})

bot.command({
name: "stop",
code: `Stopped the song!
$stop
$suppressErrors[Can not stop a song if nothing is playing.]`
})




bot.command({
name: "showcpu",
code: `$cpu ghz`
})

bot.command({
name: "showram",
code: `$ram mb`
})

bot.command({
name: "clear",
code: `
$onlyIf[$hasPerms[$guildID;$authorID;admin]==true;Nope bozo]
$clear[$message]
$argsCheck[1;Please mention how much messages you want to clear, .clear (number)]
\`Administrator $username cleared $message messages.\`
`
}) 

bot.command({
name: "wd",
code: `
https://tenor.com/view/what-da-dog-doin-what-da-dog-doin-gif-22078277
`
}) 

bot.command({
name: "warn",
code: `
$color[RANDOM]
$title[Warned $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has warned **$username[$mentioned[1;yes]]** for \`$noMentionMessage\`
he now has \`$getUserVar[warn;$findUser[$message]]\` Warnings
]
$setUserVar[reason;$getUserVar[reason;$mentioned[1]]/**$date+:$hour:$minute:$second**+> $noMentionMessage+;$mentioned[1]]
$setUserVar[warn;$sum[$getUserVar[warn;$mentioned[1]];1];$mentioned[1]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];** That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**That user is higher/equal than you on role position**]
$onlyIf[$message[1]!=;** Provide a reason**]
$onlyIf[$noMentionMessage!=;** Mention the user you want to warn and provide a reason**]
$onlyIf[$mentioned[1]!=$authorID;** You can't warn yourself**]
$onlyIf[$isBot[$mentioned[1;yes]]!=true;** You can't warn a bot**]
$onlyBotPerms[manageroles;**I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[admin;\`You do not have required permission to execute this command.\`]`
})
 
bot.command({
name: "warnings", 
code: `$color[RANDOM]
$title[$username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]'s warnings]
$description[
**$username[$mentioned[1;yes]]** has
\`$getUserVar[warn;$findUser[$message]]\` warnings
 
**Warnings User**
<@$mentioned[1;yes]> 
(\`$mentioned[1;yes]\`)]
$onlyIf[$getUserVar[warn;$findUser[$message]]>0;** The warnings of this user is already at 0**]
$onlyIf[$mentioned[1]!=;**You must mention someone**]
$onlyIf[$isBot[$mentioned[1;yes]]!=true;** You can't warn a bot, so they don't have warnings**]`
})
 
bot.command({
name: "unwarn", 
code: `
$color[RANDOM]
$title[Removed Warn from $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has removed a warn from **$username[$mentioned[1;yes]]** 
he now has \`$getUserVar[warn;$findUser[$message]]\` Warnings]
$setUserVar[warn;$sub[$getUserVar[warn;$findUser[$message]];1];$findUser[$message]]
$removeSplitTextElement[$getTextSplitLength]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];** That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**That user is higher/equal than you on role position**]
$onlyIf[$getUserVar[warn;$findUser[$message]]>0;** The Warnings of this User is already at 0**]
$onlyIf[$mentioned[1]!=$authorID;** You can't unwarn yourself**]
$onlyIf[$mentioned[1]!=;**You must mention someone**, Correct usage: \`.unwarn <@user>\`]
$onlyPerms[manageroles;\`You do not have required permission to execute this command.\` perms**]
$onlyBotPerms[manageroles; **I don't have** \`MANAGAGE_ROLES\` perms**]`
}) 

bot.command({
name: "chgnick",
code: `
$changeNickname[$mentioned[1];$noMentionMessage]


`
}) 








/*
$setVar[link;$getMessage[$channelID;$messageID;content]]
$onlyIf[$checkContains[$getMessage[$channelID;$messageID;content];http]==true;;]
*/


