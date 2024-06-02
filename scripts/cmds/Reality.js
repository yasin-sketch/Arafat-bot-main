const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "reality",
    aliases: ["ar"],
    version: "1.0",
    author: "vex_Kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "absolute reality",
    longDescription: "absolute reality",
    category: "image",
    guide: {
      en: "{p}meina [prompt]"
    }
  },
  onStart: async function ({ message, event, args, api }) {
    api.setMessageReaction("🕐", event.messageID, (err) => {}, true);
    try {
      const baseUrl = "https://kshitiz-t2i-kvx9.onrender.com/sdxl";
      const prompt = args.join(" ").trim();
      const model_id = 13;

      if (!prompt) {
        return message.reply("❌ | Please provide a prompt.");
      }

      const { data } = await axios.get(baseUrl, {
        params: {
          prompt,
          model_id
        }
      });

      if (data.imageUrl) {
        const imageUrl = data.imageUrl;
        const imagePath = path.join(__dirname, "cache", `reality.png`);
        const { data: imageStream } = await axios.get(imageUrl, { responseType: "stream" });
        
        const writer = fs.createWriteStream(imagePath);
        imageStream.pipe(writer);

        writer.on("finish", () => {
          const stream = fs.createReadStream(imagePath);
          message.reply({
            body: "",
            attachment: stream
          });
        });

        writer.on("error", (err) => {
          console.error("Error writing image to file:", err);
          message.reply("❌ | An error occurred while saving the image. Please try again later.");
        });

      } else {
        throw new Error("Image URL not found in response");
      }
    } catch (error) {
      console.error("Error:", error.message);
      message.reply("❌ | An error occurred. Please try again later.");
    }
  }
};
            
