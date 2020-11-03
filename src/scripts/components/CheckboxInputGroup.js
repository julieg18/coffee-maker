class CheckboxInputGroup {
  constructor({ inputSelector, callback }) {
    this._inputs = Array.from(document.querySelectorAll(inputSelector));
    this._callback = callback;
  }

  getValues() {
    const values = [];
    this._inputs.forEach((input) => {
      if (input.checked) {
        values.push(input.value);
      }
    });
    return values;
  }

  setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('click', () => {
        this._callback(this.getValues());
      });
    });
  }
}

export default CheckboxInputGroup;
