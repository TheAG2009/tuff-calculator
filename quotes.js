// ============================================
// 🎯 PURE QUOTES - NO ANSWERS, NO EXTRA TEXT
// Just motivational, funny, pick-up lines, tasks, deep questions
// ============================================

// ➕ ADD = MOTIVATION
const motivationList = [
    "The harder you work, the luckier you get. Keep going!",
    "You don't have to be perfect to be amazing.",
    "Small steps every day lead to big results.",
    "Your only limit is your mind.",
    "Every expert was once a beginner.",
    "Don't stop when you're tired. Stop when you're done!",
    "Dream it. Add action. Achieve it.",
    "Your potential is infinite.",
    "Believe in yourself and you're halfway there!",
    "Great things never come from comfort zones.",
    "You are capable of amazing things.",
    "Progress over perfection.",
    "Today's you is tomorrow's inspiration."
];

// ➖ SUBTRACT = PICK-UP LINES
const pickupList = [
    "Are you a minus sign? You take my breath away.",
    "You + Me = Perfect Equation.",
    "Are you a calculator? You add value to my life.",
    "You must be 90° because you're looking right!",
    "Are you a square root? You've got me rooting for you.",
    "You're cute as an angle.",
    "If you were a number, you'd be 10 out of 10.",
    "You subtract my stress and multiply my happiness.",
    "Every minus without you feels like negative joy.",
    "Do you have a name? Or can I call you mine?",
    "You're the missing variable in my equation.",
    "Is your name Google? Because you have everything I'm searching for."
];

// ➗ DIVIDE = FUNNY JOKES
const jokeList = [
    "Why was the math book sad? It had too many problems.",
    "What do you call a number that can't keep still? A roamin' numeral!",
    "Why did the student eat his homework? The teacher said it was a piece of cake!",
    "What's a math teacher's favorite dessert? Pi! 🥧",
    "Why is 6 afraid of 7? Because 7 ate 9!",
    "Parallel lines have so much in common... it's a shame they'll never meet.",
    "What did the zero say to the eight? Nice belt!",
    "Why don't scientists trust atoms? Because they make up everything.",
    "What do you get when you cross a snowman and a vampire? Frostbite!",
    "Why did the equal sign break up? It felt unequal in the relationship.",
    "I asked Siri to divide my problems by zero... Now my phone is confused.",
    "Why is 10 afraid of 7? Because 7 8 9, but 10 divided by 2 is 5-ever!"
];

// ✖️ MULTIPLY = TASKS / ACTIONS
const taskList = [
    "Do 10 jumping jacks RIGHT NOW!",
    "Take 5 deep breaths. In... and out...",
    "Do 15 push-ups! No excuses!",
    "Stand up and stretch for 10 seconds!",
    "Write down one thing you're grateful for!",
    "Drink a glass of water - stay hydrated!",
    "Close your eyes and count to 20 slowly!",
    "Hum your favorite song for 10 seconds!",
    "Smile at yourself in the mirror!",
    "Say one nice thing about yourself right now!",
    "Do 8 squats — get that energy flowing!",
    "Compliment someone (or yourself) out loud!"
];

// ❓ PERCENT = DEEP / MEME QUESTIONS
const questionList = [
    "If you're 10% smarter today than yesterday, what did you learn?",
    "What's one belief you held that turned out to be wrong?",
    "If you could only keep 20% of your memories, which would you choose?",
    "What's 100% of something you've been putting off?",
    "If success was 99% failure, would you still try?",
    "What's the one thing you'd change about today if you could?",
    "What percentage of your potential are you actually using?",
    "Be honest: what's something you've been avoiding?",
    "If life gave you 50% off coupon for anything, what would you buy?",
    "What is 0% chance but you still hope for it often?",
    "If confidence dropped by 15% today, how would you raise it?",
    "If procrastination was 99%, what's the 1% you'd do anyway?"
];

// ============================================
// TRACKING SYSTEM (no repeats in a row)
// ============================================
let lastUsed = {
    '+': null,
    '-': null,
    '÷': null,
    '×': null,
    '%': null
};

function getUniqueItem(arr, typeKey) {
    if (!arr.length) return "✨ Keep going! ✨";
    if (arr.length === 1) return arr[0];
    
    let randomIndex = Math.floor(Math.random() * arr.length);
    let candidate = arr[randomIndex];
    
    while (candidate === lastUsed[typeKey] && arr.length > 1) {
        randomIndex = Math.floor(Math.random() * arr.length);
        candidate = arr[randomIndex];
    }
    
    lastUsed[typeKey] = candidate;
    return candidate;
}

// Main function - returns ONLY quote text + label + icon
function getQuoteByOp(op) {
    let text = "";
    let label = "";
    let icon = "";
    
    switch(op) {
        case '+':
            text = getUniqueItem(motivationList, '+');
            label = "MOTIVATION";
            icon = "💪";
            break;
        case '-':
            text = getUniqueItem(pickupList, '-');
            label = "PICK-UP LINE";
            icon = "💕";
            break;
        case '÷':
            text = getUniqueItem(jokeList, '÷');
            label = "FUNNY JOKE";
            icon = "😂";
            break;
        case '×':
            text = getUniqueItem(taskList, '×');
            label = "DO THIS";
            icon = "⚡";
            break;
        case '%':
            text = getUniqueItem(questionList, '%');
            label = "DEEP QUESTION";
            icon = "🤔";
            break;
        default:
            text = "The harder you work, the luckier you get. Keep going!";
            label = "MOTIVATION";
            icon = "💪";
    }
    
    return { text, label, icon };
}
