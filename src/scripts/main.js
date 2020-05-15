import '../main.html';
import '../pages/main.css';
import {
  getCoffeeSizeClass,
  addCoffeeSize,
  addCoffeeSweetener,
  getCoffeeColor,
  getCoffeeFlavoringClasses,
  getCoffeeObj,
  createCoffee,
} from './coffee';

const coffeeCup = document.querySelector('.coffee__cup');
const coffeeLiquid = document.querySelector('.coffee__liquid');
const coffeeSweeteners = document.querySelectorAll('.coffee__sweetener');
const coffeeWhippedCream = document.querySelector('.coffee__whipped-cream');
const coffeeFlavorings = document.querySelector('.coffee__flavorings');
const coffeeFlavoringIcons = coffeeFlavorings.querySelectorAll(
  '.coffee__flavoring-icon',
);
const labels = document.querySelectorAll('label');
const sizeInputs = document.querySelectorAll('input[name="size"]');
const roastInputs = document.querySelectorAll('input[name="roast"]');
const sweetenerInputs = document.querySelectorAll('input[name="sweetener"]');
const flavoringInputs = document.querySelectorAll('input[name="flavoring"]');
const whippingCreamAmountInputs = document.querySelectorAll(
  'input[name="whipping-cream-amounts"]',
);
const creamInputs = document.querySelectorAll('input[name="cream"]');
const amountInputs = document.querySelectorAll('.customization__choice input');
const almondMilkAmountInputs = document.querySelectorAll(
  'input[name="almond-milk-amounts"]',
);
const soyMilkAmountInputs = document.querySelectorAll(
  'input[name="soy-milk-amounts"]',
);
const additionalInputs = document.querySelectorAll(
  'input[name="additional-options"]',
);
const whippedCreamInput = document.querySelector('#whipped-cream');
const finishCoffeeLink = document.querySelector('.main__finish-link');

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
    const coffeeObj = getCoffeeObj(window.location.href);
    createCoffee(coffeeObj);
    setUpInputs(coffeeObj);
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

function removeCoffeeSize(size) {
  coffeeSweeteners.forEach((sweetener) => {
    sweetener.classList.remove(getCoffeeSizeClass('sweetener', size));
  });
  coffeeFlavorings.classList.remove(getCoffeeSizeClass('flavorings', size));
}

function changeCoffeeSize(e) {
  const input = e.target;
  const size = input.value;
  const unusedSizes = ['small', 'medium', 'large'].filter(
    (sizeName) => size !== sizeName,
  );
  const doesCoffeeHaveSize = (size) =>
    coffeeFlavorings.classList.contains(getCoffeeSizeClass('flavorings', size));

  unusedSizes.forEach((unusedSize) => {
    if (doesCoffeeHaveSize(unusedSize)) {
      removeCoffeeSize(unusedSize);
    }
  });
  if (!doesCoffeeHaveSize(size)) {
    addCoffeeSize(size);
  }
}

function changeCoffeeRoast(e) {
  const roast = e.target.value;
  const unusedRoasts = ['light', 'medium', 'dark'].filter(
    (roastName) => roastName !== roast,
  );
  unusedRoasts.forEach((unusedRoast) => {
    coffeeLiquid.classList.remove(`coffee__liquid_roast_${unusedRoast}`);
  });
  coffeeLiquid.classList.add(`coffee__liquid_roast_${roast}`);
  const isCreamAdded = Array.from(amountInputs).some(
    (input) => input.checked && input.value !== '0',
  );
  if (!isCreamAdded) {
    coffeeLiquid.removeAttribute('style');
  }
}

function changeCoffeeSweetener(e) {
  const input = e.target;
  const sweetener = input.value;
  const unusedSweeteners = ['sugar', 'honey', 'stevia', 'none'].filter(
    (sweetenerName) => sweetenerName !== sweetener,
  );
  unusedSweeteners.forEach((unusedSweetener) => {
    coffeeSweeteners.forEach((sweetenerEl) => {
      sweetenerEl.classList.remove(`coffee__sweetener_type_${unusedSweetener}`);
    });
  });
  coffeeSweeteners.forEach((sweetenerEl) => {
    addCoffeeSweetener(sweetenerEl, sweetener);
  });
}

function changeCoffeeFlavorings() {
  const flavorings = Array.from(flavoringInputs)
    .filter((input) => input.checked)
    .map((input) => `coffee__flavoring-icon_flavor_${input.value}`);
  const flavoringClasses = getCoffeeFlavoringClasses(flavorings);

  if (flavoringClasses.length !== 0) {
    coffeeFlavorings.classList.add('coffee__flavorings_show');
    coffeeFlavoringIcons.forEach((icon, i) => {
      icon.className = icon.className
        .split(' ')
        .filter((className) => !className.includes('icon_flavor'))
        .join(' ');
      icon.classList.add(flavoringClasses[i]);
    });
  } else {
    coffeeFlavorings.classList.remove('coffee__flavorings_show');
  }
}

function changeCoffeeAdditionalOptions() {
  additionalInputs.forEach((input) => {
    switch (input.value) {
      case 'whipped-cream':
        if (input.checked) {
          coffeeWhippedCream.classList.add('coffee__whipped-cream_show');
        } else {
          coffeeWhippedCream.classList.remove('coffee__whipped-cream_show');
        }
        break;
      default:
    }
  });
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

  coffeeLiquid.style.fill = getCoffeeColor(
    cream,
    amount,
    Array.from(roastInputs).find((input) => input.checked).value,
  );
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
addEventListenersToElements(
  'click',
  additionalInputs,
  changeCoffeeAdditionalOptions,
);
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