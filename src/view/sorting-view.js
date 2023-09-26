import AbstractView from '../framework/view/abstract-view';
import { TypeSort } from '../const';
import { remove } from '../framework/render';


const createSorting = (nameSort) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
<div class="trip-sort__item  trip-sort__item--day">
  <input
  id="sort-day"
  class="trip-sort__input  visually-hidden"
  type="radio"
  name="trip-sort"
  value="sort-day"
  ${nameSort === TypeSort.DAY ? 'checked' : ''}
  >
  <label class="trip-sort__btn" for="sort-day">Day</label>
</div>

<div class="trip-sort__item  trip-sort__item--event">
  <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
  <label class="trip-sort__btn" for="sort-event">Event</label>
</div>

<div class="trip-sort__item  trip-sort__item--time">
  <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" disabled>
  <label class="trip-sort__btn" for="sort-time">Time</label>
</div>

<div class="trip-sort__item  trip-sort__item--price">
  <input
  id="sort-price"
  class="trip-sort__input  visually-hidden"
  type="radio"
  name="trip-sort"
  value="sort-price"
  ${nameSort === TypeSort.PRICE ? 'checked' : ''}
  >
  <label class="trip-sort__btn" for="sort-price">Price</label>
</div>

<div class="trip-sort__item  trip-sort__item--offer">
  <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
  <label class="trip-sort__btn" for="sort-offer">Offers</label>
</div>
</form>`;

export default class SortingView extends AbstractView {
  #handlerSortTypeChange = null;
  #nameSort = TypeSort.DAY;

  constructor(onSortTypeChange) {
    super();
    this.#handlerSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSorting(this.#nameSort);
  }


  destroy(component) {
    remove(component);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    if(evt.target.innerText === this.#nameSort) {
      return;
    }

    this.#nameSort = evt.target.innerText;
    this.#handlerSortTypeChange(this.#nameSort);
  };
}
