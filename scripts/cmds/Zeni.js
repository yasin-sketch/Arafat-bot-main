module.exports = {
 config: {
 name: "Zeni",
 version: "1.0",
 author: "MAHI×zeni", // hopeless 
 countDown: 5,
 role: 0,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "zeni") {
 return message.reply({
 body: "𝘿𝙊𝙉'𝙏 𝘿𝙄𝙎𝙏𝙐𝙍𝘽 𝙏𝙃𝙐𝙉𝘿𝙀𝙍 𝙂𝙊𝘿 𝙕𝙀𝙉𝙄 𝙒𝙃𝙀𝙉 𝙃𝙀 𝙄𝙎 𝘽𝙐𝙎𝙔!!",
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/gr18sbV/1d3dbf048330590da90564fc6404451a.gif")
 });
 }
 }
   }
