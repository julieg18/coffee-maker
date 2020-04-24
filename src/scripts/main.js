import '../main.html';
import '../pages/main.css';

const coffeeCup = document.querySelector('.coffee__cup');
const coffeeLiquid = document.querySelector('.coffee__liquid');
const coffeeSweeteners = document.querySelectorAll('.coffee__sweetener');
const coffeeWhippedCream = document.querySelector('.coffee__whipped-cream');
const coffeeFlavorings = document.querySelector('.coffee__flavorings');
const labels = document.querySelectorAll('label');
const sizeInputs = document.querySelectorAll('input[name="size"]');
const roastInputs = document.querySelectorAll('input[name="roast"]');
const sweetenerInputs = document.querySelectorAll('input[name="sweetener"]');

function getCoffeeSizeClass(el, cupSize) {
  return `coffee__${el}_size_${cupSize}`;
}

function removeCoffeeSize(size) {
  coffeeCup.classList.remove(getCoffeeSizeClass('cup', size));
  coffeeLiquid.classList.remove(getCoffeeSizeClass('liquid', size));
  coffeeSweeteners.forEach((sweetener) => {
    sweetener.classList.remove(getCoffeeSizeClass('sweetener', size));
  });
  coffeeWhippedCream.classList.remove(
    getCoffeeSizeClass('whipped-cream', size),
  );
  coffeeFlavorings.classList.remove(getCoffeeSizeClass('flavorings', size));
}

function addCoffeeSize(size) {
  coffeeCup.classList.add(getCoffeeSizeClass('cup', size));
  coffeeLiquid.classList.add(getCoffeeSizeClass('liquid', size));
  coffeeSweeteners.forEach((sweetener) => {
    sweetener.classList.add(getCoffeeSizeClass('sweetener', size));
  });
  coffeeWhippedCream.classList.add(getCoffeeSizeClass('whipped-cream', size));
  coffeeFlavorings.classList.add(getCoffeeSizeClass('flavorings', size));
}

function changeCoffeeSize(e) {
  const input = e.target;
  const size = input.value;
  const unusedSizes = ['small', 'medium', 'large'].filter(
    (sizeName) => size !== sizeName,
  );
  unusedSizes.forEach((unusedSize) => {
    if (coffeeCup.classList.contains(getCoffeeSizeClass('cup', unusedSize))) {
      removeCoffeeSize(unusedSize);
    }
  });
  if (!coffeeCup.classList.contains(getCoffeeSizeClass('cup', size))) {
    addCoffeeSize(size);
  }
}

function changeCoffeeRoast(e) {
  const input = e.target;
  const roast = input.value;
  const unusedRoasts = ['light', 'medium', 'dark'].filter(
    (roastName) => roastName !== roast,
  );
  unusedRoasts.forEach((unusedRoast) => {
    coffeeLiquid.classList.remove(`coffee__liquid_roast_${unusedRoast}`);
  });
  coffeeLiquid.classList.add(`coffee__liquid_roast_${roast}`);
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
    sweetenerEl.classList.add(`coffee__sweetener_type_${sweetener}`);
  });
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

function addEventListenersToElements(elements, listenerFunc) {
  elements.forEach((element) => {
    element.addEventListener('click', listenerFunc);
  });
}

addEventListenersToElements(labels, clickCorrespondingInput);
addEventListenersToElements(sizeInputs, changeCoffeeSize);
addEventListenersToElements(roastInputs, changeCoffeeRoast);
addEventListenersToElements(sweetenerInputs, changeCoffeeSweetener);
