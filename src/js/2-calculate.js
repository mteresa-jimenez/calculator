function calculate() {
  const [first, second] = [
    stored.text,
    elements.display.textContent,
  ].map((text) => parseFloat(text));
  return operations[stored.opCode](first, second);
}
