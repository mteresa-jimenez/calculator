// "use strict";

// let stored = null;

// const digits = [...Array(10).keys()].map((key) => key.toString());

// const operations = {
//   "+": (first, second) => first + second,
//   "-": (first, second) => first - second,
//   "*": (first, second) => first * second,
//   "/": (first, second) => first / second,
// };

// const elements = {
//   get display() {
//     return document.getElementById("display");
//   },
//   digitButtons: (() => {
//     const buttons = {};
//     for (let digit of digits)
//       Object.defineProperty(buttons, digit, {
//         enumerable: true,
//         get: () => document.getElementById(`btn-${digit}`),
//       });
//     return buttons;
//   })(),
//   get separatorButton() {
//     return document.getElementById("btn-separator");
//   },
//   get clearButton() {
//     return document.getElementById("btn-clear");
//   },
//   operationButtons: (() => {
//     const buttons = {};
//     for (let opCode of Object.keys(operations))
//       Object.defineProperty(buttons, opCode, {
//         enumerable: true,
//         get: () =>
//           document.getElementById(
//             {
//               "+": "btn-add",
//               "-": "btn-subtract",
//               "*": "btn-multiply",
//               "/": "btn-divide",
//             }[opCode]
//           ),
//       });
//     return buttons;
//   })(),
//   get calculateButton() {
//     return document.getElementById("btn-calculate");
//   },
// };

// function calculate() {
//   const [first, second] = [
//     stored.text,
//     elements.display.textContent,
//   ].map((text) => parseFloat(text));
//   return operations[stored.opCode](first, second);
// }

// // HANDLE EVENTS

// function handleDigits(digit) {
//   elements.display.textContent += digit;
// }

// function handleSeparator() {
//   const text = elements.display.textContent;
//   if (text.length && text.indexOf(".") === -1)
//     elements.display.textContent += ".";
// }

// function handleClear() {
//   elements.display.textContent = "";
//   elements.display.textContent = "";
//   stored = null;
// }

// function handleOperations(opCode) {
//   stored = {
//     text: stored ? calculate() : elements.display.textContent,
//     opCode,
//   };
//   elements.display.textContent = "";
// }

// function handleCalculate() {
//   if (!stored) return;
//   elements.display.textContent = calculate();
//   stored = null;
// }

// // Handle keys

// function handleKeysDown(ev) {
//   // digits keys
//   for (let [digit] of Object.entries(elements.digitButtons)) {
//     if (ev.key === digit) {
//       handleDigits(digit);
//       elements.digitButtons[digit].style.backgroundColor =
//         "rgba(201, 196, 196, 0.8)";
//     }
//   }

//   // clear, separate and calculate keys
//   if (ev.key === "Backspace") {
//     handleClear();
//     elements.clearButton.style.backgroundColor = "rgba(201, 196, 196, 0.8)";
//   } else if (ev.key === ".") {
//     handleSeparator();
//     elements.separatorButton.style.backgroundColor = "rgba(201, 196, 196, 0.8)";
//   } else if (ev.key === "=") {
//     handleCalculate();
//     elements.calculateButton.style.backgroundColor = "rgba(201, 196, 196, 0.8)";
//   }

//   //operation keys
//   for (let [opCode] of Object.entries(elements.operationButtons)) {
//     if (ev.key === opCode) {
//       handleOperations(opCode);
//       elements.operationButtons[opCode].style.backgroundColor =
//         "rgba(201, 196, 196, 0.8)";
//     }
//   }
// }

// function handleKeysUp(ev) {
//   // digits keys
//   for (let [digit] of Object.entries(elements.digitButtons)) {
//     if (ev.key === digit) {
//       elements.digitButtons[digit].style.backgroundColor =
//         "rgba(201, 196, 196, 0.1)";
//     }
//   }

//   // clear, separate and calculate keys
//   if (ev.key === "Backspace") {
//     elements.clearButton.style.backgroundColor = "rgba(201, 196, 196, 0.1)";
//   } else if (ev.key === ".") {
//     elements.separatorButton.style.backgroundColor = "rgba(201, 196, 196, 0.1)";
//   } else if (ev.key === "=") {
//     elements.calculateButton.style.backgroundColor = "rgba(201, 196, 196, 0.1)";
//   }

//   //operation keys
//   for (let [opCode] of Object.entries(elements.operationButtons)) {
//     if (ev.key === opCode) {
//       elements.operationButtons[opCode].style.backgroundColor =
//         "rgba(201, 196, 196, 0.1)";
//     }
//   }
// }

// // Handle Touch

// let touchstartX = 0;
// let touchendX = 0;

// function handleSetUpClearTouch() {
//   if (touchendX < touchstartX) {
//     handleClear();
//   }
// }

// // LISTEN EVENTS

// // Listen Buttons
// function setUpEntryButtons() {
//   for (let [digit, button] of Object.entries(elements.digitButtons))
//     button.addEventListener("click", () => {
//       handleDigits(digit);
//     });

//   elements.separatorButton.addEventListener("click", handleSeparator);
//   elements.clearButton.addEventListener("click", handleClear);
// }

// function setUpOperationButtons() {
//   console.log(elements.operationButtons);
//   for (let [opCode, button] of Object.entries(elements.operationButtons))
//     button.addEventListener("click", () => {
//       handleOperations(opCode);
//     });
// }

// function setUpCalculateButton() {
//   elements.calculateButton.addEventListener("click", handleCalculate);
// }

// // Listen Keys
// function setUpKeys() {
//   window.addEventListener("keydown", handleKeysDown);
//   window.addEventListener("keyup", handleKeysUp);
// }

// // Listen Touch
// function setUpClearTouch() {
//   elements.display.addEventListener(
//     "touchstart",
//     function (ev) {
//       touchstartX = ev.changedTouches[0].screenX;
//     },
//     false
//   );
//   elements.display.addEventListener(
//     "touchend",
//     function (ev) {
//       touchendX = ev.changedTouches[0].screenX;
//       handleSetUpClearTouch();
//     },
//     false
//   );
// }

// (() => {
//   setUpKeys();
//   setUpClearTouch();
//   setUpEntryButtons();
//   setUpOperationButtons();
//   setUpCalculateButton();
// })();
