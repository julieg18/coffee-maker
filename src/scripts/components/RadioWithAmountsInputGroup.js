class RadioWithAmountsInputGroup {
  constructor({ radioName, callback }) {
    this._radioInputs = Array.from(
      document.querySelectorAll(`input[name="${radioName}"]`),
    );
    this._amountInputs = this._radioInputs.flatMap((radioInput) =>
      Array.from(
        document.querySelectorAll(`input[name="${radioInput.id}-amounts"]`),
      ),
    );
    this._selectedValues = {
      radio: null,
      amount: 0,
    };
    this._callback = callback;
  }

  _updateSelectedInputs() {
    const { radio, amount } = this._selectedValues;
    this._radioInputs.forEach((input) => {
      input.checked = input.id === radio;
    });
    this._amountInputs.forEach((input) => {
      input.checked =
        input.id === `${radio}-${amount}` ||
        (input.value === '0' && !input.id.includes(radio));
    });
  }

  _radioInputClickHandler(e) {
    const selectedAmountInput = this._amountInputs.find(
      (input) => input.checked && input.value !== '0',
    );
    const radioInput = e.target;
    this._selectedValues = {
      radio: radioInput.id,
      amount:
        selectedAmountInput.name.includes(radioInput.id) &&
        selectedAmountInput.value !== '0'
          ? Number(selectedAmountInput.value)
          : 1,
    };
    this._updateSelectedInputs();
    this._callback(this._selectedValues);
  }

  _amountInputClickHandler(e) {
    this._selectedValues = {
      amount: Number(e.target.value),
      radio:
        e.target.value === '0' ? null : e.target.name.replace('-amounts', ''),
    };
    this._updateSelectedInputs();
    this._callback(this._selectedValues);
  }

  getValues() {
    return this._selectedValues;
  }

  setEventListeners() {
    this._radioInputs.forEach((input) => {
      input.addEventListener('click', (e) => {
        this._radioInputClickHandler(e);
      });
    });
    this._amountInputs.forEach((input) => {
      input.addEventListener('click', (e) => {
        this._amountInputClickHandler(e);
      });
    });
  }
}

export default RadioWithAmountsInputGroup;
