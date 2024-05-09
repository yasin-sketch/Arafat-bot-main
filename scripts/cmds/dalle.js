const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'dalle',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'code by Yan Maglinte modified by kira',
  description: 'text2image by hercia',
  usePrefix: false,
  commandCategory: 'image',
  usages: 'herc <query>',
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  const apiUrl = 'https://joshweb.click/dalle?prompt=';
  let text = args.join(' ');
  if (!text) {
    return api.sendMessage('Please provide a prompt to initiate the command❗', event.threadID, event.messageID);
  }

  api.sendMessage(`⌛ Generating ${text}, please wait...`, event.threadID);
  api.setMessageReaction("⌛", event.messageID, (err) => {}, true);

  axios
    .get(apiUrl + encodeURIComponent(text), { responseType: 'arraybuffer' })
    .then(async (response) => {
      const imageData = Buffer.from(response.data, 'binary');

      const imagePath = path.join(__dirname, 'cache', 'dalle', '1.jpg');
      fs.writeFileSync(imagePath, imageData);

      const imageAttachment = fs.createReadStream(imagePath);
      api.sendMessage({ attachment: imageAttachment }, event.threadID);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    })
    .catch((error) => {
      console.error('Error:', error);
      api.sendMessage('⚠️ Failed to generate the image. Please try again.', event.threadID, event.messageID);
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    });
};
