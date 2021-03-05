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
  get displayFormula() {
    return document.getElementById("display-formula");
  },
  get displayResult() {
    return document.getElementById("display-result");
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

// let touchstartX = 0;
// let touchstartY = 0;
// let touchendX = 0;
// let touchendY = 0;

// Handle events
function handleDigitButtons() {
  for (let digit of Object.entries(elements.digitButtons)) {
    elements.displayFormula.textContent += digit;
  }
}

function handleSeparatorButton() {
  const text = elements.displayFormula.textContent;
  if (text.length && text.indexOf(".") === -1)
    elements.displayFormula.textContent += ".";
}

function handleClearButton() {
  elements.displayResult.textContent = "";
  elements.displayFormula.textContent = "";
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
  elements.displayResult.textContent = calculate();
  stored = null;
}

function handleKeys(ev) {
  if (ev.keyCode === 49) {
    elements.displayFormula.textContent += "1";
  } else if (ev.keyCode === 50) {
    elements.displayFormula.textContent += "2";
  } else if (ev.keyCode === 51) {
    elements.displayFormula.textContent += "3";
  } else if (ev.keyCode === 52) {
    elements.displayFormula.textContent += "4";
  } else if (ev.keyCode === 53) {
    elements.displayFormula.textContent += "5";
  } else if (ev.keyCode === 54) {
    elements.displayFormula.textContent += "6";
  } else if (ev.keyCode === 55) {
    elements.displayFormula.textContent += "7";
  } else if (ev.keyCode === 56) {
    elements.displayFormula.textContent += "8";
  } else if (ev.keyCode === 57) {
    elements.displayFormula.textContent += "9";
    // } else if (ev.keyCode === (48 && !16)) {
    //   elements.displayFormula.textContent += "0";
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

// function handleSetUpClearTouch() {
//   if (touchendX < touchstartX) {
//     handleClearButton();
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
      elements.displayFormula.textContent += digit;
    });

  elements.separatorButton.addEventListener("click", handleSeparatorButton);
  elements.clearButton.addEventListener("click", handleClearButton);
}

function setUpClearTouch() {
  elements.display.addEventListener("touchmove", handleClearButton);
  // elements.display.addEventListener(
  //   "touchstart",
  //   function (ev) {
  //     touchstartX = ev.screenX;
  //     touchstartY = ev.screenY;
  //   },
  //   false
  // );
  // elements.display.addEventListener(
  //   "touchstend",
  //   function (ev) {
  //     touchstartX = ev.screenX;
  //     touchstartY = ev.screenY;
  //     handleSetUpClearTouch();
  //   },
  //   false
  // );
}

function calculate() {
  const [first, second] = [
    stored.text,
    elements.displayFormula.textContent,
  ].map((text) => parseFloat(text));
  return operations[stored.opCode](first, second);
}

function setUpOperationButtons() {
  for (let [opCode, button] of Object.entries(elements.operationButtons))
    button.addEventListener("click", function () {
      stored = {
        text: stored ? calculate() : elements.displayFormula.textContent,
        opCode,
      };
      console.log(stored);
      elements.displayFormula.textContent += stored.opCode;
    });
}

function setUpCalculateButton() {
  elements.calculateButton.addEventListener("click", handleCalculateButton);
}

(() => {
  setUpKeys();
  setUpClearTouch();
  setUpEntryButtons();
  setUpOperationButtons();
  setUpCalculateButton();
})();
