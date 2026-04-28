// ============================================
// 🎯 QUOTES FILE - SUPER EASY TO EDIT!
// ============================================
// TO ADD NEW QUOTES:
// 1. Just add new lines inside the arrays below
// 2. Keep the comma after each quote (except the last one)
// 3. That's it! No other changes needed
// ============================================

// ➕ ADDITION (+) → MOTIVATIONAL QUOTES
const motivationQuotes = [
    "✨ You don't have to be perfect to be amazing.",
    "💪 Small steps every day lead to big results.",
    "🚀 Your only limit is your mind. Add belief, subtract doubt!",
    "🌟 Every expert was once a beginner. Keep adding knowledge!",
    "🔥 The harder you work, the luckier you get. Keep going!",
    "💯 You are capable of amazing things. Add one more step today!",
    "⚡ Don't stop when you're tired. Stop when you're done!",
    "🎯 Dream it. Add action. Achieve it.",
    "🧠 Your potential is infinite. Keep adding value to yourself.",
    "🌈 Believe in yourself and you're halfway there!",
    "🏆 Great things never come from comfort zones. Keep adding effort!",
    "💎 Every addition counts — even 1% better every day.",
    // 👇 PASTE YOUR NEW MOTIVATIONAL QUOTES BELOW 👇
    
];

// ➖ SUBTRACTION (-) → PICK-UP LINES (Clean & Fun)
const pickupLines = [
    "💕 Are you a minus sign? Because you take my breath away.",
    "😍 Are you made of copper and tellurium? Because you're Cu-Te!",
    "💖 You + Me = Perfect Equation, no subtraction needed.",
    "✨ Are you a calculator? Because you add value to my life.",
    "💫 Do you believe in love at first calculation?",
    "🌟 You must be 90° because you're looking right!",
    "💗 Are you a square root? Because you've got me rooting for you!",
    "⭐ You're cute as an angle in a world of right angles!",
    "💞 If you were a number, you'd be 10 out of 10!",
    "❤️ You subtract my stress and multiply my happiness!",
    "🫶 Mind if I calculate the distance to your heart?",
    "😘 Every minus without you feels like negative joy.",
    // 👇 PASTE YOUR NEW PICK-UP LINES BELOW 👇
    
];

// ➗ DIVISION (÷) → FUNNY JOKES (Trending Style)
const funnyJokes = [
    "😂 Why was the math book sad? It had too many problems!",
    "🤣 What do you call a number that can't keep still? A roamin' numeral!",
    "😆 Why did the student eat his homework? The teacher said it was a piece of cake!",
    "🤪 What's a math teacher's favorite dessert? Pi! 🥧",
    "😅 Why is 6 afraid of 7? Because 7 ate 9!",
    "😂 Parallel lines have so much in common... it's a shame they'll never meet!",
    "🤣 What did the zero say to the eight? Nice belt!",
    "😆 Why don't scientists trust atoms? Because they make up everything!",
    "🤪 What do you get when you cross a snowman and a vampire? Frostbite!",
    "😂 Why did the equal sign break up? It felt unequal in the relationship!",
    "🎭 I asked Siri to divide my problems by zero... Now my phone is confused.",
    "🍕 Why is 10 afraid of 7? Because 7 8 9, but 10 divided by 2 is 5-ever!",
    // 👇 PASTE YOUR NEW JOKES BELOW 👇
    
];

// ✖️ MULTIPLICATION (×) → TASKS/ACTIONS
const taskActions = [
    "🏋️ Do 10 jumping jacks RIGHT NOW!",
    "🧘 Take 5 deep breaths. In... and out...",
    "💪 Do 15 push-ups! No excuses!",
    "🏃 Stand up and stretch for 10 seconds!",
    "✍️ Write down one thing you're grateful for!",
    "💧 Drink a glass of water - stay hydrated!",
    "🧠 Close your eyes and count to 20 slowly!",
    "🎵 Hum your favorite song for 10 seconds!",
    "😊 Smile at yourself in the mirror!",
    "🙏 Say one nice thing about yourself right now!",
    "🤸 Do 8 squats — get that energy flowing!",
    "📢 Compliment someone (or yourself) out loud!",
    // 👇 PASTE YOUR NEW TASKS BELOW 👇
    
];

// ❓ PERCENTAGE (%) → TOUGH/MEME QUESTIONS
const toughQuestions = [
    "🤔 If you're 10% smarter today than yesterday, what did you learn?",
    "🧐 What's one belief you held that turned out to be wrong?",
    "🤯 If you could only keep 20% of your memories, which would you choose?",
    "😤 What's 100% of something you've been putting off?",
    "🤨 If success was 99% failure, would you still try?",
    "😏 What's the one thing you'd change about today if you could?",
    "🧠 What percentage of your potential are you actually using?",
    "🤔 Be honest: what's something you've been avoiding?",
    "🤯 If life gave you 50% off coupon for anything, what would you buy?",
    "💭 What is 0% chance but you still hope for it often?",
    "📉 If confidence dropped by 15% today, how would you raise it?",
    "🔥 If procrastination was 99%, what's the 1% you'd do anyway?",
    // 👇 PASTE YOUR NEW QUESTIONS BELOW 👇
    
];

// ============================================
// 🔧 DON'T EDIT BELOW (Advanced logic, but works perfectly)
// ============================================

function getRandomFromArray(arr, lastQuoteMap, opKey) {
    if (!arr.length) return "✨ Stay awesome ✨";
    if (arr.length === 1) return arr[0];
    
    let randomIndex = Math.floor(Math.random() * arr.length);
    let candidate = arr[randomIndex];
    
    while (candidate === lastQuoteMap[opKey] && arr.length > 1) {
        randomIndex = Math.floor(Math.random() * arr.length);
        candidate = arr[randomIndex];
    }
    
    return candidate;
}

// Track last used quotes to avoid repeats
let lastQuoteTracker = {
    '+': null,
    '-': null,
    '÷': null,
    '×': null,
    '%': null
};

function getContentByOperation(operationSymbol) {
    let quoteText = "";
    let quoteType = "";
    let quoteIcon = "";
    
    switch(operationSymbol) {
        case '+':
            quoteText = getRandomFromArray(motivationQuotes, lastQuoteTracker, '+');
            lastQuoteTracker['+'] = quoteText;
            quoteType = "🔥 Motivation";
            quoteIcon = "🚀";
            break;
        case '-':
            quoteText = getRandomFromArray(pickupLines, lastQuoteTracker, '-');
            lastQuoteTracker['-'] = quoteText;
            quoteType = "💕 Pick-up Line";
            quoteIcon = "💖";
            break;
        case '÷':
            quoteText = getRandomFromArray(funnyJokes, lastQuoteTracker, '÷');
            lastQuoteTracker['÷'] = quoteText;
            quoteType = "😂 Funny Joke";
            quoteIcon = "🎭";
            break;
        case '×':
            quoteText = getRandomFromArray(taskActions, lastQuoteTracker, '×');
            lastQuoteTracker['×'] = quoteText;
            quoteType = "🎯 Action Task";
            quoteIcon = "⚡";
            break;
        case '%':
            quoteText = getRandomFromArray(toughQuestions, lastQuoteTracker, '%');
            lastQuoteTracker['%'] = quoteText;
            quoteType = "🧠 Deep Question";
            quoteIcon = "🤯";
            break;
        default:
            quoteText = "✨ Do math & get inspired ✨";
            quoteType = "🌟 Vibe";
            quoteIcon = "✨";
    }
    
    return { text: quoteText, type: quoteType, icon: quoteIcon };
}
