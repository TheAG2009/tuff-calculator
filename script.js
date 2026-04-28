// ========== CALCULATOR LOGIC ==========

let currentInput = "0";
let prevValue = "";
let currentOp = null;
let resetDisplay = false;

const displayEl = document.getElementById("display");
const realTimeEl = document.getElementById("realTime");

// Real Time Clock
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

// Fullscreen for mobile
function enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
}

document.addEventListener('DOMContentLoaded', () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) setTimeout(() => enterFullscreen(), 500);
});

// Modal
const infoBtn = document.getElementById('infoBtn');
const modal = document.getElementById('guidelineModal');
const closeModal = document.getElementById('closeModal');

if (infoBtn) infoBtn.onclick = () => modal.classList.add('show');
if (closeModal) closeModal.onclick = () => modal.classList.remove('show');
if (modal) modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('show'); };

// Display functions
function updateDisplay() {
    let val = currentInput;
    displayEl.value = val;
    displayEl.scrollTop = displayEl.scrollHeight;
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

// 🔥 CORE: Show quote instead of answer!
function showQuoteInsteadOfAnswer() {
    let quote;
    
    if (currentOp === null || prevValue === "") {
        quote = getQuoteByOperation('+');
    } else {
        quote = getQuoteByOperation(currentOp);
    }
    
    displayEl.value = quote;
    animateDisplay();
    
    currentInput = "0";
    prevValue = "";
    currentOp = null;
    resetDisplay = true;
}

function handlePercent() {
    if (currentInput === "") currentInput = "0";
    const quote = getQuoteByOperation('%');
    displayEl.value = quote;
    animateDisplay();
    currentInput = "0";
    prevValue = "";
    currentOp = null;
    resetDisplay = true;
}

// Touch optimization
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('touchstart', () => { btn.style.transform = 'scale(0.94)'; });
    btn.addEventListener('touchend', () => { btn.style.transform = 'scale(1)'; });
});

// Keyboard support
window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(key) && key !== ' ') appendNumber(key);
    else if (key === '.') appendNumber('.');
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        e.preventDefault();
        if (key === '*') setOperation('✕');
        else if (key === '/') setOperation('÷');
        else setOperation(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        showQuoteInsteadOfAnswer();
    } else if (key === 'Escape' || key === 'c' || key === 'C') clearAll();
    else if (key === '%') {
        e.preventDefault();
        handlePercent();
    } else if (key === 'Backspace') {
        e.preventDefault();
        if (currentInput.length === 1 || currentInput === "0") currentInput = "0";
        else if (currentInput.length > 1) currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
});

// Button event listeners
document.querySelectorAll('.num').forEach(btn => {
    btn.onclick = () => appendNumber(btn.getAttribute('data-num'));
});

document.querySelectorAll('.operator').forEach(btn => {
    btn.onclick = () => setOperation(btn.getAttribute('data-op'));
});

document.querySelector('[data-action="clear"]').onclick = clearAll;
document.querySelector('[data-action="toggleSign"]').onclick = toggleSign;
document.querySelector('[data-action="percent"]').onclick = handlePercent;
document.querySelector('[data-action="equals"]').onclick = showQuoteInsteadOfAnswer;

// Welcome message
displayEl.value = "✨ Welcome! Type any equation and press = ✨";
