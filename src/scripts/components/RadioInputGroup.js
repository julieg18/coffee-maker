class RadioInputGroup {
  constructor({ inputSelector, clickEventHandler }) {
    this._inputs = Array.from(document.querySelectorAll(inputSelector));
    this._clickEventHandler = clickEventHandler;
  }

  getValue() {
    return this._inputs.find((input) => input.checked).value;
  }

  setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('click', this._clickEventHandler);
    });
  }
}

export default RadioInputGroup;
