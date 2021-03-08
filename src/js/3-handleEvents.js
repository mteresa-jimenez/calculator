// HANDLE EVENTS

function handleDigits(digit) {
  elements.display.textContent += digit;
}

function handleSeparator() {
  const text = elements.display.textContent;
  if (text.length && text.indexOf(".") === -1)
    elements.display.textContent += ".";
}

function handleClear() {
  elements.display.textContent = "";
  elements.display.textContent = "";
  stored = null;
}

function handleOperations(opCode) {
  stored = {
    text: stored ? calculate() : elements.display.textContent,
    opCode,
  };
  elements.display.textContent = "";
}

function handleCalculate() {
  if (!stored) return;
  elements.display.textContent = calculate();
  stored = null;
}
