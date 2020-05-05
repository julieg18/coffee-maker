const coffee = document.querySelector('.coffee');
const coffeeCup = coffee.querySelector('.coffee__cup');
const coffeeLiquid = coffee.querySelector('.coffee__liquid');
const coffeeSweeteners = coffee.querySelectorAll('.coffee__sweetener');
const coffeeWhippedCream = coffee.querySelector('.coffee__whipped-cream');
const coffeeFlavorings = coffee.querySelector('.coffee__flavorings');
const coffeeFlavoringIcons = coffee.querySelectorAll('.coffee__flavoring-icon');

function getCoffeeSizeClass(el, cupSize) {
  return `coffee__${el}_size_${cupSize}`;
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

function getCoffeeColor(creamer, amount, roast) {
  const colors = {
    light: '#653423',
    medium: '#592a1c',
    dark: '#38150e',
    'whipping-cream': ['#A0583A', '#BE7644', '#E8B885', '#F3DAB4', '#FAEAC2'],
    'soy-milk': ['#95482B', '#B76938', '#E5B17E', '#F2D6B0', '#F9E6BE'],
    'almond-milk': ['#8A462E', '#AA5F32', '#D29F71', '#F0D2AC', '#F8E3BB'],
  };

  if (amount === '0') {
    return colors[roast];
  }
  return colors[creamer][amount - 1];
}

function getCoffeeFlavoringClasses(flavoringClassOpts) {
  let flavoringClasses = [];
  if (flavoringClassOpts.length !== 0) {
    while (flavoringClasses.length < coffeeFlavoringIcons.length) {
      flavoringClasses = [...flavoringClasses, ...flavoringClassOpts];
    }
    flavoringClasses = flavoringClasses.slice(0, coffeeFlavoringIcons.length);
  }
  return flavoringClasses;
}

export {
  getCoffeeSizeClass,
  addCoffeeSize,
  getCoffeeColor,
  getCoffeeFlavoringClasses,
};
