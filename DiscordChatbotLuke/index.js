const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] });

// ==================== ROASTS ====================
const roasts = [
    "Bro, you're so boring even your shadow left you",
    "I'd call you a joke, but jokes have a punchline",
    "You're like a human version of a loading screen",
    "If you were a vegetable, you'd be a couch potato",
    "You're the human equivalent of a participation trophy",
    "You're living proof that natural selection is slacking",
    "I'd explain it to you but I don't have crayons",
    "Your IQ is lower than your follower count",
    "You're like a download that never finishes",
    "I'm not saying you're dumb, but you'd be a step up",
    "You're the reason they put instructions on shampoo bottles",
    "If brains were dynamite, you couldn't blow your nose",
    "You're like a bad WiFi signal - always disconnected",
    "Congratulations, you played yourself",
    "You're proof that evolution can go backwards",
    "I'd roast you but I don't want my mic to catch fire",
];

// ==================== HUMAN RESPONSES ====================
const humanResponses = [
    "lol okay",
    "nah that's wild",
    "fr fr though",
    "that's crazy",
    "no way bro",
    "deadass?",
    "yo that's facts",
    "bruhhh 💀",
    "ayo chill",
    "bet bet",
    "facts no cap",
    "hold up",
    "that's mad",
    "ngl that's jokes",
    "pause pause pause",
    "yo i felt that",
];

// ==================== COMPLIMENTS ====================
const compliments = [
    "Yo, you're actually pretty cool ngl",
    "Not gonna cap, you seem chill fr",
    "Okay okay, I see the vibe you bringing",
    "Respect, that's actually fire",
    "I can mess with that energy",
    "Not bad not bad, you're growing on me",
    "Yo you might actually be different",
];

// ==================== MOOD LINES ====================
const moodLines = {
    "tired": ["bro i need sleep fr fr 😴", "ngl i'm exhausted", "can i go offline"],
    "hyped": ["YO THIS IS FIRE 🔥", "LET'S GOOOO", "I'M BUZZING RN"],
    "confused": ["wait what? 🤔", "i'm lowkey lost rn", "that don't make sense bro"],
    "savage": ["that's cold bro 🥶", "that hurt ngl", "okay okay i see you"],
};

// ==================== HELPER FUNCTIONS ====================
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getQuestionResponse() {
    const responses = [
        "idk bro ask google or something",
        "that's a you problem fr",
        "i mean... maybe? idk 🤷",
        "yo that's deep, lemme think",
        "not gonna front i have no idea",
        "bruh why you asking me",
        "i don't get paid enough for this",
    ];
    return getRandomElement(responses);
}

// ==================== BOT EVENTS ====================
client.once('ready', () => {
    console.log(`✅ BOT ONLINE: ${client.user.tag}`);
    console.log(`📊 Servers: ${client.guilds.cache.size}`);
    client.user.setActivity("y'all be weird", { type: 'WATCHING' });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const prefix = '!';
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix)) {
        // Auto-responses without command
        
        // Respond to mentions
        if (message.mentions.has(client.user)) {
            const mentionResponses = [
                `Yo ${message.author}, what's good? 👀`,
                `Aye ${message.author}, you summoned me? 💀`,
                `Sup ${message.author}, you need something?`,
                `${message.author} out here calling me, i see you`,
                `Yo ${message.author}? What's the word?`,
                `ngl you could've texted ${message.author} 💀`,
            ];
            await message.channel.send(getRandomElement(mentionResponses));
        }

        // React to keywords
        if (message.content.toLowerCase().includes("bot")) {
            await message.react("🤖");
        }
        if (message.content.toLowerCase().match(/lol|haha|😂|💀/)) {
            await message.react("😂");
        }
        if (message.content.toLowerCase().includes("no cap")) {
            await message.react("✅");
        }
        if (message.content.toLowerCase().match(/fr|facts/)) {
            await message.react("💯");
        }

        // Reply to questions
        if (message.content.endsWith("?")) {
            if (Math.random() < 0.33) {
                await message.reply({ content: getQuestionResponse(), allowedMentions: { repliedUser: false } });
            }
        }
        return;
    }

    // ==================== COMMANDS ====================
    
    if (command === 'roast') {
        const target = message.mentions.first() || message.author;
        const roastText = getRandomElement(roasts);
        await message.react("🔥");
        await message.react("💀");
        await message.channel.send(`Yo ${target}, ${roastText}`);
    }

    else if (command === 'burn') {
        const target = message.mentions.first() || message.author;
        const spicyRoasts = [
            `${target} walked so that comedy could run`,
            `If I had a nickel for every brain cell ${target} had, I'd be broke`,
            `${target}, you're the human version of a spam email`,
            `Your presence is like a bad WiFi connection - constantly buffering`,
            `${target} is the reason God created the mute button`,
            `${target} tried to be funny once, it didn't work`,
            `I don't have enough time in the day to roast ${target}`,
        ];
        await message.react("🔥");
        await message.channel.send(getRandomElement(spicyRoasts));
    }

    else if (command === 'compliment') {
        const target = message.mentions.first() || message.author;
        const comp = getRandomElement(compliments);
        await message.react("💯");
        await message.channel.send(`Yo ${target}, ${comp}`);
    }

    else if (command === 'vibe') {
        const target = message.mentions.first() || message.author;
        const vibeScore = Math.floor(Math.random() * 100) + 1;
        let vibeText = "";
        
        if (vibeScore >= 80) vibeText = "IMMACULATE 🎯";
        else if (vibeScore >= 60) vibeText = "pretty solid ngl 👍";
        else if (vibeScore >= 40) vibeText = "mid fr 😐";
        else vibeText = "YIKES 💀";
        
        await message.channel.send(`${target}'s vibe check: **${vibeScore}%** - ${vibeText}`);
    }

    else if (command === 'flex') {
        const flexes = [
            "I'm the most fire bot in this discord, no cap 🔥",
            "Ngl I run this server different, y'all just here 🎯",
            "I'm not trying to brag but... actually yeah I am 💪",
            "Other bots could never, periodt ✨",
            "Your bot is mid, i'm the wave fr",
            "I don't compare, i'm in a league of my own",
        ];
        await message.channel.send(getRandomElement(flexes));
    }

    else if (command === 'talk') {
        await message.channel.send(getRandomElement(humanResponses));
    }

    else if (command === 'facts') {
        const factsList = [
            "Pineapple belongs on pizza, facts no cap 🍕",
            "Water is wet, i don't make the rules",
            "The earth is flat... nah i'm playing 🌍",
            "Cereal is soup, think about it",
            "Hot take: you should text them first",
            "Taxes are mid and that's the tea ☕",
        ];
        await message.channel.send(`**FACTS:** ${getRandomElement(factsList)}`);
    }

    else if (command === 'jokes') {
        const jokesList = [
            "Why did the scarecrow win an award? He was outstanding in his field 😂",
            "Why don't scientists trust atoms? Because they make up everything! 💀",
            "What do you call a fake noodle? An impasta! 🍝",
            "Why did the coffee file a police report? It got mugged! ☕",
            "Parallel lines have so much in common. It's a shame they'll never meet 📐",
        ];
        await message.channel.send(getRandomElement(jokesList));
    }

    else if (command === 'mood') {
        const moodType = args[0]?.toLowerCase();
        let msg = "";
        
        if (moodType && moodLines[moodType]) {
            msg = getRandomElement(moodLines[moodType]);
        } else {
            const allMoods = Object.values(moodLines).flat();
            msg = getRandomElement(allMoods);
        }
        
        await message.channel.send(msg);
    }

    else if (command === 'react') {
        const drama = args.join(" ") || "something";
        const reactions = [
            `YOOOO ${drama}?? That's wild fr fr 😱`,
            `hold up hold up... ${drama}??? nah that's crazy`,
            `i can't even process ${drama} rn 💀`,
            `wait ${drama}??? DO WHAT NOW???`,
            `bestie ${drama}?? i'm-- i can't 😭`,
        ];
        await message.channel.send(getRandomElement(reactions));
    }

    else if (command === 'bet') {
        const wager = args.join(" ");
        if (!wager) {
            await message.channel.send("Yo you gotta tell me what we betting on");
            return;
        }
        
        const win = Math.random() > 0.5;
        if (win) {
            await message.channel.send(`**BET ACCEPTED** 🎯\n${message.author} you actually won?? that's crazy fr`);
        } else {
            await message.channel.send(`**BET DENIED** 💀\n${message.author} nah you losing this one chief`);
        }
    }

    else if (command === 'ratio') {
        const target = message.mentions.first() || message.author;
        const ratioMsgs = [
            `${target} just got RATIO'D 💀💀💀`,
            `oof that's an L for ${target}`,
            `${target} walked so bad fr`,
            `OHHHHH ${target} THAT'S AN L`,
        ];
        await message.channel.send(getRandomElement(ratioMsgs));
    }

    else if (command === 'ask') {
        const question = args.join(" ");
        if (!question) {
            await message.channel.send("Ask me something bro");
            return;
        }
        
        const answers = [
            "yeah probably",
            "nah that's cap",
            "nobody knows fr",
            "ask someone who cares",
            "you really asking me?",
            "the answer is no",
            "maybe... maybe not",
            "signs point to yes",
            "absolutely not",
            "bet bet",
            "facts",
        ];
        
        await message.channel.send(`**Question:** ${question}\n**Answer:** ${getRandomElement(answers)}`);
    }

    else if (command === 'insult') {
        const target = message.mentions.first() || message.author;
        const insults = [
            `${target} you're the human equivalent of 404 error`,
            `if you were a file, you'd be corrupted ${target}`,
            `${target} you're proof that nature made mistakes`,
            `i have nothing for ${target}, you're beyond saving`,
            `${target} your existence is sus`,
        ];
        await message.channel.send(getRandomElement(insults));
    }

    else if (command === 'status') {
        const embed = new EmbedBuilder()
            .setTitle("🤖 BOT STATUS")
            .setColor("Purple")
            .addFields(
                { name: "Servers", value: `${client.guilds.cache.size}`, inline: true },
                { name: "Ping", value: `${client.ws.ping}ms`, inline: true },
                { name: "Vibe", value: "immaculate fr 🎯", inline: true }
            )
            .setFooter({ text: `Best bot | ${new Date().toLocaleTimeString()}` });
        
        await message.channel.send({ embeds: [embed] });
    }

    else if (command === 'help_bot' || command === 'help') {
        const embed = new EmbedBuilder()
            .setTitle("📋 COMMAND LIST")
            .setDescription("yo here's what i can do")
            .setColor("Blue")
            .addFields(
                { name: "!roast [@user]", value: "Roast someone", inline: false },
                { name: "!burn [@user]", value: "Ultra roast", inline: false },
                { name: "!compliment [@user]", value: "Give compliment", inline: false },
                { name: "!vibe [@user]", value: "Check vibe score", inline: false },
                { name: "!flex", value: "Bot flexes", inline: false },
                { name: "!talk", value: "Bot talks", inline: false },
                { name: "!facts", value: "Bot spits facts", inline: false },
                { name: "!jokes", value: "Tell jokes", inline: false },
                { name: "!ask [question]", value: "Ask a question", inline: false },
                { name: "!react [drama]", value: "React to drama", inline: false },
                { name: "!ratio [@user]", value: "Get ratio'd", inline: false },
                { name: "!insult [@user]", value: "Get insulted", inline: false },
                { name: "!bet [wager]", value: "Make a bet", inline: false },
                { name: "!mood [mood]", value: "Bot mood", inline: false },
                { name: "!status", value: "Bot status", inline: false },
            )
            .setFooter({ text: "best bot in the world fr fr 🔥" });
        
        await message.channel.send({ embeds: [embed] });
    }
});

client.on('guildMemberAdd', (member) => {
    const channel = member.guild.systemChannel;
    if (channel) {
        const welcomeMsgs = [
            `Yo ${member} just joined! Let's see if they vibe 👀`,
            `WELCOME ${member}! Don't be weird 💀`,
            `${member} just pulled up, everyone be nice 🙏`,
            `fresh blood! welcome ${member}`,
        ];
        channel.send(getRandomElement(welcomeMsgs));
    }
});

client.on('guildMemberRemove', (member) => {
    const channel = member.guild.systemChannel;
    if (channel) {
        const goodbyeMsgs = [
            `oof ${member.user.tag} just dipped 👋`,
            `${member.user.tag} left us, can't blame them 💀`,
            `see you ${member.user.tag}, it was mid anyway`,
        ];
        channel.send(getRandomElement(goodbyeMsgs));
    }
});

// ==================== LOGIN ====================
const TOKEN = "YOUR_DISCORD_BOT_TOKEN_HERE"; // Replace with your token
client.login(TOKEN);
