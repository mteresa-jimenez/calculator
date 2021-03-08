# Calculator

This is a case study for the selection process for **PolyPoly**. This project has been developed with **vanilla JavaScript, HTML5, CSS/SASS**.

## DEVELOPMENT

For this exercise, I have been given an existing code base for a calculator web app to which I had to make several changes to solve several problems.

> **1. Improve the product:**

- **Responsive design - mobile first**

In order to improve the design and make the calculator look like the [mobile mokup](https://github.com/mteresa-jimenez/calculator/blob/code-improvement/mockups/mobile.png), I changed the appearance using CSS styles, specifically "CSS grid" to rearrange the order of the buttons.

Then, using mediaqueries to adapt the design to desktop screens and make the calculator look like the [desktop mokup](https://github.com/mteresa-jimenez/calculator/blob/code-improvement/mockups/desktop.png).

- **Introduction of touch event for mobile version**

To trigger the behaviour of the C button when user swipes the display field from right to left, I introduced a "touchstart" and "touchend" event. When the end point represents a smaller number in the X axis, the event calls the function that clears the display.

- **Allow keyboard for desktop version**

I created two functions: one to handle the keydown event and another one to listen it. In the first one, there are several ``ev.key``, one for each button in the calculator.

- **Simulation of buttons being pressed**

First, the buttons color had to change to simulate being pressed. To the previous keydown funtion, I added a ``style.backgroundColor`` to each ``ev.key``. 
When the keydown event is finished, the button must recover its original color. I created a second handle function for a keyup event, setting the background color of each button to the oringinal using again an ``ev.key`` for each button.


> **2. Improve the code:**

- **Abstract handle functions**

In the original code base, each "click" event had an anonymous function inside each ``addEventListenet``. In order to reuse these functions in the different events, I divided each one in separated handle functions and named them.

- **Reduce duplicated code**

In both handle key functions, the same ``ev.key`` line of code was repeted for each button. To avoid innecesary repeated code, I used different loops to go through ``elements.digitButtons`` and ``elements.operationButtons``.

- **Rename and reorder functions**

- **Divide the code in different JS files**

For a clearer understanding of the code, I divided the code in fractions in different ".js" files.


## DEMO

If you want to see the demo of this project, you can visit the [Demo page](https://mteresa-jimenez.github.io/calculator/ "Take a look").


## FOLDER STRUCTURE

```
src
 ├─ html
 |  └─ index.html
 ├─ images
 |  └─ favicon.png
 ├─ js 
 |  ├─ 1-main.js
 |  ├─ 2-calculate.js
 |  ├─ 3-handleEvents.js
 |  ├─ 4-handleKeysEvent.js
 |  ├─ 5-listenEvents.js
 |  ├─ 6-touch.js
 |  └─ 7-call.js
 └─ scss
    ├─ core
    |  └─ reset.scss
    └─ main.scss
    
```

## AVAILABLE SCRIPTS

In the project directory, you can run:

 ``npm install``

If it is the first time in this repository, you should install all the dependencies.


``npm start``

Runs the app in the development mode.
The page will reload if you make edits.


 ``npm run docs``

This command makes the website available for production and public in GitHub pages.

---

⌨️ **by Teresa Jiménez**
