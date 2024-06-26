module.exports = {
	config: {
		name: "tid",
		version: "1.2",
		author: "uronto pother Duronto madarchod mesbah ",
		countDown: 5,
		role: 0,
		description: {
			vi: "Xem id nhóm chat của bạn",
			en: "View threadID of your group chat"
		},
		category: "box chat",
		guide: {
			en: "{pn}"
		}
	},
  
  onStart: async function ({ api, event, args, message }) {
    try {
      const threadID = event.threadID;
      const threadInfo = await api.getThreadInfo(threadID);
      const threadName = threadInfo.threadName || 'Unnamed Thread';
      let threadIDMessage = `• Thread Name: ${threadName}\n• Thread ID: ${threadID}\n\n• Thread Link: https://www.facebook.com/messages/t/${threadID}`;
      if (threadInfo.inviteLink && threadInfo.inviteLink.enable) {
        threadIDMessage += `\n• Invite Link: ${threadInfo.inviteLink.link}`;
      } else {
        threadIDMessage += `\n• No invite link is available.`;
      }
      if (threadInfo.imageSrc) {
        const stream = await global.utils.getStreamFromURL(threadInfo.imageSrc);
        message.reply({
          body: threadIDMessage,
          attachment: stream
        });
      } else {
        message.reply({
          body: threadIDMessage
        });
      }
    } catch (error) {
      message.reply(`Error: ${error.message}`);
    }
  }
};
