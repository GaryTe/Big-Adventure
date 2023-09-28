import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {
  returnEventType,
  getDestinationList,
  returnDestinationList,
  getNameDestination,
  getDataForTypePoint,
  getNumberOffer,
  getDataForTypeDestination,
  roundNumber
} from '../utils/utils-for-forms';
import { Mode } from '../const';

const createFormEditPoint = (waypoint) => {
  const {type, offers, destination, basePrice} = waypoint;

  return (`<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header" style="flex-wrap: wrap;">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img
        class="event__type-icon"
        width="17"
        height="17"
        src="img/icons/${type}.png"
        alt="Event type icon"
        >
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      ${returnEventType(type)}
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input
      class="event__input
      event__input--destination"
      id="event-destination-1"
      type="text"
      name="event-destination"
      value=${getNameDestination(destination).name}
      list="destination-list-1"
      >
      ${returnDestinationList()}
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input
      class="event__input  event__input--time"
      id="event-start-time-1"
      type="text"
      name="event-start-time"
      value="18/03/19 12:25"
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input
      class="event__input  event__input--time"
      id="event-end-time-1"
      type="text"
      name="event-end-time"
      value="18/03/19 13:35"
      >
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input
      class="event__input  event__input--price"
      id="event-price-1"
      type="text"
      name="event-price"
      value=${basePrice}
      >
    </div>

    <button
    class="event__save-btn  btn  btn--blue"
    type="submit"
    ${!destination ? 'disabled' : ''}
    >
    Save
    </button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
    <p class="error"
      style="
      margin: 0;
      margin-left: 70px;
      width: 293px;
      font-family: 'Montserrat';
      color: red;"
      ${destination ? 'hidden' : ''}
    >
      Город не соответствует списку. Выберети город из списка.
    </p>
  </header>
  <section class="event__details">
    ${getDataForTypePoint(type, offers)}
    ${getDataForTypeDestination(destination)}
  </section>
</form>
</li>`);
};

export default class FormEditPointView extends AbstractStatefulView {
  #handleArrowClick = null;
  #handleChangeWaypoint = null;
  #handleDeletWaypoint = null;
  #dataRout = null;
  #mode = Mode.NO_SAVE;

  constructor(rout, onArrowClick, onChangeWaypoint, onDeletWaypoint) {
    super();
    this.#dataRout = rout;
    this._setState(rout);
    this.#handleArrowClick = onArrowClick;
    this.#handleChangeWaypoint = onChangeWaypoint;
    this.#handleDeletWaypoint = onDeletWaypoint;

    this._restoreHandlers();
  }

  get template() {
    return createFormEditPoint(this._state);
  }


  get mode() {
    return this.#mode;
  }


  reset = () => {this.updateElement({...this.#dataRout});};


  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#arrowClickHandle);
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#inputEventClickHandle);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#optionDestinationClickHandle);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#inputPriceChangeHandle);
    this.element.querySelector('.event__details')
      .addEventListener('click', this.#labelOfferClickHandle);
    this.element.querySelector('.event__save-btn')
      .addEventListener('click', this.#buttonSaveClickHandle);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#buttonDeleteClickHandle);
  }


  #arrowClickHandle = () => {
    this.#handleArrowClick();
  };


  #inputEventClickHandle = (evt) => {
    if(!evt.target.matches('label')) {
      return;
    }

    this.updateElement({type: evt.target.innerText.toLowerCase(), offers: null});
  };


  #optionDestinationClickHandle = (evt) => {
    const numberDestination = getNameDestination(evt.target.value);
    let nameDestination = null;

    getDestinationList().forEach((nameDestinati) => {
      if(nameDestinati === evt.target.value) {
        nameDestination = nameDestinati;
      }
    });

    if(nameDestination === evt.target.value) {
      this.updateElement({destination: numberDestination.id});
      return;
    }

    this.updateElement({destination: nameDestination});
  };


  #inputPriceChangeHandle = (evt) => {
    const price = roundNumber(evt.target.value);
    this.updateElement({basePrice: price});
  };


  #labelOfferClickHandle = (evt) => {
    if(evt.target.matches('label')) {
      this.#updatelabelOffer(evt.target);
    }

    if(evt.target.matches('span')) {
      this.#updatelabelOffer(evt.target);
    }
  };


  #updatelabelOffer = (element) => {
    let namberOffer = null;

    if(element.matches('label')) {
      const {children} = element;
      const [ferstElement] = children;
      const {innerText} = ferstElement;
      namberOffer = innerText;
    }else{
      namberOffer = element.innerText;
    }

    const {offers, type} = this._state;

    const numberOffer = getNumberOffer(namberOffer, type);

    if(offers) {
      this.updateElement({offers: [...offers, numberOffer]});
    }else{
      this.updateElement({offers: [numberOffer]});
    }
  };

  #buttonSaveClickHandle = () => {
    this.#mode = Mode.SAVE;
    this.#handleArrowClick();
    this.#handleChangeWaypoint(this._state);
  };

  #buttonDeleteClickHandle = () => {
    this.#handleArrowClick();
    this.#handleDeletWaypoint(this._state);
  };
}
