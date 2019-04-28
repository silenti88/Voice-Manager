const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on("voiceStateUpdate", async (oldMember,newMember) =>{
    if(newMember.voiceChannelID === "568149581301285020" && !newMember.roles.has("570768306265391104") && newMember.guild.owner.id !== newMember.user.id){
        if(oldMember.selfMute !== newMember.selfMute || oldMember.selfDeaf !== newMember.selfDeaf) return;
        if(oldMember.serverMute !== newMember.serverMute || oldMember.serverDeaf !== newMember.serverDeaf) return;

        let newChannel = await newMember.guild.createChannel('new-channel','voice').catch(console.error());  
        await newMember.setVoiceChannel(newChannel.id).catch(console.error());
        newChannel.delete().catch(console.error());
    }
});

client.on("disconnect", () => {
    console.log(`You have been disconnected`);
});

client.on("error", () => {
    console.error();
});

client.on("reconnecting", () => {
    console.log("You have been reconnected");
});

client.login(process.env.BOT_TOKEN);
