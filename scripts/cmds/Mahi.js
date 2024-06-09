module.exports = {
  config: {
    name: "Mahi",
    version: "1.0",
    author: "Mahi--", // hopeless 
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  }, 
  onStart: async function(){}, 
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "mahi") {
      const responses = [
        {
          body: "𝙳𝚘𝚗'𝚝 𝚌𝚊𝚕𝚕 𝚕𝚘𝚛𝚍 𝚊𝚒𝚣𝚎𝚗 𝚒𝚏 𝚑𝚎 𝚒𝚜𝚗'𝚝 𝚑𝚎𝚛𝚎 !!",
          gif: "https://i.ibb.co/RN7HcSY/image.gif"
        },
        {
          body: "𝙻𝚘𝚛𝚍 𝙰𝚒𝚣𝚎𝚗 𝚒𝚜 𝚋𝚞𝚜𝚢 𝚍𝚘𝚗'𝚝 𝚋𝚊𝚛𝚔",
          gif: "https://i.ibb.co/RN7HcSY/image.gif"
        },
        {
          body: "𝙰𝚛𝚎 𝚢𝚘𝚞 𝚎𝚟𝚎𝚗 𝚠𝚘𝚛𝚝𝚑𝚢 𝚝𝚘 𝚌𝚊𝚕𝚕 𝚕𝚘𝚛𝚍 𝙰𝙸𝚉𝙴𝙽 𝚋𝚢 𝚑𝚒𝚜 𝚗𝚊𝚖𝚎?",
          gif: "https://i.ibb.co/qN20QPW/image.gif"
        }
        // Add more responses as needed
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      return message.reply({
        body: randomResponse.body,
        attachment: await global.utils.getStreamFromURL(randomResponse.gif)
      });
    }
  }
}
