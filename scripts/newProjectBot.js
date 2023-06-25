const TelegramBot = require('node-telegram-bot-api');

const config = require("../config/bot.json");

const token = config.botKey;
const bot = new TelegramBot(token, { polling: true });

let expectingUrl = false;

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const response = `
Hello! I'm your V8S bot.
I can help you create new projects. Here is the command you can use:

/newProject - start a new project and I will guide you through the process

Just type /newProject to get started!
`;
    bot.sendMessage(chatId, response);
});

bot.onText(/\/newProject/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please input the URL for the new project.');
    expectingUrl = true;
});

bot.on('message', (msg) => {
    if (expectingUrl) {
        // Add code to handle the URL here. For example, save the URL to a database.
        // const url = msg.text;

        bot.sendMessage(msg.chat.id, `Done. Your project has been newly registered in the "0x" V8S contract. Thank you! For questions, please contact lukepark@mg12.com.`);

        expectingUrl = false;
    }
});
