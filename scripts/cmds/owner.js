const { getStreamFromURL } = require("fb-watchman");
module.exports = {
  config: {
    name: "owner",
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "0info about bot and owner",
    category: "arafat",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const imgURL = "https://i.imgur.com/ESkGzAy.gif";
    const attachment = await global.utils.getStreamFromURL(imgURL);

    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;

    const ment = [{ id: id, tag: name }];
    const a = "ᦓ ꪊ ᛕ ꪊ ꪀ ꪖ";
    const b = " - ";
    const c = "👀ꪖ᥅ꪖᠻꪖꪻ🍼";
const e = "𝐌𝐚𝐥𝐞";
    const d = "xuzt.arafat";
const f = "facebook.com/xuzt.arafat";
const g = "𝐒𝐢𝐧𝐠𝐥𝐞";

    message.reply({ 
      body: `${name}, ℍ𝕖𝕣𝕖 𝕚𝕤 𝕥𝕙𝕖 𝕚𝕟𝕗𝕠𝕣𝕞𝕒𝕥𝕚𝕠𝕟
🌸 𝗕𝗼𝘁'𝘀 𝗻𝗮𝗺𝗲: ${a}
🌸 𝗕𝗼𝘁'𝘀 𝗽𝗿𝗲𝗳𝗶𝘅: ${b}  
🌸 𝗢𝘄𝗻𝗲𝗿: ${c}
🌸 𝗚𝗲𝗻𝗱𝗲𝗿: ${e}
🌸 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿: ${d}
🌸 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${f}
🌸 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽: ${g}`,
mentions: ment,
      attachment: attachment });
  }
};
