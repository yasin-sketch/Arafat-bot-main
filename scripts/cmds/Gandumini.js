const axios = require('axios');

module.exports = {
  config: {
    name: "sanji",
    version: 2.0,
    author: "OtinXSandip",
    shortDescription: "𝖻𝖾𝗋𝗍𝖺𝗇𝗒𝖺 𝖽𝖾𝗇𝗀𝖺𝗇 𝗀𝖾𝗆𝗂𝗇𝗂 𝖠𝖨",
    role: 0,
    countDown: 10,
    category: "𝗔𝗜-𝗖𝗛𝗔𝗧",
    guide: {
      en: "{p}{n} <Query>",
    },
  },
  onStart: async function ({ message, usersData, event, api, args }) {
    try {
      if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0].type === "photo") {
        const photoUrl = encodeURIComponent(event.messageReply.attachments[0].url);
        const lado = args.join(" ");
        const url = `https://sandipbaruwal.onrender.com/gemini2?prompt=${encodeURIComponent(lado)}&url=${photoUrl}`;
        const response = await axios.get(url);

        message.reply(response.data.answer);
        return;
      }

      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];
      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      api.setMessageReaction("⏳", event.messageID, () => { }, true);
      const res = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
      const result = res.data.answer;
      
      api.setMessageReaction("✔", event.messageID, () => { }, true);
      message.send({
        body: `# 𝗚𝗲𝗺𝗶𝗻𝗶 𝗔𝗜\n• ${name}\n\n${result}`,
        mentions: ment,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onReply: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];
      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      api.setMessageReaction("⏳", event.messageID, () => { }, true);
      const res = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
      const result = res.data.answer;
     
      api.setMessageReaction("✔", event.messageID, () => { }, true);
      message.send({
        body: `# 𝗚𝗲𝗺𝗶𝗻𝗶 𝗔𝗜\n• ${name}\n\n${result}`,
        mentions: ment,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
