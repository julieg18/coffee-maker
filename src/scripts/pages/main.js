import '../../main.html';
import '../../pages/main.css';
import Coffee from '../components/Coffee';
import RadioInputGroup from '../components/RadioInputGroup';
import CheckboxInputGroup from '../components/CheckboxInputGroup';
import RadioWithAmountsInputGroup from '../components/RadioWithAmountsInputGroup';
import getCoffeeOrder from '../utils/utils';

const sizeInputs = document.querySelectorAll('input[name="size"]');
const roastInputs = Array.from(
  document.querySelectorAll('input[name="roast"]'),
);
const sweetenerInputs = document.querySelectorAll('input[name="sweetener"]');
const flavoringInputs = document.querySelectorAll('input[name="flavoring"]');
const creamInputs = Array.from(
  document.querySelectorAll('input[name="cream"]'),
);
const amountInputs = Array.from(
  document.querySelectorAll('.customization__choice input'),
);
const whippedCreamInput = document.querySelector('#whipped-cream');
const finishCoffeeLink = document.querySelector('.main__finish-link');

const coffee = new Coffee();

function setUpInputs(coffeeObj) {
  const { size, roast, sweetener, flavoring, cream, amount } = coffeeObj;
  const sizeInput = Array.from(sizeInputs).find(
    (input) => input.value === size,
  );
  const roastInput = Array.from(roastInputs).find(
    (input) => input.value === roast,
  );
  const sweetenerInput = Array.from(sweetenerInputs).find(
    (input) => input.value === sweetener,
  );
  const selectedFlavoringInputs = Array.from(flavoringInputs).filter((input) =>
    flavoring.includes(input.value),
  );

  sizeInput.checked = true;
  roastInput.checked = true;
  sweetenerInput.checked = true;
  selectedFlavoringInputs.forEach((input) => {
    input.checked = true;
  });
  whippedCreamInput.checked = coffeeObj['whipped-cream'] === 'true';
  if (amount !== '0') {
    const creamInput = Array.from(creamInputs).find(
      (input) => input.value === cream,
    );
    const creamAmountInput = Array.from(amountInputs).find(
      (input) => input.id === `${cream}-${amount}`,
    );
    creamInput.checked = true;
    creamAmountInput.checked = true;
  }
}

function setUpCoffee() {
  if (window.location.href.includes('?')) {
    const coffeeOrder = getCoffeeOrder(window.location.href);
    coffee.createCoffee(coffeeOrder);
    setUpInputs(coffeeOrder);
  }
}

function changeCoffeeWhippedCream(e) {
  coffee.updateCoffeeWhippedCream(e.target.checked);
}

function goToFinishPage(e) {
  e.preventDefault();
  const currentLink = new URL(window.location.href);
  const link = new URL('/coffee-maker/finish.html', currentLink.origin);

  const getValueFromInputs = (inputs) => {
    const checkedInput = Array.from(inputs).find((input) => input.checked);
    return checkedInput && checkedInput.value;
  };

  const getValuesFromInputs = (inputs) =>
    Array.from(inputs)
      .filter((input) => input.checked)
      .map((input) => input.value);

  const coffeeInfo = {
    size: getValueFromInputs(sizeInputs),
    roast: getValueFromInputs(roastInputs),
    sweetener: getValueFromInputs(sweetenerInputs),
    flavoring: getValuesFromInputs(flavoringInputs),
    cream: getValueFromInputs(creamInputs) || 'none',
    amount:
      getValuesFromInputs(amountInputs).find((amount) => amount !== '0') || 0,
    'whipped-cream': whippedCreamInput.checked,
  };

  Object.entries(coffeeInfo).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((nestedValue) => {
        link.searchParams.append(key, nestedValue);
      });
    } else {
      link.searchParams.append(key, value);
    }
  });

  window.location.href = link.href;
}

const coffeeSizeFormGroup = new RadioInputGroup({
  inputSelector: 'input[name="size"]',
  clickEventHandler: (e) => {
    coffee.updateCoffeeSize(e.target.value);
  },
});
coffeeSizeFormGroup.setEventListeners();

const coffeeCreamInputGroup = new RadioWithAmountsInputGroup({
  radioName: 'cream',
  callback: ({ radio: cream, amount }) => {
    coffee.updateCoffeeColor({
      roast: roastInputs.find((input) => input.checked).value,
      cream,
      amount,
    });
  },
});
coffeeCreamInputGroup.setEventListeners();

const coffeeRoastFormGroup = new RadioInputGroup({
  inputSelector: 'input[name="roast"]',
  clickEventHandler: (e) => {
    const roast = e.target.value;
    const { radio: cream, amount } = coffeeCreamInputGroup.getValues();

    coffee.updateCoffeeColor({
      roast,
      cream,
      amount,
    });
  },
});
coffeeRoastFormGroup.setEventListeners();

const coffeeSweetenerFormGroup = new RadioInputGroup({
  inputSelector: 'input[name="sweetener"]',
  clickEventHandler: (e) => {
    coffee.updateCoffeeSweetener(e.target.value);
  },
});
coffeeSweetenerFormGroup.setEventListeners();

const coffeeFlavoringInputGroup = new CheckboxInputGroup({
  inputSelector: 'input[name="flavoring"]',
  callback: (values) => {
    coffee.updateCoffeeFlavorings(values);
  },
});
coffeeFlavoringInputGroup.setEventListeners();

whippedCreamInput.addEventListener('click', changeCoffeeWhippedCream);

finishCoffeeLink.addEventListener('click', goToFinishPage);
setUpCoffee();
