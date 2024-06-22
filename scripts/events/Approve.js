const fs = require('fs');
const { getStreamFromURL } = require("fb-watchman");

module.exports = {
  config: {
    name: "outall",
    aliases: ["outall"],
    version: "1.0",
    author: "rehat--",
    countDown: 5,
    role: 2,
    longDescription: {
      en: "Leave all unapproved threads"
    },
    category: "Developer",
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ api, args, message, event }) {
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);
    const imgURL = "https://i.ibb.co/2PQwZgf/image.gif";
    const attachment = await global.utils.getStreamFromURL(imgURL); 
    const approveList = JSON.parse(fs.readFileSync('threads.json', 'utf8'));
    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    const botUserID = api.getCurrentUserID();
    const unapprovedThreads = [];
    
    threadList.forEach(async (threadInfo) => {
      if (threadInfo.isGroup && threadInfo.threadID !== event.threadID && !approveList.includes(threadInfo.threadID)) {
        unapprovedThreads.push(threadInfo.name || threadInfo.threadID);
        api.sendMessage({
          body: `❌ | You Added The 𝗔𝗡𝗖𝗛𝗘𝗦𝗧𝗢𝗥 𝗔𝗜 Without Permission !!\n\n✧Take Permission From 𝗔𝗡𝗖𝗛𝗘𝗦𝗧𝗢𝗥 𝗔𝗜 Admin's to Use 𝗔𝗡𝗖𝗛𝗘𝗦𝗧𝗢𝗥 𝗔𝗜 In Your Group !!\n✧Join 𝗔𝗡𝗖𝗛𝗘𝗦𝗧𝗢𝗥 𝗔𝗜 Support GC to Contact With Admin's !!\n\n✧Type ${p}supportgc within 20 seconds.\n\n Team anchestor-_-`,
          attachment: attachment
        }, threadInfo.threadID);
        setTimeout(() => {
          api.removeUserFromGroup(botUserID, threadInfo.threadID);
        }, 20000);
      }
    });
    
    if (unapprovedThreads.length > 0) {
      const unapprovedMessage = `✅ | Successfully left all groups except approved threads.`;
      api.sendMessage(unapprovedMessage, event.threadID);
    } else {
      api.sendMessage("❌ | No unapproved groups to leave.", event.threadID);
    }
  }
        }
