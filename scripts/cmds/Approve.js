const fs = require('fs');
const ag = require('approvegroup');

module.exports = {
  config: {
    name: "approve",
    aliases: ["approval"],
    version: "2.0",
    role: 2,
    author: "Sheikh",
    cooldown: 5,
    longDescription: {
      en: "Command for Group Approval and Disapproval.",
    },
    category: "Developer",
    guide: {
      en: "{pn} (add/remove/list/count)"
    }
  },
  onStart: async function ({ api, event, threadsData, message, args }) {
    const threadsFile = 'threads.json';

    if (args.length < 1) {
      message.reply("Specify an action: !approve (add/remove/list/count)");
      return;
    }

    const action = args[0].toLowerCase();

    switch (action) {
      case "add":
      case "remove":
        if (!args[1]) {
          message.reply("Provide the thread ID.");
          return;
        }
        const groupId = args[1];
        const threadData = await threadsData.get(groupId);
        const name = threadData ? threadData.threadName : "Unknown";

        let threads = [];
        try {
          threads = JSON.parse(fs.readFileSync(threadsFile));
        } catch (err) {
          console.error('', err);
        }

        if (action === "add") {
          if (!threads.includes(groupId)) {
            ag.add(groupId);
            message.reply(`Group: ${name}\nTID: ${groupId}\nApproved! ✅`);
          } else {
            message.reply(`Group: ${name}\nTID: ${groupId}\nAlready Approved! ✅`);
          }
        } else if (action === "remove") {
          const index = threads.indexOf(groupId);
          if (index >= 0) {
            ag.del(groupId);
            message.reply(`Group: ${name}\nTID: ${groupId}\nDisapproved! ❌`);
          } else {
            message.reply(`Group: ${name}\nTID: ${groupId}\nNot Approved Before! ❌`);
          }
        }
        break;
      case "list":
        let approvedGroups = [];
        try {
          approvedGroups = JSON.parse(fs.readFileSync(threadsFile));
        } catch (err) {
          console.error('', err);
        }
        message.reply(`Total approved groups: ${approvedGroups.length}`);
        break;
      default:
        message.reply("Invalid action. Use `add`, `remove`, `list`, or `count`.");
    }
  }
};
