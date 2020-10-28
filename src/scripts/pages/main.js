import '../../main.html';
import '../../pages/main.css';
import Coffee from '../components/Coffee';
import getCoffeeOrder from '../utils/utils';

const labels = document.querySelectorAll('label');
const sizeInputs = document.querySelectorAll('input[name="size"]');
const roastInputs = document.querySelectorAll('input[name="roast"]');
const sweetenerInputs = document.querySelectorAll('input[name="sweetener"]');
const flavoringInputs = document.querySelectorAll('input[name="flavoring"]');
const whippingCreamAmountInputs = document.querySelectorAll(
  'input[name="whipping-cream-amounts"]',
);
const creamInputs = Array.from(
  document.querySelectorAll('input[name="cream"]'),
);
const amountInputs = Array.from(
  document.querySelectorAll('.customization__choice input'),
);
const almondMilkAmountInputs = document.querySelectorAll(
  'input[name="almond-milk-amounts"]',
);
const soyMilkAmountInputs = document.querySelectorAll(
  'input[name="soy-milk-amounts"]',
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

function clickCorrespondingInput(e) {
  const id = this.getAttribute('for');
  if (
    this === e.target ||
    e.target.classList.contains('customization__choice-btn')
  ) {
    document.querySelector(`#${id}`).click();
  } else {
    e.stopPropagation();
  }
}

function changeCoffeeSize(e) {
  coffee.updateCoffeeSize(e.target.value);
}

function changeCoffeeRoast(e) {
  const roast = e.target.value;
  const cream = creamInputs.find((i) => i.checked);
  const amount = cream
    ? amountInputs.find((i) => i.checked && i.name.includes(cream.value)).value
    : 0;

  coffee.updateCoffeeColor({
    roast,
    cream: cream ? cream.value : 'none',
    amount,
  });
}

function changeCoffeeSweetener(e) {
  coffee.updateCoffeeSweetener(e.target.value);
}

function changeCoffeeFlavorings() {
  const flavorOptions = [];
  flavoringInputs.forEach((flavoringInput) => {
    if (flavoringInput.checked) {
      flavorOptions.push(flavoringInput.value);
    }
  });
  coffee.updateCoffeeFlavorings(flavorOptions);
}

function changeCoffeeWhippedCream(e) {
  coffee.updateCoffeeWhippedCream(e.target.value);
}

function uncheckOtherCreamInputs(creamType) {
  const uncheckCreamInputs = (creams) => {
    creams.forEach((cream) => {
      const inputs = document.querySelectorAll(
        `input[name="${cream}-amounts"]`,
      );

      inputs[0].click();
    });
  };
  const creamsToBeUnchecked = [
    'whipping-cream',
    'almond-milk',
    'soy-milk',
  ].filter((cream) => cream !== creamType);

  uncheckCreamInputs(creamsToBeUnchecked);
}

function changeCoffeeCream(e) {
  const cream = e.target.name.replace('-amounts', '');
  const amount = e.target.value;

  if (amount === '0') {
    document.querySelector(`#${cream}`).checked = false;
  } else {
    document.querySelector(`#${cream}`).checked = true;
    uncheckOtherCreamInputs(cream);
  }

  const roast = Number(
    Array.from(roastInputs).find((input) => input.checked).value,
  );
  coffee.updateCoffeeColor({ cream, amount, roast });
}

function handleCreamInputs(e) {
  const input = e.target;
  const inputCreamType = input.value;

  const inputs = document.querySelectorAll(
    `input[name="${inputCreamType}-amounts"]`,
  );

  if (!inputs[0].checked) {
    inputs[0].click();
    input.checked = false;
  } else {
    inputs[1].click();
  }
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

function addEventListenersToElements(event, elements, listenerFunc) {
  elements.forEach((element) => {
    element.addEventListener(event, listenerFunc);
  });
}

addEventListenersToElements('click', labels, clickCorrespondingInput);
addEventListenersToElements('click', sizeInputs, changeCoffeeSize);
addEventListenersToElements('click', roastInputs, changeCoffeeRoast);
addEventListenersToElements('click', sweetenerInputs, changeCoffeeSweetener);
addEventListenersToElements('click', flavoringInputs, changeCoffeeFlavorings);
whippedCreamInput.addEventListener('click', changeCoffeeWhippedCream);
addEventListenersToElements('click', creamInputs, handleCreamInputs);
addEventListenersToElements(
  'click',
  whippingCreamAmountInputs,
  changeCoffeeCream,
);
addEventListenersToElements('click', soyMilkAmountInputs, changeCoffeeCream);
addEventListenersToElements('click', almondMilkAmountInputs, changeCoffeeCream);
finishCoffeeLink.addEventListener('click', goToFinishPage);
setUpCoffee();
