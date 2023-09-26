import AbstractView from '../framework/view/abstract-view';
import { offersByType } from '../mock-data/offer';
import {
  humanizData,
  humanizTame,
  getDate,
  getDataTime
} from '../utils';
import { Message } from '../const';

const getOffers = (point) => {
  const {offers, type} = point;
  const selectOffers = [];

  const findOffer = offersByType.find((offer) => offer.type === type);

  if(!findOffer) {return;}

  for(const index of offers) {
    const selectOffer = findOffer.offers.find((offer) => offer.id === index);
    if(selectOffer) {selectOffers.push(selectOffer);}
  }
  return selectOffers;
};

const getHtmlElement = (point) => {
  const pointsList = getOffers(point);

  if(!pointsList) {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">No additional offers</span>
      </li>`
    );
  }

  const HtmlElement = pointsList.map((offer) => {
    const {price, title} = offer;

    return (`<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`);
  });

  return HtmlElement.join('');
};

const createContent = (route) => {
  if(!route) {
    return `<p class="trip-events__msg">${Message['Future'.toUpperCase()]}</p>`;
  }

  const {basePrice, dateFrom, dateTo, type} = route;

  getOffers(route);

  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${getDate(dateFrom)}">${humanizData(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt=${type}>
    </div>
    <h3 class="event__title">${type}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${getDataTime(dateFrom)}">${humanizTame(dateFrom)}</time>
        &mdash;
        <time class="event__end-time" datetime="${getDataTime(dateTo)}">${humanizTame(dateTo)}</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${getHtmlElement(route)}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
};

export default class ContentView extends AbstractView {
  #route = null;
  #handleArrowClick = null;

  constructor (route, onArrowClick) {
    super();
    this.#route = route;
    this.#handleArrowClick = onArrowClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#arrowClickHandle);
  }

  get template() {
    return createContent(this.#route);
  }

  #arrowClickHandle = () => {
    this.#handleArrowClick();
  };
}
