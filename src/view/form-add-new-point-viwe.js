import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {
  returnEventType,
  getDestinationList,
  getNameDestination,
  returnDestinationList,
  getDataForTypePoint,
  getDataForTypeDestination,
  getNumberOffer,
  roundNumber,
  parseNewStateToWaypoint
} from '../utils/utils-for-forms';
import { TypeAction, TypeRedraw } from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {encode} from 'he';


const createFormAddNewPoint = (waypoint) => {
  const {
    type,
    offers,
    destination,
    basePrice,
    isSaving = false,
    isDisabled = false
  } = waypoint;

  return(` <li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header" style="flex-wrap: wrap;">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img
        class="event__type-icon"
        width="17"
        height="17"
        src="img/icons/${encode(type)}.png"
        alt="Event type icon"
        >
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      ${returnEventType(type)}
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${encode(type)}
      </label>
      <input
      class="event__input  event__input--destination"
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
      class="event__input  event__input--time event-start-time"
      id="event-start-time-1"
      type="text"
      name="event-start-time"
      value="19/03/19 00:00"
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input
      class="event__input  event__input--time event-end-time"
      id="event-end-time-1"
      type="text"
      name="event-end-time"
      value="19/03/19 00:00">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
        <!--roundNumber()-->
      </label>
      <input
      class="event__input  event__input--price"
      id="event-price-1"
      type="text"
      name="event-price"
      value=${encode(basePrice.toString())}
      >
    </div>

    <button
    class="event__save-btn  btn  btn--blue"
    type="submit"
    ${!destination || isDisabled ? 'disabled' : ''}
    >
    ${!isSaving ? 'Save' : 'Saving'}
    </button>
    <button
    class="event__reset-btn"
    type="reset"
    ${isDisabled ? 'disabled' : ''}
    >
    Cancel
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

export default class FormAddNewPointViwe extends AbstractStatefulView {
  #handleCloseOpenFormAddNewPoint = null;
  #handleRecordNewWaypoint = null;
  #dataAndTimeStartEvent = null;
  #dataAndTimeEndEvent = null;

  constructor(onCloseOpenFormAddNewPoint, onRecordNewWaypoint, points) {
    super();
    this._setState(points[0]);
    this.#handleCloseOpenFormAddNewPoint = onCloseOpenFormAddNewPoint;
    this.#handleRecordNewWaypoint = onRecordNewWaypoint;

    this._restoreHandlers();
  }


  get template() {
    return createFormAddNewPoint(this._state);
  }


  removeElement() {
    super.removeElement();

    if (this.#dataAndTimeStartEvent) {
      this.#dataAndTimeStartEvent.destroy();
      this.#dataAndTimeStartEvent = null;
    }

    if (this.#dataAndTimeEndEvent) {
      this.#dataAndTimeEndEvent.destroy();
      this.#dataAndTimeEndEvent = null;
    }
  }


  _restoreHandlers() {
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
      .addEventListener('click', this.#buttonCancelClickHandle);
    this.#setDataAndTimeStartEvent();
  }


  #dataAndTimeChangeHandler = (userDateAndTime) => {
    this.updateElement(userDateAndTime);
  };


  #setDataAndTimeStartEvent = () => {
    if (this._state.dateFrom) {
      this.#dataAndTimeStartEvent = flatpickr(
        this.element.querySelector('.event-start-time'),
        {
          dateFormat: 'j/m/y H:i',
          defaultDate: this._state.dateFrom,
          enableTime: true,
          maxDate: this._state.dateTo,
          onClose: (userDateAndTime) => this.#dataAndTimeChangeHandler(
            {dateFrom: userDateAndTime[0].toISOString()}
          )
        },
      );
    }

    if (this._state.dateTo) {
      this.#dataAndTimeEndEvent = flatpickr(
        this.element.querySelector('.event-end-time'),
        {
          dateFormat: 'j/m/y H:i',
          defaultDate: this._state.dateTo,
          enableTime: true,
          minDate: this._state.dateFrom,
          onClose: (userDateAndTime) => this.#dataAndTimeChangeHandler(
            {dateTo: userDateAndTime[0].toISOString()}
          )
        },
      );
    }
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
    let index = -1;

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

    if(offers) {index = offers.findIndex((offer) => offer === numberOffer);}

    if(index !== -1) {
      this.updateElement({
        offers: [
          ...offers.slice(0, index),
          ...offers.slice(index + 1)
        ]
      });
      return;
    }

    if(offers) {
      this.updateElement({offers: [...offers, numberOffer]});
    }else{
      this.updateElement({offers: [numberOffer]});
    }
  };


  #buttonSaveClickHandle = (evt) => {
    evt.preventDefault();
    this.#handleRecordNewWaypoint({
      nameAction: TypeAction.POST,
      nameRedraw: TypeRedraw.MINOR,
      data: parseNewStateToWaypoint(this._state)
    });
  };


  #buttonCancelClickHandle = () => {
    this.#handleCloseOpenFormAddNewPoint();
  };
}
