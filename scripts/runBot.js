const {
    ethers
} = require("hardhat");
const v8sAddr = require("../config/contractAddrs.json").v8s;
const TelegramBot = require('node-telegram-bot-api');

const config = require("../config/teleBot.json");

const token = config.botKey;
const bot = new TelegramBot(token, {
    polling: true
});

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

bot.on('message', async (msg) => {
    if (expectingUrl) {
        const url = msg.text;
        try {
            const contract = await ethers.getContractAt("IV8S", v8sAddr);
            const tx = await contract.addProject(url);
            await tx.wait();
            const txhash = tx.hash; // "0x4835ffecaa958065b69a58e7382a790e742c0c9067efdaaca593a194ea904794";

            bot.sendMessage(msg.chat.id, `Done! 
            \nYour project has been newly registered in the *V8S contract*. 🎉
            \nYou can check the transaction here: [Transaction Hash](https://testnet.ftmscan.com/tx/${txhash}) 🔗
            \nFor any inquiries, please contact [lukepark@mg12.com](mailto:lukepark@mg12.com) 📩`, {
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            });

            expectingUrl = false;
        } catch (err) {
            console.log(err);
            bot.sendMessage(msg.chat.id, 'An error occurred while registering your project. Please try again later.');
        }
    }
});