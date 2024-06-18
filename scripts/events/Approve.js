const fs = require('fs');
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "approval",
    version: "1.0",
    author: "rulex/Loufi",
    shortDescription: {
      en: "approval mode by loufi",
      vi: "Rời khỏi tất cả các nhóm trừ những nhóm được liệt kê trong threads.json"
    },
    longDescription: {
      en: "Leaves all groups except those in threads.json and sends a message to the owner of the bot",
      vi: "Rời khỏi tất cả các nhóm trừ những nhóm được liệt kê trong threads.json và gửi một tin nhắn cho chủ sở hữu của thread ID 4"
    },
    category: "event"
  },
  onStart: async function ({ api, event, threadsData, message }) {
    const uid = "100072881080249";
    const groupId = event.threadID;
    const threadData = await threadsData.get(groupId);
    const name = threadData.threadName;
    let threads = [];
    try {
      threads = JSON.parse(fs.readFileSync('threads.json'));
    } catch (err) {
      console.error('', err);
    }
    if (!threads.includes(groupId) && (event.logMessageType == "log:subscribe") ) {
      message.send({body:"❌ | Added bot without admin's permission!!!\n\n❏Take permission from Admin Bot to use the Bot.\n\n❏ I will take leave in a minute.\n\n❏Join  Zone:\nhttps://m.me/j/AbbK73YPDlPCMDvd/\n\n\n Or type /supportgc — Bye Bye Guys",attachment: await getStreamFromURL("https://i.ibb.co/TqK1gM4/image.gif")});
      setTimeout(() => {
        api.removeUserFromGroup(api.getCurrentUserID(), groupId);
        api.sendMessage(`❌ Bot is added to a new group named: ${name} without approval \n❏Tid:${groupId}\n❏Name: ${name}\n❏Type:\n${global.GoatBot.config.prefix}approve add ${groupId}`, uid);
      }, 60000); // 2.5 seconds delay
    }
  }
}
