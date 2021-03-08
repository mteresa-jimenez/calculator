// HANDLE KEYS DOWN

function handleKeysDown(ev) {
  // digits keys
  for (let [digit] of Object.entries(elements.digitButtons)) {
    if (ev.key === digit) {
      handleDigits(digit);
      elements.digitButtons[digit].style.backgroundColor =
        "rgba(201, 196, 196, 0.8)";
    }
  }

  // clear, separate and calculate keys
  if (ev.key === "Backspace") {
    handleClear();
    elements.clearButton.style.backgroundColor = "rgba(201, 196, 196, 0.8)";
  } else if (ev.key === ".") {
    handleSeparator();
    elements.separatorButton.style.backgroundColor = "rgba(201, 196, 196, 0.8)";
  } else if (ev.key === "=") {
    handleCalculate();
    elements.calculateButton.style.backgroundColor = "rgba(201, 196, 196, 0.8)";
  }

  //operation keys
  for (let [opCode] of Object.entries(elements.operationButtons)) {
    if (ev.key === opCode) {
      handleOperations(opCode);
      elements.operationButtons[opCode].style.backgroundColor =
        "rgba(201, 196, 196, 0.8)";
    }
  }
}

// HANDLE KEYS UP

function handleKeysUp(ev) {
  // digits keys
  for (let [digit] of Object.entries(elements.digitButtons)) {
    if (ev.key === digit) {
      elements.digitButtons[digit].style.backgroundColor =
        "rgba(201, 196, 196, 0.1)";
    }
  }

  // clear, separate and calculate keys
  if (ev.key === "Backspace") {
    elements.clearButton.style.backgroundColor = "rgba(201, 196, 196, 0.1)";
  } else if (ev.key === ".") {
    elements.separatorButton.style.backgroundColor = "rgba(201, 196, 196, 0.1)";
  } else if (ev.key === "=") {
    elements.calculateButton.style.backgroundColor = "rgba(201, 196, 196, 0.1)";
  }

  //operation keys
  for (let [opCode] of Object.entries(elements.operationButtons)) {
    if (ev.key === opCode) {
      elements.operationButtons[opCode].style.backgroundColor =
        "rgba(201, 196, 196, 0.1)";
    }
  }
}
