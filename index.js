const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')

client.on('ready', async () => {
    console.log(`${client.user.username} | Leave bot is now online.`)
})

client.on('guildMemberAdd', async (member) => {

    if(config.leave === 'enabled') {

        if(!config.leaveChannel) return console.log('[ Discord Leave ] Cant find leave channel in config.json file.')

        let channel = client.channels.cache.get(config.leaveChannel)

        if(!channel) return console.log('[ Discord Leave ] Error! Invalid left channel.')

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.guild.name}`, member.guild.iconURL({ dynamic:true }))
        .addField(`__**MEMBER LEFT**__`, `\`=\` **${member.user.tag}** sadly left our server.\n\`=\` Now our server has **${member.guild.memberCount}** members\n\`=\` Credits: **mqrkelich#0001**`)
        .setColor(member.guild.me.displayHexColor)
        .setThumbnail(member.guild.iconURL({ dynamic:true }))
        .setTimestamp()
        channel.send(embed)
    } else return;

})

client.login(config.token)