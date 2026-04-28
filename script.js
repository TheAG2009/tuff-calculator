// MOBILE QUOTE CALCULATOR - Display shows QUOTES, not numbers!

let currentInput = "0";
let prevValue = "";
let currentOp = null;
let resetDisplay = false;

const displayEl = document.getElementById("display");
const realTimeEl = document.getElementById("realTime");

// ========== REAL TIME CLOCK ==========
function updateRealTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    if (realTimeEl) realTimeEl.textContent = timeString;
}
updateRealTime();
setInterval(updateRealTime, 1000);

// ========== FULLSCREEN (FIXED FOR MOBILE) ==========
function enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// Auto-enter fullscreen on mobile when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        setTimeout(() => {
            enterFullscreen();
        }, 500);
    }
});

// ========== MODAL ==========
const infoBtn = document.getElementById('infoBtn');
const modal = document.getElementById('guidelineModal');
const closeModal = document.getElementById('closeModal');

function showModal() { modal.classList.add('show'); }
function hideModal() { modal.classList.remove('show'); }

if (infoBtn) infoBtn.addEventListener('click', showModal);
if (closeModal) closeModal.addEventListener('click', hideModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });

// ========== DISPLAY FUNCTIONS ==========
function updateDisplay() {
    let val = currentInput;
    if (val.length > 30) val = val.slice(0, 30) + "...";
    displayEl.value = val;
}

function animateDisplay() {
    displayEl.classList.remove('display-pop');
    displayEl.offsetHeight;
    displayEl.classList.add('display-pop');
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

function toggleSign() {
    if (currentInput === "0") return;
    if (currentInput.startsWith("-")) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = "-" + currentInput;
    }
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === "") currentInput = "0";
    if (prevValue !== "" && currentOp !== null) {
        currentOp = op;
        resetDisplay = true;
        return;
    }
    prevValue = currentInput;
    currentOp = op;
    resetDisplay = true;
}

// ========== CORE: DISPLAY QUOTE INSTEAD OF ANSWER ==========
function showQuoteInsteadOfAnswer() {
    if (currentOp === null || prevValue === "") {
        const quoteData = getQuoteByOp('+');
        displayEl.value = quoteData.text;
        animateDisplay();
        return;
    }
    
    let opForQuote = currentOp;
    const quoteData = getQuoteByOp(opForQuote);
    
    // 🔥 DISPLAY ONLY THE QUOTE - NO NUMBERS!
    displayEl.value = quoteData.text;
    animateDisplay();
    
    // Reset for next calculation
    currentInput = "0";
    prevValue = "";
    currentOp = null;
    resetDisplay = true;
}

function handlePercent() {
    if (currentInput === "") currentInput = "0";
    const quoteData = getQuoteByOp('%');
    displayEl.value = quoteData.text;
    animateDisplay();
    currentInput = "0";
    prevValue = "";
    currentOp = null;
    resetDisplay = true;
}

// ========== TOUCH OPTIMIZATION ==========
// Prevent zoom on double tap
document.addEventListener('touchstart', (e) => {
    if (e.target.closest('.btn')) {
        e.preventDefault();
    }
}, { passive: false });

// Better touch response
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('touchstart', (e) => {
        btn.style.transform = 'scale(0.94)';
    }, { passive: true });
    btn.addEventListener('touchend', (e) => {
        btn.style.transform = 'scale(1)';
    });
    btn.addEventListener('touchcancel', (e) => {
        btn.style.transform = 'scale(1)';
    });
});

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
const welcomeQuote = getQuoteByOp('+');
displayEl.value = welcomeQuote.text;
