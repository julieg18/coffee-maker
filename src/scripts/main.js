import '../main.html';
import '../pages/main.css';

const labels = document.querySelectorAll('label');

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

labels.forEach((label) => {
  label.addEventListener('click', clickCorrespondingInput);
  return label;
});
