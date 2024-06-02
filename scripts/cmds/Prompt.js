const { existsSync, mkdirSync } = require("fs");
const axios = require("axios");
const tinyurl = require("tinyurl");

module.exports = {
  config: {
    name: "prompt",
    aliases: ["p"],
    version: "1.0",
    author: "Vex_Kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "Generate prompt for an image",
    longDescription: "Generate prompt for an image",
    category: "image",
    guide: {
      en: "{p}prompt (reply to image)"
    }
  },

  onStart: async function ({ message, event, api }) {
    api.setMessageReaction("🕐", event.messageID, (err) => {}, true);

    const { type, messageReply } = event;
    if (type !== "message_reply" || !messageReply || !messageReply.attachments) {
      return message.reply("Please reply to an image.");
    }

    const [attachment] = messageReply.attachments;
    if (!attachment || attachment.type !== "photo") {
      return message.reply("Reply to an image.");
    }

    try {
      const tinyUrl = await tinyurl.shorten(attachment.url);
      const apiUrl = `https://prompt-gen-eight.vercel.app/kshitiz?url=${encodeURIComponent(tinyUrl)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.prompt) {
        return message.reply(response.data.prompt);
      } else {
        throw new Error("Prompt not found in the response.");
      }
    } catch (error) {
      console.error(error);
      return message.reply("❌ An error occurred while generating the prompt.");
    }
  }
};
