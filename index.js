
const TelegramBot = require('node-telegram-bot-api');

// Replace with your own token  
const token = '7266098764:AAECcDUnBWcU9WiGq03BKaO77GEQ9eBLTJ8';
const bot = new TelegramBot(token, { polling: true });

const personalInfo = {
    Firstname: '', Lastname: '', Gender: '',Birthday: '', Address:'', Email: '', Phone_Number: '', CPN: '', Job: ''};
    
let registerflag = false; 

// Handler for the /start command  
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Define the keyboard layout  
    const keyboard = [
        [{ text: 'Flappy Bird', url:'https://t.me/daultons_bot/flappybird', callback_data: 'flappybird' }]
    ];

    // Create inline keyboard markup  
    const opts = {
        reply_markup: {
            inline_keyboard: keyboard
        }
    };

    // Send message with inline keyboard  
    bot.sendMessage(chatId, 'Play Flappybird', opts);
});

// // Handler for when a button is pressed  
// bot.on('callback_query', (callbackQuery) => {
//     const chatId = callbackQuery.message.chat.id;
//     const data = callbackQuery.data;

//     // Respond to the button click  
//     bot.sendMessage(chatId, `You clicked ${data}`);
//     });

bot.onText(/\/intro/, (msg) => {
    const chatId = msg.chat.id;
    const message =  "⭐Introducing our state-of-the-art automation bot, designed to streamline your online experience and elevate your productivity to new heights. \n👍This innovative tool effortlessly signs you up for websites and applies for jobs on your behalf, saving you time and energy. \n😎By harnessing the power of automation, you can boost your work efficiency by over 80%. \n😍Embrace the future of productivity and let our bot handle the tedious tasks, allowing you to focus on what truly matters. \n❤Use your bot today!❤";
    bot.sendMessage(chatId, message);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "I am here to /help you.\nClick /selectsite to select the site where you are going to apply.\nClick /register to register your personal info. \nClick /intro to see the introduction of this bot is.\nClick /help to see how to use this bot.")
})

bot.onText(/\/register/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Please register your personal info.");
    registerflag = true;
})

bot.on('message', (msg) => {
    chatId = msg.chat.id;
    if(registerflag) {
        const items = msg.text.split(',');
        
                personalInfo.Firstname = items[0]; 
                personalInfo.Lastname = items[1]; 
                personalInfo.Gender = items[2]; 
                personalInfo.Birthday = items[3]; 
                personalInfo.Address = items[4]; 
                personalInfo.Email = items[5]; 
                personalInfo.Phone_Number = items[6]; 
                personalInfo.CPN = items[7]; 
                personalInfo.Job = items[8];                   

        const reply = formatUserData(personalInfo);
        bot.sendMessage(chatId, `This is your personal Info you have just typed.\n\n${reply}`);
    }
    registerflag = false;
})

function formatUserData(data) {
    return Object.entries(data)
    .map(([key, value]) => `${key}:\t\t${value}`).join('\n');
}
