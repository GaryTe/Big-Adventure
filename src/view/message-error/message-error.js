import { Message } from '../../const';

export default class MessageError {
  #element = null;
  #sortingContainer = null;

  constructor(sortingContainer) {
    this.#sortingContainer = sortingContainer;
  }

  active = (valueError) => {
    const text = Message[valueError];
    this.#element = document.createElement('p');
    this.#element.classList.add('trip-events__msg');
    this.#element.textContent = text;
    this.#sortingContainer.appendChild(this.#element);
  };

  inactive = () => {
    if(this.#element) {
      this.#element.remove();
      this.#element = null;
    }
  };
}
