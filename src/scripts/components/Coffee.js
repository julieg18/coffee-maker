class Coffee {
  constructor() {
    this._coffee = document.querySelector('.coffee');
    this._coffeeCup = this._coffee.querySelector('.coffee__cup');
    this._coffeeLiquid = this._coffee.querySelector('.coffee__liquid');
    this._coffeeSweeteners = Array.from(
      this._coffee.querySelectorAll('.coffee__sweetener'),
    );
    this._coffeeWhippedCream = this._coffee.querySelector(
      '.coffee__whipped-cream',
    );
    this._coffeeFlavorings = this._coffee.querySelector('.coffee__flavorings');
    this._coffeeFlavoringIcons = Array.from(
      this._coffee.querySelectorAll('.coffee__flavoring-icon'),
    );
  }

  updateCoffeeSize(size) {
    const coffeeSvgPaths = {
      small: {
        cup: 'M 1 50 L 99 50 L 85 149 L 15 149 Z',
        liquid: 'M 5 60 L 95 60 L 83 147 L 17 147 Z',
        whippedCream: 'M 3 51 L 97 51 L 94.46 64 L 5.5 64 Z',
      },
      medium: {
        cup: 'M 1 25 L 99 25 L 85 149 L 15 149 Z',
        liquid: 'M 4 34 L 96 34 L 83 147 L 17 147 Z',
        whippedCream: 'M 3 26 L 97 26 L 95.36 42 L 4.6 42 Z',
      },
      large: {
        cup: 'M 1 3 L 99 3 L 85 149 L 15 149 Z',
        liquid: 'M 4 13 L 96 13 L 83 147 L 17 147 Z',
        whippedCream: 'M 3 4 L 97 4 L 95.36 20 L 4.6 20 Z',
      },
    };

    const { cup, liquid, whippedCream } = coffeeSvgPaths[size];
    this._coffee.className = `coffee coffee_size_${size}`;
    this._coffeeCup.setAttribute('d', cup);
    this._coffeeLiquid.setAttribute('d', liquid);
    this._coffeeWhippedCream.setAttribute('d', whippedCream);
  }

  updateCoffeeRoast(roast) {
    this._coffeeLiquid.setAttribute(
      'class',
      `coffee__liquid coffee__liquid_roast_${roast}`,
    );
  }

  updateCoffeeSweetener(type) {
    this._coffeeSweeteners.forEach((sweetenerEl) => {
      sweetenerEl.setAttribute(
        'class',
        `coffee__sweetener coffee__sweetener_type_${type}`,
      );

      if (type === 'sugar') {
        sweetenerEl.setAttribute('rx', 0);
        sweetenerEl.setAttribute('ry', 0);
      } else {
        sweetenerEl.setAttribute('rx', 1);
        sweetenerEl.setAttribute('ry', 1);
      }
    });
  }

  updateCoffeeFlavorings(flavorOpts) {
    const getCoffeeFlavorings = (flavoringOpts) => {
      let flavorings = [];
      const iconsLength = this._coffeeFlavoringIcons.length;
      if (flavoringOpts.length !== 0) {
        while (flavorings.length < iconsLength) {
          flavorings.push(...flavoringOpts);
        }
        flavorings = flavorings.slice(0, iconsLength);
      }
      return flavorings;
    };

    const flavors = getCoffeeFlavorings(flavorOpts);
    if (flavors.length === 0) {
      this._coffeeFlavorings.classList.remove('coffee__flavorings_show');
      return;
    }
    this._coffeeFlavorings.classList.add('coffee__flavorings_show');
    this._coffeeFlavoringIcons.forEach((icon, i) => {
      icon.className = `coffee__flavoring-icon coffee__flavoring-icon_flavor_${flavors[i]}`;
    });
  }

  updateCoffeeColor({ cream, amount, roast }) {
    const colors = {
      light: '#653423',
      medium: '#592a1c',
      dark: '#38150e',
      'whipping-cream': ['#A0583A', '#BE7644', '#E8B885', '#F3DAB4', '#FAEAC2'],
      'soy-milk': ['#95482B', '#B76938', '#E5B17E', '#F2D6B0', '#F9E6BE'],
      'almond-milk': ['#8A462E', '#AA5F32', '#D29F71', '#F0D2AC', '#F8E3BB'],
    };

    this._coffeeLiquid.style.fill =
      amount === 0 ? colors[roast] : colors[cream][amount - 1];
  }

  updateCoffeeWhippedCream(addWhippedCream) {
    if (addWhippedCream) {
      this._coffeeWhippedCream.classList.add('coffee__whipped-cream_show');
    } else {
      this._coffeeWhippedCream.classList.remove('coffee__whipped-cream_show');
    }
  }

  createCoffee({
    size,
    roast,
    sweetener,
    flavoring,
    cream,
    amount,
    whippedCream,
  }) {
    this.updateCoffeeSize(size);

    this.updateCoffeeSweetener(sweetener);

    this.updateCoffeeFlavorings(flavoring);

    this.updateCoffeeColor({ cream, amount, roast });

    this.updateCoffeeWhippedCream(whippedCream);
  }
}

export default Coffee;
