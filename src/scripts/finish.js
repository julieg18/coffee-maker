import '../finish.html';
import '../pages/finish.css';
import {
  addCoffeeSize,
  getCoffeeColor,
  getCoffeeFlavoringClasses,
} from './coffee';

const coffee = document.querySelector('.coffee');
const coffeeLiquid = coffee.querySelector('.coffee__liquid');
const coffeeSweeteners = coffee.querySelectorAll('.coffee__sweetener');
const coffeeFlavorings = coffee.querySelector('.coffee__flavorings');
const coffeeFlavoringIcons = coffee.querySelectorAll('.coffee__flavoring-icon');
const keepEditingBtn = document.querySelector('.finish__edit-coffee-link');

function getCoffeeObj(url) {
  const coffeeOrderParams = new URLSearchParams(new URL(url).searchParams);
  const coffeeObj = {
    flavoring: [],
  };

  coffeeOrderParams.forEach((value, key) => {
    if (key === 'flavoring') {
      coffeeObj.flavoring.push(value);
    } else {
      coffeeObj[key] = value;
    }
  });
  return coffeeObj;
}

function createCoffee(coffeeObj) {
  const { size, roast, sweetener, flavoring, cream, amount } = coffeeObj;

  addCoffeeSize(size);

  coffeeLiquid.classList.add(`coffee__liquid_roast_${roast}`);

  coffeeSweeteners.forEach((sweetenerEl) => {
    sweetenerEl.classList.remove('coffee__sweetener_type_none');
    sweetenerEl.classList.add(`coffee__sweetener_type_${sweetener}`);
  });

  if (flavoring.length !== 0) {
    coffeeFlavorings.classList.add('coffee__flavorings_show');
    const flavoringOptions = Array.from(flavoring).map(
      (flavor) => `coffee__flavoring-icon_flavor_${flavor}`,
    );
    const classes = getCoffeeFlavoringClasses(flavoringOptions);
    coffeeFlavoringIcons.forEach((icon, i) => {
      icon.classList.add(classes[i]);
    });
  }

  coffeeLiquid.style.fill = getCoffeeColor(cream, amount, roast);
}

function goBack(e) {
  e.preventDefault();
  history.back();
}

const coffeeOrder = getCoffeeObj(window.location.href);
createCoffee(coffeeOrder);

keepEditingBtn.addEventListener('click', goBack);
