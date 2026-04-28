// REAL-TIME CALCULATOR with QUOTE UPDATES (NO ANSWER TEXT, JUST QUOTES)

let currentVal = "0";
let prevVal = "";
let currentOp = null;
let resetDisplay = false;

const displayEl = document.getElementById("display");
const quoteTextEl = document.getElementById("quoteText");
const quoteLabelEl = document.getElementById("quoteLabel");
const quoteIconEl = document.getElementById("quoteIcon");

function updateDisplay() {
    let val = currentVal;
    if (val.length > 16) {
        val = parseFloat(val).toExponential(8);
    }
    displayEl.value = val;
}

function setDisplayValue(val) {
    currentVal = val.toString();
    updateDisplay();
}

function appendNumber(num) {
    if (resetDisplay) {
        currentVal = "";
        resetDisplay = false;
    }
    if (num === "." && currentVal.includes(".")) return;
    if (currentVal === "0" && num !== ".") {
        currentVal = num;
    } else {
        currentVal += num;
    }
    updateDisplay();
}

function clearAll() {
    currentVal = "0";
    prevVal = "";
    currentOp = null;
    resetDisplay = false;
    updateDisplay();
}

function toggleSign() {
    let val = parseFloat(currentVal);
    if (isNaN(val)) val = 0;
    val = -val;
    currentVal = val.toString();
    updateDisplay();
}

function percentOp() {
    let val = parseFloat(currentVal);
    if (isNaN(val)) val = 0;
    val = val / 100;
    currentVal = val.toString();
    updateDisplay();
}

function calculate() {
    if (currentOp === null || prevVal === "") return null;
    
    let a = parseFloat(prevVal);
    let b = parseFloat(currentVal);
    
    if (isNaN(a) || isNaN(b)) return null;
    
    let result;
    switch(currentOp) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "×": result = a * b; break;
        case "÷": 
            if (b === 0) return "Error";
            result = a / b;
            break;
        default: return null;
    }
    
    return Math.round(result * 1000000) / 1000000;
}

// Quote update with animation (ONLY QUOTES, NO ANSWERS)
function updateQuoteForOp(op) {
    if (!op) return;
    
    let cleanOp = op;
    if (cleanOp === '*' || cleanOp === '×') cleanOp = '×';
    if (cleanOp === '/') cleanOp = '÷';
    
    const quoteData = getQuoteByOp(cleanOp);
    
    quoteTextEl.innerText = quoteData.text;
    quoteLabelEl.innerText = quoteData.label;
    quoteIconEl.innerText = quoteData.icon;
    
    // Animation
    quoteTextEl.classList.remove('quote-pop');
    quoteTextEl.offsetHeight;
    quoteTextEl.classList.add('quote-pop');
    
    const card = document.querySelector('.quote-card');
    card.style.transform = 'scale(0.99)';
    setTimeout(() => { card.style.transform = 'scale(1)'; }, 120);
}

function handleEquals() {
    if (currentVal === "Error") {
        clearAll();
        return;
    }
    
    if (currentOp === null) {
        if (currentVal !== "0") {
            updateQuoteForOp('+');
        }
        return;
    }
    
    const result = calculate();
    
    if (result === "Error") {
        setDisplayValue("Error");
        currentVal = "Error";
        prevVal = "";
        currentOp = null;
        updateQuoteForOp('+');
        return;
    }
    
    if (result !== null && !isNaN(result)) {
        setDisplayValue(result);
        currentVal = result.toString();
        prevVal = "";
        
        // 🔥 SHOW QUOTE BASED ON THE OPERATION (NO ANSWER TEXT)
        if (currentOp) {
            updateQuoteForOp(currentOp);
        }
        
        currentOp = null;
        resetDisplay = true;
    }
}

function setOperation(op) {
    if (currentVal === "Error") clearAll();
    
    if (currentOp !== null && !resetDisplay) {
        const result = calculate();
        if (result !== null && !isNaN(result) && result !== "Error") {
            currentVal = result.toString();
            updateDisplay();
        }
    }
    
    prevVal = currentVal;
    currentOp = op;
    resetDisplay = true;
}

function handlePercentWithQuote() {
    if (currentVal === "Error") return;
    percentOp();
    updateQuoteForOp('%');
    resetDisplay = true;
    prevVal = "";
    currentOp = null;
}

// ========== FULLSCREEN TOGGLE ==========
const fullscreenBtn = document.getElementById('fullscreenBtn');
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.textContent = '✖';
    } else {
        document.exitFullscreen();
        fullscreenBtn.textContent = '⛶';
    }
}
fullscreenBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenBtn.textContent = '✖';
    } else {
        fullscreenBtn.textContent = '⛶';
    }
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
        handleEquals();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
    } else if (key === '%') {
        e.preventDefault();
        handlePercentWithQuote();
    } else if (key === 'Backspace') {
        e.preventDefault();
        if (currentVal.length === 1 || currentVal === "Error") {
            currentVal = "0";
        } else {
            currentVal = currentVal.slice(0, -1);
            if (currentVal === "") currentVal = "0";
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

document.querySelector('[data-action="clear"]').addEventListener('click', clearAll);
document.querySelector('[data-action="toggleSign"]').addEventListener('click', toggleSign);
document.querySelector('[data-action="percent"]').addEventListener('click', handlePercentWithQuote);
document.querySelector('[data-action="equals"]').addEventListener('click', handleEquals);

// Welcome quote on load
setTimeout(() => {
    updateQuoteForOp('+');
}, 100);
