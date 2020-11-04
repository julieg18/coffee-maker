class RadioInputGroup {
  constructor({ inputSelector, clickEventHandler }) {
    this._inputs = Array.from(document.querySelectorAll(inputSelector));
    this._clickEventHandler = clickEventHandler;
  }

  getValue() {
    return this._inputs.find((input) => input.checked).value;
  }

  setValue(val) {
    this._inputs.forEach((input) => {
      input.checked = input.value === val;
    });
  }

  setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('click', this._clickEventHandler);
    });
  }
}

export default RadioInputGroup;
