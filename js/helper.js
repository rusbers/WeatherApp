import { UI } from './view.js';

function getCityName(context) {
  return (context.id === 'form') ? UI.INPUT.value : context.textContent;
}

export { getCityName };