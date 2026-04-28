// iOS Calculator Logic with Operation-Based Quotes

let currentInput = "0";
let previousInput = "";
let currentOperation = null;
let shouldResetDisplay = false;

const displayElem = document.getElementById("display");
const quoteTextElem = document.getElementById("quoteText");
const quoteTypeBadge = document.getElementById("quoteTypeBadge");
const quoteIconSpan = document.getElementById("quoteIcon");

function updateDisplay() {
    let raw = currentInput;
    if (raw.length > 16) {
        raw = parseFloat(raw).toExponential(8);
    }
    displayElem.value = raw;
}

function setDisplayValue(value) {
    currentInput = value.toString();
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }
    if (number === "." && currentInput.includes(".")) return;
    if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function clearAll() {
    currentInput = "0";
    previousInput = "";
    currentOperation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function toggleSign() {
    let val = parseFloat(currentInput);
    if (isNaN(val)) val = 0;
    val = -val;
    currentInput = val.toString();
    updateDisplay();
}

function percentOperation() {
    let val = parseFloat(currentInput);
    if (isNaN(val)) val = 0;
    val = val / 100;
    currentInput = val.toString();
    updateDisplay();
}

function performCalculation() {
    if (currentOperation === null || previousInput === "") return null;
    
    let a = parseFloat(previousInput);
    let b = parseFloat(currentInput);
    
    if (isNaN(a) || isNaN(b)) return null;
    
    let result;
    switch (currentOperation) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "×":
            result = a * b;
            break;
        case "÷":
            if (b === 0) return "Error";
            result = a / b;
            break;
        default:
            return null;
    }
    
    return Math.round(result * 1000000) / 1000000;
}

// Animated quote update
function animateQuote() {
    const quoteContainer = document.getElementById("quoteText");
    quoteContainer.style.animation = 'none';
    quoteContainer.offsetHeight; // Force reflow
    quoteContainer.style.animation = 'quotePop 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards';
    
    const card = document.querySelector('.quote-card');
    card.style.transform = 'scale(0.99)';
    setTimeout(() => { card.style.transform = 'scale(1)'; }, 120);
}

function refreshQuoteBasedOnOperator(opSymbol) {
    if (!opSymbol) return;
    
    let validOp = opSymbol;
    if (validOp === '*' || validOp === '×') validOp = '×';
    if (validOp === '/') validOp = '÷';
    
    const content = getContentByOperation(validOp);
    
    quoteTextElem.innerText = content.text;
    quoteTypeBadge.innerText = `${content.type} 🎯`;
    quoteIconSpan.innerHTML = content.icon;
    
    animateQuote();
}

function evaluateAndUpdateQuote() {
    if (currentOperation === null) {
        refreshQuoteBasedOnOperator('+');
        return;
    }
    
    const result = performCalculation();
    
    if (result === "Error") {
        setDisplayValue("Error");
        currentInput = "Error";
        previousInput = "";
        currentOperation = null;
        refreshQuoteBasedOnOperator('+');
        return;
    }
    
    if (result !== null && !isNaN(result)) {
        setDisplayValue(result);
        currentInput = result.toString();
        previousInput = "";
        
        // 🔥 CRITICAL: Show quote based on the operation used
        if (currentOperation) {
            refreshQuoteBasedOnOperator(currentOperation);
        }
        
        currentOperation = null;
        shouldResetDisplay = true;
    } else {
        refreshQuoteBasedOnOperator('+');
    }
}

function setOperation(op) {
    if (currentInput === "Error") clearAll();
    
    if (currentOperation !== null && !shouldResetDisplay) {
        const result = performCalculation();
        if (result !== null && !isNaN(result) && result !== "Error") {
            currentInput = result.toString();
            updateDisplay();
        }
    }
    
    previousInput = currentInput;
    currentOperation = op;
    shouldResetDisplay = true;
}

function handleEquals() {
    if (currentInput === "Error") {
        clearAll();
        return;
    }
    evaluateAndUpdateQuote();
}

function handlePercentAndQuote() {
    if (currentInput === "Error") return;
    percentOperation();
    refreshQuoteBasedOnOperator('%');
    shouldResetDisplay = true;
    previousInput = "";
    currentOperation = null;
}

// Keyboard Support
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
        handlePercentAndQuote();
    } else if (key === 'Backspace') {
        e.preventDefault();
        if (currentInput.length === 1 || currentInput === "Error") {
            currentInput = "0";
        } else {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === "") currentInput = "0";
        }
        updateDisplay();
    }
});

// Button Event Listeners
document.querySelectorAll('.number').forEach(btn => {
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
document.querySelector('[data-action="percent"]').addEventListener('click', handlePercentAndQuote);
document.querySelector('[data-action="equals"]').addEventListener('click', handleEquals);

// Welcome quote on load
setTimeout(() => {
    refreshQuoteBasedOnOperator('+');
}, 100);
