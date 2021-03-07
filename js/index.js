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
// function handleDigit() {
//   for (let digit of Object.entries(elements.digitButtons)) {
//     elements.display.textContent += digit;
//   }
// }

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

function handleCalculate() {
  if (!stored) return;
  elements.display.textContent = calculate();
  stored = null;
}

function handleKeysDown(ev) {
  const add = "+";
  const subtract = "-";
  const multiply = "*";
  const divide = "/";

  for (let [digit] of Object.entries(elements.digitButtons)) {
    if (ev.key === digit) {
      elements.display.textContent += digit;
      elements.digitButtons[digit].style.backgroundColor =
        "rgba(201, 196, 196, 0.8)";
    }
  }

  if (ev.key === "Backspace") {
    handleClear();
    elements.clearButton.style.backgroundColor = "rgba(201, 196, 196, 0.8)";
  } else if (ev.key === ".") {
    handleSeparator();
    elements.separatorButton.style.backgroundColor = "rgba(201, 196, 196, 0.8)";
  } else if (ev.key === "=") {
    handleCalculate();
    elements.calculateButton.style.backgroundColor = "rgba(201, 196, 196, 0.8)";
  } else if (ev.key === "+") {
    stored = {
      text: stored ? calculate() : elements.display.textContent,
      opCode: "+",
    };
    elements.display.textContent = "";
    elements.operationButtons[add].style.backgroundColor =
      "rgba(201, 196, 196, 0.8)";
  } else if (ev.key === "-") {
    stored = {
      text: stored ? calculate() : elements.display.textContent,
      opCode: "-",
    };
    elements.display.textContent = "";
    elements.operationButtons[subtract].style.backgroundColor =
      "rgba(201, 196, 196, 0.8)";
  } else if (ev.key === "*") {
    stored = {
      text: stored ? calculate() : elements.display.textContent,
      opCode: "*",
    };
    elements.display.textContent = "";
    elements.operationButtons[multiply].style.backgroundColor =
      "rgba(201, 196, 196, 0.8)";
  } else if (ev.key === "/") {
    stored = {
      text: stored ? calculate() : elements.display.textContent,
      opCode: "/",
    };
    elements.display.textContent = "";
    elements.operationButtons[divide].style.backgroundColor =
      "rgba(201, 196, 196, 0.8)";
  }
}

function handleKeysUp(ev) {
  const add = "+";
  const subtract = "-";
  const multiply = "*";
  const divide = "/";

  for (let [digit] of Object.entries(elements.digitButtons)) {
    if (ev.key === digit) {
      elements.digitButtons[digit].style.backgroundColor =
        "rgba(201, 196, 196, 0.1)";
    }
  }

  if (ev.key === "Backspace") {
    elements.clearButton.style.backgroundColor = "rgba(201, 196, 196, 0.1)";
  } else if (ev.key === ".") {
    elements.separatorButton.style.backgroundColor = "rgba(201, 196, 196, 0.1)";
  } else if (ev.key === "=") {
    elements.calculateButton.style.backgroundColor = "rgba(201, 196, 196, 0.1)";
  } else if (ev.key === "+") {
    elements.operationButtons[add].style.backgroundColor =
      "rgba(201, 196, 196, 0.1)";
  } else if (ev.key === "-") {
    elements.operationButtons[subtract].style.backgroundColor =
      "rgba(201, 196, 196, 0.1)";
  } else if (ev.key === "*") {
    elements.operationButtons[multiply].style.backgroundColor =
      "rgba(201, 196, 196, 0.1)";
  } else if (ev.key === "/") {
    elements.operationButtons[divide].style.backgroundColor =
      "rgba(201, 196, 196, 0.1)";
  }
}

let touchstartX = 0;
let touchendX = 0;

function handleSetUpClearTouch() {
  if (touchendX < touchstartX) {
    handleClear();
  }
}

// Events
function setUpKeys() {
  window.addEventListener("keydown", handleKeysDown);
  window.addEventListener("keyup", handleKeysUp);
}

function setUpEntryButtons() {
  for (let [digit, button] of Object.entries(elements.digitButtons))
    button.addEventListener("click", function () {
      elements.display.textContent += digit;
    });

  elements.separatorButton.addEventListener("click", handleSeparator);
  elements.clearButton.addEventListener("click", handleClear);
}

function setUpClearTouch() {
  elements.display.addEventListener(
    "touchstart",
    function (ev) {
      touchstartX = ev.changedTouches[0].screenX;
    },
    false
  );
  elements.display.addEventListener(
    "touchend",
    function (ev) {
      touchendX = ev.changedTouches[0].screenX;
      handleSetUpClearTouch();
    },
    false
  );
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
      console.log(stored);
      elements.display.textContent = "";
    });
}

function setUpCalculateButton() {
  elements.calculateButton.addEventListener("click", handleCalculate);
}

(() => {
  setUpKeys();
  setUpClearTouch();
  setUpEntryButtons();
  setUpOperationButtons();
  setUpCalculateButton();
})();
