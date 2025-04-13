module.exports = {
    config: {
        name: "arafat",
        version: "1.0",
        author: "👀ꪖ᥅ꪖᠻꪖꪻ👻", //** original author fb I'd : https://facebook.com/xuzt.arafat **//
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "arafat",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "arafat") return message.reply("𝙷𝚎𝚢 𝚐𝚞𝚢, 𝙼𝚢 𝚘𝚠𝚗𝚎𝚛 👀ꪖ᥅ꪖᠻꪖꪻ🍼 𝚒𝚜 𝚋𝚞𝚜𝚢 𝚗𝚘𝚠, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...");
}
}; 
