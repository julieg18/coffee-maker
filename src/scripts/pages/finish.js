import '../../finish.html';
import '../../pages/finish.css';
import Coffee from '../components/Coffee';
import getCoffeeOrder from '../utils/utils';
import { keepEditingLink } from '../utils/constants';

function addHrefToLink() {
  const url = new URL(window.location.href);
  const link = new URL('/coffee-maker/main.html', url.origin);
  const searchParams = new URLSearchParams(url.searchParams);
  keepEditingLink.href = `${link.toString()}?${searchParams.toString()}`;
}

const coffeeOrder = getCoffeeOrder(window.location.href);
const coffee = new Coffee();
coffee.createCoffee(coffeeOrder);
addHrefToLink();
