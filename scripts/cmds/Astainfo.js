const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info1",
    version: "1.0",
    author: "ASTA ICHIYUKIMØRI",
    role: 0,
    cooldown: 5,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin."
    },
    category: "utility",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message, prefix }) {
    const botPrefix = -; // Use the provided bot prefix
    const authorName = "RED WAN";
    const authorFB = "https://web.facebook.com/devastatinglordxemon01";

    const now = moment();
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

    const additionalText = "THIS masterpiece has been created by REDWAN";

    // Combine the bot information and additional text in a single message
    message.reply(`======[ℹ𝗕𝗼𝘁 𝗶𝗻𝗳𝗼:]======
     ☢ 𝗕𝗼𝘁 𝗽𝗿𝗲𝗳𝗶𝘅: ${botPrefix}
======================
👾 𝗕𝗼𝘁 𝗻𝗮𝗺𝗲 : ANCHESTOR AI
======================
    🙇🏾‍♂👑 𝗢𝘄𝗻𝗲𝗿: ${authorName}
======================
     🔗 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: [${authorName}] 💬${authorFB}💬
======================
     📅 𝗗𝗮𝘁𝗲: ${date}
======================
     🕒 𝗧𝗶𝗺𝗲: ${time}
======================
     ⏰ 𝗨𝗽𝘁𝗶𝗺𝗲: ${uptimeString}
======================
      
      ${additionalText}
    `);
  },

  onChat: async function ({ event, message, getLang, prefix }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message, prefix });
    }
  }
}
