import '../../main.html';
import '../../pages/main.css';
import Coffee from '../components/Coffee';
import RadioInputGroup from '../components/RadioInputGroup';
import CheckboxInputGroup from '../components/CheckboxInputGroup';
import RadioWithAmountsInputGroup from '../components/RadioWithAmountsInputGroup';
import getCoffeeOrder from '../utils/utils';

const roastInputs = Array.from(
  document.querySelectorAll('input[name="roast"]'),
);
const whippedCreamInput = document.querySelector('#whipped-cream');
const finishCoffeeLink = document.querySelector('.main__finish-link');

const coffee = new Coffee();

const coffeeSizeFormGroup = new RadioInputGroup({
  inputSelector: 'input[name="size"]',
  clickEventHandler: (e) => {
    coffee.updateCoffeeSize(e.target.value);
  },
});

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

const coffeeSweetenerFormGroup = new RadioInputGroup({
  inputSelector: 'input[name="sweetener"]',
  clickEventHandler: (e) => {
    coffee.updateCoffeeSweetener(e.target.value);
  },
});

const coffeeFlavoringInputGroup = new CheckboxInputGroup({
  inputSelector: 'input[name="flavoring"]',
  callback: (values) => {
    coffee.updateCoffeeFlavorings(values);
  },
});

function setUpInputs(coffeeObj) {
  const {
    size,
    roast,
    sweetener,
    flavoring,
    cream,
    amount,
    whippedCream,
  } = coffeeObj;

  coffeeSizeFormGroup.setValue(size);
  coffeeRoastFormGroup.setValue(roast);
  coffeeSweetenerFormGroup.setValue(sweetener);
  coffeeFlavoringInputGroup.setValues(flavoring);
  coffeeCreamInputGroup.setValues({ radio: cream, amount });
  whippedCreamInput.checked = whippedCream;
}

function setUpPage() {
  if (window.location.href.includes('?')) {
    const coffeeOrder = getCoffeeOrder(window.location.href);
    coffee.createCoffee(coffeeOrder);
    setUpInputs(coffeeOrder);
  }
}

function goToFinishPage(e) {
  e.preventDefault();
  const currentLink = new URL(window.location.href);
  const link = new URL('/coffee-maker/finish.html', currentLink.origin);

  const { radio: cream = 'none', amount } = coffeeCreamInputGroup.getValues();
  const coffeeInfo = {
    size: coffeeSizeFormGroup.getValue(),
    roast: coffeeRoastFormGroup.getValue(),
    sweetener: coffeeSweetenerFormGroup.getValue(),
    flavoring: coffeeFlavoringInputGroup.getValues(),
    cream,
    amount,
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

coffeeFlavoringInputGroup.setEventListeners();
coffeeSizeFormGroup.setEventListeners();
coffeeCreamInputGroup.setEventListeners();
coffeeRoastFormGroup.setEventListeners();
coffeeSweetenerFormGroup.setEventListeners();
whippedCreamInput.addEventListener('click', (e) => {
  coffee.updateCoffeeWhippedCream(e.target.checked);
});
finishCoffeeLink.addEventListener('click', goToFinishPage);
setUpPage();
