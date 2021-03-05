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
  }
}

function handleSeparatorButton() {
  const text = elements.display.textContent;
  if (text.length && text.indexOf(".") === -1)
    elements.display.textContent += ".";
}

function handleClearButton() {
  elements.display.textContent = "";
  elements.display.textContent = "";
  stored = null;
}

function handleCalculateButton() {
  if (!stored) return;
  elements.display.textContent = calculate();
  stored = null;
}

function handleKeys(ev) {
  if (ev.key === "1") {
    elements.display.textContent += "1";
  } else if (ev.key === "2") {
    elements.display.textContent += "2";
  } else if (ev.key === "3") {
    elements.display.textContent += "3";
  } else if (ev.key === "4") {
    elements.display.textContent += "4";
  } else if (ev.key === "5") {
    elements.display.textContent += "5";
  } else if (ev.key === "6") {
    elements.display.textContent += "6";
  } else if (ev.key === "7") {
    elements.display.textContent += "7";
  } else if (ev.key === "8") {
    elements.display.textContent += "8";
  } else if (ev.key === "9") {
    elements.display.textContent += "9";
  } else if (ev.key === "0") {
    elements.display.textContent += "0";
  } else if (ev.key === " ") {
    handleClearButton();
  } else if (ev.key === ".") {
    handleSeparatorButton();
  } else if (ev.key === "=") {
    handleCalculateButton();
  } else if (ev.key === "+") {
    stored = {
      text: stored ? calculate() : elements.display.textContent,
      opCode: "+",
    };
    elements.display.textContent = "";
  } else if (ev.key === "-") {
    stored = {
      text: stored ? calculate() : elements.display.textContent,
      opCode: "-",
    };
    elements.display.textContent = "";
  } else if (ev.key === "*") {
    stored = {
      text: stored ? calculate() : elements.display.textContent,
      opCode: "*",
    };
    elements.display.textContent = "";
  } else if (ev.key === "/") {
    stored = {
      text: stored ? calculate() : elements.display.textContent,
      opCode: "/",
    };
    elements.display.textContent = "";
  }
}

let touchstartX = 0;
let touchendX = 0;

function handleSetUpClearTouch() {
  if (touchendX <= touchstartX) {
    handleClearButton();
  }
}

// Events
function setUpKeys() {
  window.addEventListener("keydown", handleKeys);
}

function setUpEntryButtons() {
  for (let [digit, button] of Object.entries(elements.digitButtons))
    button.addEventListener("click", function () {
      elements.display.textContent += digit;
    });

  elements.separatorButton.addEventListener("click", handleSeparatorButton);
  elements.clearButton.addEventListener("click", handleClearButton);
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
  elements.calculateButton.addEventListener("click", handleCalculateButton);
}

(() => {
  setUpKeys();
  setUpClearTouch();
  setUpEntryButtons();
  setUpOperationButtons();
  setUpCalculateButton();
})();
