import '../finish.html';
import '../pages/finish.css';
import { getCoffeeObj, createCoffee } from './coffee';

const keepEditingLink = document.querySelector('.finish__edit-coffee-link');

function addHrefToLink() {
  const url = new URL(window.location.href);
  const link = new URL('/coffee-maker/main.html', url.origin);
  const searchParams = new URLSearchParams(url.searchParams);
  keepEditingLink.href = `${link.toString()}?${searchParams.toString()}`;
}

const coffeeOrder = getCoffeeObj(window.location.href);
createCoffee(coffeeOrder);
addHrefToLink();
