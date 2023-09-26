import AbstractView from '../framework/view/abstract-view';
import { Mode } from '../const';

const createButtonNewEvent = (indicatorButton) => `<button
  class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
  type="button"
  ${indicatorButton === Mode.EDITING ? 'disabled' : ''}
  >
  New event
  </button>`;

export default class ButtonNewEventView extends AbstractView{
  #indicatorButton = null;
  #handleOpenFormAddNewPoint = null;

  constructor (
    indicatorButton,
    onOpenFormAddNewPoint
  ) {
    super();
    this.#indicatorButton = indicatorButton;
    this.#handleOpenFormAddNewPoint = onOpenFormAddNewPoint;

    this.element.addEventListener('click', this.#buttonEventClickHandle);
  }

  get template() {
    return createButtonNewEvent(this.#indicatorButton);
  }

  #buttonEventClickHandle = () => {
    this.#handleOpenFormAddNewPoint(Mode.EDITING);
  };
}
