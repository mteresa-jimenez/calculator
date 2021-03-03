"use strict";

let stored = null;

const digits = [...Array(10).keys()].map((key) => key.toString());

const operations = {
  "+": (first, second) => first + second,
  "-": (first, second) => first - second,
  "*": (first, second) => first * second,
  "/": (first, second) => first / second,
};

const elements = {
  get display() {
    return document.getElementById("display");
  },
  digitButtons: (() => {
    const buttons = {};
    for (let digit of digits)
      Object.defineProperty(buttons, digit, {
        enumerable: true,
        get: () => document.getElementById(`btn-${digit}`),
      });
    return buttons;
  })(),
  get separatorButton() {
    return document.getElementById("btn-separator");
  },
  get clearButton() {
    return document.getElementById("btn-clear");
  },
  operationButtons: (() => {
    const buttons = {};
    for (let opCode of Object.keys(operations))
      Object.defineProperty(buttons, opCode, {
        enumerable: true,
        get: () =>
          document.getElementById(
            {
              "+": "btn-add",
              "-": "btn-subtract",
              "*": "btn-multiply",
              "/": "btn-divide",
            }[opCode]
          ),
      });
    return buttons;
  })(),
  get calculateButton() {
    return document.getElementById("btn-calculate");
  },
};

// Handle events
function handleSeparatorButton() {
  const text = elements.display.textContent;
  if (text.length && text.indexOf(".") === -1)
    elements.display.textContent += ".";
}

function handleClearButton() {
  elements.display.textContent = "";
  stored = null;
}

// function handleOperationButtons() {
//   stored = {
//     text: stored ? calculate() : elements.display.textContent,
//     opCode,
//   };
//   elements.display.textContent = "";
// }

function handleCalculateButton() {
  if (!stored) return;
  elements.display.textContent = calculate();
  stored = null;
}

function handleKeys(ev) {
  switch (ev.keyCode) {
    case 32:
      handleClearButton();
      break;
    case 190:
      handleSeparatorButton();
      break;
    case 16 && 48:
      handleCalculateButton();
      break;
  }
}

// Events
function setUpEntryButtons() {
  for (let [digit, button] of Object.entries(elements.digitButtons))
    button.addEventListener("click", function () {
      elements.display.textContent += digit;
    });

  elements.separatorButton.addEventListener("click", handleSeparatorButton);
  window.addEventListener("keydown", handleKeys);

  elements.clearButton.addEventListener("click", handleClearButton);
  window.addEventListener("keydown", handleKeys);
}

function calculate() {
  const [first, second] = [
    stored.text,
    elements.display.textContent,
  ].map((text) => parseFloat(text));
  return operations[stored.opCode](first, second);
}

function setUpOperationButtons() {
  for (let [opCode, button] of Object.entries(elements.operationButtons))
    button.addEventListener("click", function () {
      stored = {
        text: stored ? calculate() : elements.display.textContent,
        opCode,
      };
      elements.display.textContent = "";
    });
}

function setUpCalculateButton() {
  elements.calculateButton.addEventListener("click", handleCalculateButton);
  window.addEventListener("keydown", handleKeys);
}

(() => {
  setUpEntryButtons();
  setUpOperationButtons();
  setUpCalculateButton();
})();
