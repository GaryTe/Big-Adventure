import AbstractView from '../framework/view/abstract-view';
import { TypeFilter } from '../const';
import { remove } from '../framework/render';

const createFilter = () =>`<form class="trip-filters" action="#" method="get">
                <div class="trip-filters__filter">
                  <input
                  id="filter-everything"
                  class="trip-filters__filter-input  visually-hidden"
                  type="radio"
                  name="trip-filter"
                  value="everything"
                  checked
                  >
                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
                </div>

                <div class="trip-filters__filter">
                  <input
                  id="filter-future"
                  class="trip-filters__filter-input  visually-hidden"
                  type="radio"
                  name="trip-filter"
                  value="future"
                  >
                  <label class="trip-filters__filter-label" for="filter-future">Future</label>
                </div>

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;


export default class FilterView extends AbstractView {
  #handlerFilterTypeChange = null;
  #nameFilter = TypeFilter.EVERYTHING;

  constructor(onFilterTypeChange) {
    super();
    this.#handlerFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilter();
  }


  get nameFilter() {
    return this.#nameFilter;
  }


  destroy(component) {
    remove(component);
  }


  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    if(evt.target.innerText === this.#nameFilter) {
      return;
    }

    this.#nameFilter = evt.target.innerText;
    this.#handlerFilterTypeChange(this.#nameFilter);
  };
}
