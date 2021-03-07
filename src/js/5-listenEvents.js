// LISTEN EVENTS

// Listen Buttons
function setUpEntryButtons() {
  for (let [digit, button] of Object.entries(elements.digitButtons))
    button.addEventListener("click", () => {
      handleDigits(digit);
    });

  elements.separatorButton.addEventListener("click", handleSeparator);
  elements.clearButton.addEventListener("click", handleClear);
}

function setUpOperationButtons() {
  for (let [opCode, button] of Object.entries(elements.operationButtons))
    button.addEventListener("click", () => {
      handleOperations(opCode);
    });
}

function setUpCalculateButton() {
  elements.calculateButton.addEventListener("click", handleCalculate);
}

// Listen Keys
function setUpKeys() {
  window.addEventListener("keydown", handleKeysDown);
  window.addEventListener("keyup", handleKeysUp);
}
