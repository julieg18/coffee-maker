function getCoffeeOrder(url) {
  const coffeeOrderParams = new URLSearchParams(new URL(url).searchParams);
  const coffeeOrder = {
    flavoring: [],
  };

  coffeeOrderParams.forEach((value, key) => {
    if (key === 'flavoring') {
      coffeeOrder.flavoring.push(value);
    } else {
      coffeeOrder[key] = value;
    }
  });
  coffeeOrder.whippedCream = coffeeOrder['whipped-cream'] === 'true';
  coffeeOrder.amount = Number(coffeeOrder.amount);

  return coffeeOrder;
}

export default getCoffeeOrder;
