require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const OpenAI = require('openai');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

client.once('ready', () => {
  console.log(`${client.user.tag} is online`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a friendly Discord user. Talk naturally, casually, and briefly like a real person."
        },
        {
          role: "user",
          content: message.content
        }
      ]
    });

    await message.reply(response.choices[0].message.content);
  } catch (err) {
    console.error(err);
    message.reply("Something went wrong.");
  }
});

client.login(process.env.DISCORD_TOKEN);


