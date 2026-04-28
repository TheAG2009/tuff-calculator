// QUOTE GENERATOR CALCULATOR - DISPLAY SHOWS QUOTES, NOT NUMBERS!

let currentInput = "0";
let prevValue = "";
let currentOp = null;
let resetDisplay = false;

const displayEl = document.getElementById("display");
const quoteTextEl = document.getElementById("quoteText");
const quoteLabelEl = document.getElementById("quoteLabel");
const quoteIconEl = document.getElementById("quoteIcon");
const realTimeEl = document.getElementById("realTime");
const liveTimeEl = document.getElementById("liveTime");

// ========== REAL TIME CLOCK ==========
function updateRealTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    const shortTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
    
    if (realTimeEl) realTimeEl.textContent = timeString;
    if (liveTimeEl) liveTimeEl.textContent = shortTime;
}
updateRealTime();
setInterval(updateRealTime, 1000);

// ========== FULLSCREEN ==========
const fullscreenBtn = document.getElementById('fullscreenBtn');
function toggleFullscreen() {
    const doc = document.documentElement;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (doc.requestFullscreen) doc.requestFullscreen();
        else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
        fullscreenBtn.textContent = '✖';
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        fullscreenBtn.textContent = '⛶';
    }
}
if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

// ========== MODAL ==========
const infoBtn = document.getElementById('infoBtn');
const hintIconBtn = document.getElementById('hintIconBtn');
const modal = document.getElementById('guidelineModal');
const closeModal = document.getElementById('closeModal');
function showModal() { modal.classList.add('show'); }
function hideModal() { modal.classList.remove('show'); }
if (infoBtn) infoBtn.addEventListener('click', showModal);
if (hintIconBtn) hintIconBtn.addEventListener('click', showModal);
if (closeModal) closeModal.addEventListener('click', hideModal);
modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });

// ========== DISPLAY FUNCTIONS (shows equation while typing) ==========
function updateDisplay() {
    let val = currentInput;
    if (val.length > 20) val = val.slice(0, 20) + "...";
    displayEl.value = val;
}

function appendNumber(num) {
    if (resetDisplay) {
        currentInput = "";
        resetDisplay = false;
    }
    if (num === "." && currentInput.includes(".")) return;
    if (currentInput === "0" && num !== ".") {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function clearAll() {
    currentInput = "0";
    prevValue = "";
    currentOp = null;
    resetDisplay = false;
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === "") currentInput = "0";
    if (prevValue !== "" && currentOp !== null) {
        // Just update the operation without calculating
        currentOp = op;
        resetDisplay = true;
        return;
    }
    prevValue = currentInput;
    currentOp = op;
    resetDisplay = true;
}

// ========== CORE FUNCTION: DISPLAYS QUOTE INSTEAD OF ANSWER ==========
function showQuoteInsteadOfAnswer() {
    if (currentOp === null || prevValue === "") {
        // No operation set, show a default motivational quote
        const quoteData = getQuoteByOp('+');
        displayEl.value = `✨ ${quoteData.text} ✨`;
        updateQuoteCard(quoteData);
        return;
    }
    
    // Get quote based on the operation (+, -, ×, ÷, %)
    let opForQuote = currentOp;
    if (opForQuote === '×') opForQuote = '×';
    if (opForQuote === '÷') opForQuote = '÷';
    
    const quoteData = getQuoteByOp(opForQuote);
    
    // 🔥 CRITICAL: Display the QUOTE in the calculator display!
    displayEl.value = `💬 ${quoteData.text}`;
    
    // Also update the quote card below
    updateQuoteCard(quoteData);
    
    // Reset for next calculation
    currentInput = "0";
    prevValue = "";
    currentOp = null;
    resetDisplay = true;
}

function updateQuoteCard(quoteData) {
    quoteTextEl.innerText = quoteData.text;
    quoteLabelEl.innerText = quoteData.label;
    quoteIconEl.innerText = quoteData.icon;
    
    // Animation
    quoteTextEl.classList.remove('quote-pop');
    quoteTextEl.offsetHeight;
    quoteTextEl.classList.add('quote-pop');
    
    const card = document.querySelector('.quote-card');
    if (card) {
        card.style.transform = 'scale(0.99)';
        setTimeout(() => { card.style.transform = 'scale(1)'; }, 120);
    }
}

// Handle % separately - shows deep question
function handlePercent() {
    if (currentInput === "") currentInput = "0";
    const quoteData = getQuoteByOp('%');
    displayEl.value = `❓ ${quoteData.text}`;
    updateQuoteCard(quoteData);
    currentInput = "0";
    prevValue = "";
    currentOp = null;
    resetDisplay = true;
}

function toggleSign() {
    if (currentInput === "0") return;
    if (currentInput.startsWith("-")) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = "-" + currentInput;
    }
    updateDisplay();
}

// ========== KEYBOARD SUPPORT ==========
window.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (!isNaN(key) && key !== ' ') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        e.preventDefault();
        if (key === '*') setOperation('×');
        else if (key === '/') setOperation('÷');
        else setOperation(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        showQuoteInsteadOfAnswer();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
    } else if (key === '%') {
        e.preventDefault();
        handlePercent();
    } else if (key === 'Backspace') {
        e.preventDefault();
        if (currentInput.length === 1 || currentInput === "0") {
            currentInput = "0";
        } else if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }
});

// ========== BUTTON EVENT LISTENERS ==========
document.querySelectorAll('.num').forEach(btn => {
    btn.addEventListener('click', () => {
        const num = btn.getAttribute('data-num');
        appendNumber(num);
    });
});

document.querySelectorAll('.operator').forEach(btn => {
    btn.addEventListener('click', () => {
        const op = btn.getAttribute('data-op');
        setOperation(op);
    });
});

document.querySelector('[data-action="clear"]')?.addEventListener('click', clearAll);
document.querySelector('[data-action="toggleSign"]')?.addEventListener('click', toggleSign);
document.querySelector('[data-action="percent"]')?.addEventListener('click', handlePercent);
document.querySelector('[data-action="equals"]')?.addEventListener('click', showQuoteInsteadOfAnswer);

// Welcome message
setTimeout(() => {
    const welcomeQuote = getQuoteByOp('+');
    displayEl.value = `✨ ${welcomeQuote.text} ✨`;
    updateQuoteCard(welcomeQuote);
}, 100);
