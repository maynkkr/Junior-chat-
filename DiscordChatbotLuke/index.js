import discord
from discord.ext import commands, tasks
import random
import asyncio
from datetime import datetime

# Bot setup
intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix="!", intents=intents)

# ==================== ROASTS ====================
roasts = [
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
]

# ==================== HUMAN RESPONSES ====================
human_responses = [
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
]

# ==================== COMPLIMENTS ====================
compliments = [
    "Yo, you're actually pretty cool ngl",
    "Not gonna cap, you seem chill fr",
    "Okay okay, I see the vibe you bringing",
    "Respect, that's actually fire",
    "I can mess with that energy",
    "Not bad not bad, you're growing on me",
    "Yo you might actually be different",
]

# ==================== FUNNY SCENARIOS ====================
funny_scenarios = [
    "bruh I just spilled my coffee thinking about that 😭",
    "okay that one caught me off guard fr fr 💀",
    "nah wait that was kinda funny not gonna lie",
    "YOOOO that's actually hilarious 😂",
    "i'm crying that was too good",
    "wait hold up let me process that 🤔",
    "that's wild i can't even respond",
]

# ==================== QUESTION RESPONSES ====================
def get_question_response():
    return random.choice([
        "idk bro ask google or something",
        "that's a you problem fr",
        "i mean... maybe? idk 🤷",
        "yo that's deep, lemme think",
        "not gonna front i have no idea",
        "bruh why you asking me",
        "i don't get paid enough for this",
    ])

# ==================== MOOD LINES ====================
mood_lines = {
    "tired": ["bro i need sleep fr fr 😴", "ngl i'm exhausted", "can i go offline"],
    "hyped": ["YO THIS IS FIRE 🔥", "LET'S GOOOO", "I'M BUZZING RN"],
    "confused": ["wait what? 🤔", "i'm lowkey lost rn", "that don't make sense bro"],
    "savage": ["that's cold bro 🥶", "that hurt ngl", "okay okay i see you"],
}

@bot.event
async def on_ready():
    print(f'✅ BOT ONLINE: {bot.user}')
    print(f'📊 Servers: {len(bot.guilds)}')
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="y'all be weird"))

@bot.command(name='roast', help='Get absolutely roasted')
async def roast(ctx, member: discord.Member = None):
    """Roast someone"""
    target = member or ctx.author
    roast_text = random.choice(roasts)
    
    # Add reactions for effect
    await ctx.message.add_reaction("🔥")
    await ctx.message.add_reaction("💀")
    
    await ctx.send(f"Yo {target.mention}, {roast_text}")

@bot.command(name='compliment', help='Get a nice compliment')
async def compliment(ctx, member: discord.Member = None):
    """Get complimented"""
    target = member or ctx.author
    comp = random.choice(compliments)
    
    await ctx.message.add_reaction("💯")
    await ctx.send(f"Yo {target.mention}, {comp}")

@bot.command(name='burn', help='Get ultra roasted')
async def burn(ctx, member: discord.Member = None):
    """Ultra spicy roast"""
    target = member or ctx.author
    spicy_roasts = [
        f"{target.mention} walked so that comedy could run",
        f"If I had a nickel for every brain cell {target.mention} had, I'd be broke",
        f"{target.mention}, you're the human version of a spam email",
        f"Your presence is like a bad WiFi connection - constantly buffering",
        f"{target.mention} is the reason God created the mute button",
        f"{target.mention} tried to be funny once, it didn't work",
        f"I don't have enough time in the day to roast {target.mention}",
    ]
    
    await ctx.message.add_reaction("🔥")
    await ctx.send(random.choice(spicy_roasts))

@bot.command(name='flex', help='Bot flexes')
async def flex(ctx):
    """Bot flexes on everyone"""
    flexes = [
        "I'm the most fire bot in this discord, no cap 🔥",
        "Ngl I run this server different, y'all just here 🎯",
        "I'm not trying to brag but... actually yeah I am 💪",
        "Other bots could never, periodt ✨",
        "Your bot is mid, i'm the wave fr",
        "I don't compare, i'm in a league of my own",
    ]
    await ctx.send(random.choice(flexes))

@bot.command(name='talk', help='Bot talks')
async def talk(ctx):
    """Bot says something"""
    await ctx.send(random.choice(human_responses))

@bot.command(name='facts', help='Bot spits facts')
async def facts(ctx):
    """Spit facts"""
    facts_list = [
        "Pineapple belongs on pizza, facts no cap 🍕",
        "Water is wet, i don't make the rules",
        "The earth is flat... nah i'm playing 🌍",
        "Cereal is soup, think about it",
        "Hot take: you should text them first",
        "Taxes are mid and that's the tea ☕",
    ]
    await ctx.send(f"**FACTS:** {random.choice(facts_list)}")

@bot.command(name='mood', help='Bot says its mood')
async def mood(ctx, mood_type: str = None):
    """Bot expresses mood"""
    if mood_type and mood_type.lower() in mood_lines:
        msg = random.choice(mood_lines[mood_type.lower()])
    else:
        all_moods = [line for lines in mood_lines.values() for line in lines]
        msg = random.choice(all_moods)
    
    await ctx.send(msg)

@bot.command(name='react', help='React to drama')
async def react(ctx, *, drama: str = None):
    """React to someone's drama"""
    if not drama:
        drama = "something"
    
    reactions = [
        f"YOOOO {drama}?? That's wild fr fr 😱",
        f"hold up hold up... {drama}??? nah that's crazy",
        f"i can't even process {drama} rn 💀",
        f"wait {drama}??? DO WHAT NOW???",
        f"bestie {drama}?? i'm-- i can't 😭",
    ]
    await ctx.send(random.choice(reactions))

@bot.command(name='vibe', help='Check the vibe')
async def vibe(ctx, member: discord.Member = None):
    """Check someone's vibe"""
    target = member or ctx.author
    vibe_scores = random.randint(1, 100)
    
    if vibe_scores >= 80:
        vibe = "IMMACULATE 🎯"
    elif vibe_scores >= 60:
        vibe = "pretty solid ngl 👍"
    elif vibe_scores >= 40:
        vibe = "mid fr 😐"
    else:
        vibe = "YIKES 💀"
    
    await ctx.send(f"{target.mention}'s vibe check: **{vibe_scores}%** - {vibe}")

@bot.command(name='bet', help='Make a deal')
async def bet(ctx, *, wager: str = None):
    """Make a bet"""
    if not wager:
        await ctx.send("Yo you gotta tell me what we betting on")
        return
    
    win = random.choice([True, False])
    if win:
        await ctx.send(f"**BET ACCEPTED** 🎯\n{ctx.author.mention} you actually won?? that's crazy fr")
    else:
        await ctx.send(f"**BET DENIED** 💀\n{ctx.author.mention} nah you losing this one chief")

@bot.command(name='ratio', help='Get ratioed')
async def ratio(ctx, member: discord.Member = None):
    """Get ratio'd"""
    target = member or ctx.author
    ratio_msgs = [
        f"{target.mention} just got RATIO'D 💀💀💀",
        f"oof that's an L for {target.mention}",
        f"{target.mention} walked so bad fr",
        f"OHHHHH {target.mention} THAT'S AN L",
    ]
    await ctx.send(random.choice(ratio_msgs))

@bot.command(name='ask', help='Ask the bot something')
async def ask(ctx, *, question: str = None):
    """Ask the bot a question"""
    if not question:
        await ctx.send("Ask me something bro")
        return
    
    answers = [
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
    ]
    
    await ctx.send(f"**Question:** {question}\n**Answer:** {random.choice(answers)}")

@bot.command(name='insult', help='Get insulted')
async def insult(ctx, member: discord.Member = None):
    """Get insulted - harder than roast"""
    target = member or ctx.author
    insults = [
        f"{target.mention} you're the human equivalent of 404 error",
        f"if you were a file, you'd be corrupted {target.mention}",
        f"{target.mention} you're proof that nature made mistakes",
        f"i have nothing for {target.mention}, you're beyond saving",
        f"{target.mention} your existence is sus",
    ]
    await ctx.send(random.choice(insults))

@bot.command(name='jokes', help='Tell jokes')
async def jokes(ctx):
    """Tell jokes"""
    jokes_list = [
        "Why did the scarecrow win an award? He was outstanding in his field 😂",
        "Why don't scientists trust atoms? Because they make up everything! 💀",
        "What do you call a fake noodle? An impasta! 🍝",
        "Why did the coffee file a police report? It got mugged! ☕",
        "Parallel lines have so much in common. It's a shame they'll never meet 📐",
    ]
    await ctx.send(random.choice(jokes_list))

@bot.command(name='status', help='Bot status')
async def status(ctx):
    """Check bot status"""
    embed = discord.Embed(title="🤖 BOT STATUS", color=discord.Color.purple())
    embed.add_field(name="Servers", value=len(bot.guilds), inline=True)
    embed.add_field(name="Ping", value=f"{round(bot.latency * 1000)}ms", inline=True)
    embed.add_field(name="Vibe", value="immaculate fr 🎯", inline=True)
    embed.set_footer(text=f"Best bot | {datetime.now().strftime('%H:%M:%S')}")
    await ctx.send(embed=embed)

@bot.command(name='help_bot', help='Bot commands')
async def help_bot(ctx):
    """Show all commands"""
    embed = discord.Embed(title="📋 COMMAND LIST", description="yo here's what i can do", color=discord.Color.blurple())
    
    commands_list = {
        "!roast [@user]": "Roast someone",
        "!burn [@user]": "Ultra roast",
        "!compliment [@user]": "Give compliment",
        "!vibe [@user]": "Check vibe score",
        "!flex": "Bot flexes",
        "!talk": "Bot talks",
        "!facts": "Bot spits facts",
        "!jokes": "Tell jokes",
        "!ask [question]": "Ask a question",
        "!react [drama]": "React to drama",
        "!ratio [@user]": "Get ratio'd",
        "!insult [@user]": "Get insulted",
        "!bet [wager]": "Make a bet",
        "!mood [mood]": "Bot mood",
        "!status": "Bot status",
    }
    
    for cmd, desc in commands_list.items():
        embed.add_field(name=cmd, value=desc, inline=False)
    
    embed.set_footer(text="best bot in the world fr fr 🔥")
    await ctx.send(embed=embed)

@bot.event
async def on_message(message):
    """Smart message responses"""
    if message.author == bot.user:
        return
    
    # Respond to mentions
    if bot.user.mentioned_in(message):
        mention_responses = [
            f"Yo {message.author.mention}, what's good? 👀",
            f"Aye {message.author.mention}, you summoned me? 💀",
            f"Sup {message.author.mention}, you need something?",
            f"{message.author.mention} out here calling me, i see you",
            f"Yo {message.author.mention}? What's the word?",
            f"ngl you could've texted {message.author.mention} 💀",
        ]
        
        await message.channel.send(random.choice(mention_responses))
    
    # React to keywords
    if "bot" in message.content.lower():
        await message.add_reaction("🤖")
    
    if any(word in message.content.lower() for word in ["lol", "haha", "😂", "💀"]):
        await message.add_reaction("😂")
    
    if "no cap" in message.content.lower():
        await message.add_reaction("✅")
    
    if "fr" in message.content.lower() or "facts" in message.content.lower():
        await message.add_reaction("💯")
    
    # Smart replies to questions
    if message.content.endswith("?") and not message.content.startswith("!"):
        if random.randint(1, 3) == 1:
            await message.reply(get_question_response(), mention_author=False)
    
    await bot.process_commands(message)

@bot.event
async def on_member_join(member):
    """Welcome new members"""
    channel = member.guild.system_channel
    if channel:
        welcome_msgs = [
            f"Yo {member.mention} just joined! Let's see if they vibe 👀",
            f"WELCOME {member.mention}! Don't be weird 💀",
            f"{member.mention} just pulled up, everyone be nice 🙏",
            f"fresh blood! welcome {member.mention}",
        ]
        await channel.send(random.choice(welcome_msgs))

@bot.event
async def on_member_remove(member):
    """Say goodbye to members"""
    channel = member.guild.system_channel
    if channel:
        goodbye_msgs = [
            f"oof {member.mention} just dipped 👋",
            f"{member.mention} left us, can't blame them 💀",
            f"see you {member.mention}, it was mid anyway",
        ]
        await channel.send(random.choice(goodbye_msgs))

# ==================== MAIN ====================
if __name__ == "__main__":
    TOKEN = "YOUR_DISCORD_BOT_TOKEN_HERE"  # Replace with your token
    bot.run(TOKEN)
