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

function handleCalculateButton() {
  if (!stored) return;
  elements.displayResult.textContent = calculate();
  stored = null;
}

function handleKeys(ev) {
  if (ev.key === "1") {
    elements.displayFormula.textContent += "1";
  } else if (ev.key === "2") {
    elements.displayFormula.textContent += "2";
  } else if (ev.key === "3") {
    elements.displayFormula.textContent += "3";
  } else if (ev.key === "4") {
    elements.displayFormula.textContent += "4";
  } else if (ev.key === "5") {
    elements.displayFormula.textContent += "5";
  } else if (ev.key === "6") {
    elements.displayFormula.textContent += "6";
  } else if (ev.key === "7") {
    elements.displayFormula.textContent += "7";
  } else if (ev.key === "8") {
    elements.displayFormula.textContent += "8";
  } else if (ev.key === "9") {
    elements.displayFormula.textContent += "9";
  } else if (ev.key === "0") {
    elements.displayFormula.textContent += "0";
  } else if (ev.key === " ") {
    handleClearButton();
  } else if (ev.key === ".") {
    handleSeparatorButton();
  } else if (ev.key === "=") {
    handleCalculateButton();
  } else if (ev.key === "+") {
    stored = {
      text: stored ? calculate() : elements.displayFormula.textContent,
      opCode: "+",
    };
    elements.displayFormula.textContent = "";
  } else if (ev.key === "-") {
    stored = {
      text: stored ? calculate() : elements.displayFormula.textContent,
      opCode: "-",
    };
    elements.displayFormula.textContent = "";
  } else if (ev.key === "*") {
    stored = {
      text: stored ? calculate() : elements.displayFormula.textContent,
      opCode: "*",
    };
    elements.displayFormula.textContent = "";
  } else if (ev.key === "/") {
    stored = {
      text: stored ? calculate() : elements.displayFormula.textContent,
      opCode: "/",
    };
    elements.displayFormula.textContent = "";
  }
}

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

function handleSetUpClearTouch() {
  console.log(touchendX);
  console.log(touchstartX);
  if (touchendX <= touchstartX) {
    console.log("Swipe left");
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
      elements.displayFormula.textContent += digit;
    });

  elements.separatorButton.addEventListener("click", handleSeparatorButton);
  elements.clearButton.addEventListener("click", handleClearButton);
}

function setUpClearTouch() {
  elements.display.addEventListener(
    "touchstart",
    function (ev) {
      touchstartX = ev.changedTouches[0].screenX;
      touchstartY = ev.changedTouches[0].screenY;
    },
    false
  );
  elements.display.addEventListener(
    "touchend",
    function (ev) {
      touchendX = ev.changedTouches[0].screenX;
      touchendY = ev.changedTouches[0].screenY;
      handleSetUpClearTouch();
    },
    false
  );
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
      elements.displayFormula.textContent = "";
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
