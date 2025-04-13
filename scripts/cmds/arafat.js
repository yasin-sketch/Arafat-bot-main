const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "arafat",
    version: "1.0",
    author: "👀ꪖ᥅ꪖᠻꪖꪻ🍼",
    description: "Displays the owner's information with a random GIF",
    category: "info",
    guide: "{p} owner"
  },

  onStart: async function ({ api, event }) {
    const ownerInfo = `
      👑 🇴 🇼 🇳 🇪 🇷  👑
      𝗡𝗮𝗺𝗲:𝐀𝐫𝐚𝐟𝐚𝐭 𝐘𝐚𝐬𝐢𝐧
      𝗗𝗮𝘁𝗲 𝗼𝗳 𝗯𝗶𝗿𝘁𝗵:09 𝐀𝐮𝐠𝐮𝐬𝐭,2010
      𝗦𝘁𝘂𝗱𝘆:𝐒𝐒𝐂 𝐂𝐚𝐧𝐝𝐢𝐝𝐚𝐭𝐞 2028
      𝗚𝗲𝗻𝗱𝗲𝗿:𝐌𝐚𝐥𝐞
      𝗔𝗱𝗱𝗿𝗲𝘀𝘀:𝐏𝐚𝐧𝐜𝐡𝐚𝐠𝐚𝐫𝐡,𝐑𝐚𝐧𝐠𝐩𝐮𝐫,𝐁𝐃
      
    `;

    const gifs = [
      "https://i.ibb.co/sWq2V1m/image.gif",
      "https://i.ibb.co/WG56PNV/image.gif",
      "https://i.ibb.co/hVX2NDz/image.gif",
      "https://i.ibb.co/KrY1DF8/image.gif",
      "https://i.ibb.co/7bFCMxH/image.gif",
      "https://i.ibb.co/5cBmXj2/image.gif",
      "https://i.ibb.co/7Qd7bLt/image.gif"
    ];

    const randomGifUrl = gifs[Math.floor(Math.random() * gifs.length)];

    try {
      const response = await axios.get(randomGifUrl, { responseType: 'stream' });
      const attachment = response.data;

      const messageData = {
        body: ownerInfo,
        attachment
      };

      api.sendMessage(messageData, event.threadID);
    } catch (error) {
      console.error("Error fetching the GIF:", error);
      api.sendMessage(ownerInfo, event.threadID);
    }
  }
};
