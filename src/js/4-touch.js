let touchstartX = 0;
let touchendX = 0;

// Handle Touch

function handleSetUpClearTouch() {
  if (touchendX < touchstartX) {
    handleClear();
  }
}

// Listen Touch
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
