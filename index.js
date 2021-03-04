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
function handleDigitButtons() {
  for (let digit of Object.entries(elements.digitButtons)) {
    elements.display.textContent += digit;
    console.log(digit);
  }
}

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
//   for (let opCode of Object.entries(elements.operationButtons)) {
//     stored = {
//       text: stored ? calculate() : elements.display.textContent,
//       opCode,
//     };
//     elements.display.textContent = "";
//   }
// }

function handleCalculateButton() {
  if (!stored) return;
  elements.display.textContent = calculate();
  stored = null;
}

// function handleDigitsKeys(ev) {
//   return digits.map((digit) => {
//     switch (ev.keyCode) {
//       case 48 + digit:
//         console.log(digit);
//         elements.display.textContent += stringify(digit);
//     }
//   });
// }

function handleKeys(ev) {
  if (ev.keyCode === 49) {
    elements.display.textContent += "1";
  } else if (ev.keyCode === 50) {
    elements.display.textContent += "2";
  } else if (ev.keyCode === 51) {
    elements.display.textContent += "3";
  } else if (ev.keyCode === 52) {
    elements.display.textContent += "4";
  } else if (ev.keyCode === 53) {
    elements.display.textContent += "5";
  } else if (ev.keyCode === 54) {
    elements.display.textContent += "6";
  } else if (ev.keyCode === 55) {
    elements.display.textContent += "7";
  } else if (ev.keyCode === 56) {
    elements.display.textContent += "2";
  } else if (ev.keyCode === 57) {
    elements.display.textContent += "2";
  } else if (ev.keyCode === 58) {
    elements.display.textContent += "9";
  } else if (ev.keyCode === 32) {
    handleClearButton();
  } else if (ev.keyCode === 190) {
    handleSeparatorButton();
  } else if (ev.keyCode === (16 && 48)) {
    handleCalculateButton();
  }
}

// function handleKeys(ev) {
//   switch (ev.keyCode) {
//     case 49:
//       elements.display.textContent += "1";
//       break;
//     case 50:
//       elements.display.textContent += "2";
//       break;
//     case 51:
//       elements.display.textContent += "3";
//       break;
//     case 52:
//       elements.display.textContent += "4";
//       break;
//     case 53:
//       elements.display.textContent += "5";
//       break;
//     case 54:
//       elements.display.textContent += "6";
//       break;
//     case 55:
//       elements.display.textContent += "7";
//       break;
//     case 56:
//       elements.display.textContent += "8";
//       break;
//     case 57:
//       elements.display.textContent += "9";
//       break;
//     case 32:
//       handleClearButton();
//       break;
//     case 190:
//       handleSeparatorButton();
//       break;
//     case 16 && 48:
//       handleCalculateButton();
//       break;
//   }
// }

// Events
function setUpKeys() {
  window.addEventListener("keydown", handleKeys);
  // window.addEventListener("keydown", handleKeyPressed);
}

function setUpEntryButtons() {
  for (let [digit, button] of Object.entries(elements.digitButtons))
    button.addEventListener("click", function () {
      elements.display.textContent += digit;
    });

  elements.separatorButton.addEventListener("click", handleSeparatorButton);
  elements.clearButton.addEventListener("click", handleClearButton);
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
}

(() => {
  setUpKeys();
  setUpEntryButtons();
  setUpOperationButtons();
  setUpCalculateButton();
})();
