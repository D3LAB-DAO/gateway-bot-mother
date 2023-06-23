const TelegramBot = require('node-telegram-bot-api');

const config = require("../config/bot.json");

const token = config.botKey;
const bot = new TelegramBot(token, { polling: true });

let expectingUrl = false;

bot.onText(/\/help/, (msg) => {
    const helpMessage = `
Here are the commands you can use:
/newProject - enter this command, then input a URL when prompted.
`;
    bot.sendMessage(msg.chat.id, helpMessage);
});

bot.onText(/\/newProject/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please input the URL.');
    expectingUrl = true;
});

bot.on('message', (msg) => {
    if (expectingUrl) {
        // Add code to handle the URL here. For example, save the URL to a database.
        // const url = msg.text;

        bot.sendMessage(msg.chat.id, 'The process has been completed.');
        expectingUrl = false;
    }
});
