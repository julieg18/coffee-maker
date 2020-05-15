const coffee = document.querySelector('.coffee');
const coffeeCup = coffee.querySelector('.coffee__cup');
const coffeeLiquid = coffee.querySelector('.coffee__liquid');
const coffeeSweeteners = coffee.querySelectorAll('.coffee__sweetener');
const coffeeWhippedCream = coffee.querySelector('.coffee__whipped-cream');
const coffeeFlavorings = coffee.querySelector('.coffee__flavorings');
const coffeeFlavoringIcons = coffee.querySelectorAll('.coffee__flavoring-icon');
const coffeePaths = {
  small: {
    cup: 'M 1 50 L 99 50 L 85 149 L 15 149 Z',
    liquid: 'M 5 60 L 95 60 L 83 147 L 17 147 Z',
    'whipped-cream': 'M 3 51 L 97 51 L 94.46 64 L 5.5 64 Z',
  },

  medium: {
    cup: 'M 1 25 L 99 25 L 85 149 L 15 149 Z',
    liquid: 'M 4 34 L 96 34 L 83 147 L 17 147 Z',
    'whipped-cream': 'M 3 26 L 97 26 L 95.36 42 L 4.6 42 Z',
  },

  large: {
    cup: 'M 1 3 L 99 3 L 85 149 L 15 149 Z',
    liquid: 'M 4 13 L 96 13 L 83 147 L 17 147 Z',
    'whipped-cream': 'M 3 4 L 97 4 L 95.36 20 L 4.6 20 Z',
  },
};

function getCoffeeSizeClass(el, cupSize) {
  return `coffee__${el}_size_${cupSize}`;
}

function addCoffeeSize(size) {
  const [cup, liquid, whippedCream] = Object.values(coffeePaths[size]);
  coffeeCup.setAttribute('d', cup);
  coffeeLiquid.setAttribute('d', liquid);
  coffeeSweeteners.forEach((sweetener) => {
    sweetener.classList.add(getCoffeeSizeClass('sweetener', size));
  });
  coffeeWhippedCream.setAttribute('d', whippedCream);
  coffeeFlavorings.classList.add(getCoffeeSizeClass('flavorings', size));
}

function addCoffeeSweetener(sweetener, type) {
  sweetener.classList.add(`coffee__sweetener_type_${type}`);

  switch (type) {
    case 'honey':
      sweetener.setAttribute('rx', 1);
      sweetener.setAttribute('ry', 1);
      break;
    case 'sugar':
      sweetener.setAttribute('rx', 0);
      sweetener.setAttribute('ry', 0);
      break;
    case 'stevia':
      sweetener.setAttribute('rx', 1);
      sweetener.setAttribute('ry', 1);
      break;
    default:
  }
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
    addCoffeeSweetener(sweetenerEl, sweetener);
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

  if (coffeeObj['whipped-cream'] === 'true') {
    coffeeWhippedCream.classList.add('coffee__whipped-cream_show');
  }
}

export {
  getCoffeeSizeClass,
  addCoffeeSize,
  addCoffeeSweetener,
  getCoffeeColor,
  getCoffeeFlavoringClasses,
  getCoffeeObj,
  createCoffee,
};
