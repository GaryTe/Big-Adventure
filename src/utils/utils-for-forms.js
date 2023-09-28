import { offersByType } from '../mock-data/offer';
import { destinations } from '../mock-data/destination';
import { WaipointsList } from '../const';


const returnEventType = (waypoint) => {
  const waypointList = new Set();
  offersByType.forEach(({type}) => waypointList.add(type));

  return `<div class="event__type-list">
<fieldset class="event__type-group">
  <legend class="visually-hidden">Event type</legend>
${Array.from(waypointList).map((event) => {
    const typeEvent = WaipointsList[event.toUpperCase()];

    return(`<div class="event__type-item">
    <input
    id="event-type-${event}-1"
    class="event__type-input  visually-hidden"
    type="radio"
    name="event-type"
    value=${event}
    ${waypoint === event ? 'checked' : ''}
    >
    <label class="event__type-label  event__type-label--${event}" for="event-type-taxi-1">${typeEvent}</label>
  </div>`);
  }).join('')}
</fieldset>
</div>`;
};


const getDestinationList = () => {
  const destinationList = new Set();
  destinations.forEach(({name}) => destinationList.add(name));

  return destinationList;
};


const returnDestinationList = () => {
  const destinationList = getDestinationList();

  return `<datalist id="destination-list-1">
  ${Array.from(destinationList).map((destination) => `<option value=${destination}></option>`).join('')}
</datalist>`;
};


const getNameDestination = (value) => {
  let nameDestination = null;

  if(!value) {
    return {name: '....'};
  }

  if(typeof value === 'number') {
    nameDestination = destinations.find(({id}) => id === value);
  }else{
    nameDestination = destinations.find(({name}) => name === value);
  }
  return nameDestination;
};


const getDataForTypePoint = (point, offers) => {
  const offer = offersByType.find(({type}) => type === point.toLowerCase());

  if(!offer) {return '';}

  return`<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        ${offer.offers.map((data) => {
    let checked = '';

    if(offers !== null) {
      offers.find((id) => {
        if(data.id === id) { checked = 'checked';}
      });
    }

    return (`<div class="event__available-offers">
        <div class="event__offer-selector">
        <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-luggage-1"
        type="checkbox"
        name=${data.title}
        ${checked}
        >
        <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${data.title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${data.price}</span>
    </label>
  </div>`);
  }).join('')}
  </section>`;
};


const getNumberOffer = (nameOffer, typePoint) => {

  const offersList = offersByType.find((offer) => offer.type === typePoint.toLowerCase());
  const dataOffer = offersList.offers.find((offer) => offer.title === nameOffer);

  const {id} = dataOffer;
  return id;
};


const getDataForTypeDestination = (nameDestination) => {
  if(!nameDestination) {return '';}

  const destination = destinations.find(({id}) => id === nameDestination);

  if(!destination) {return '';}

  const {description, pictures} = destination;

  return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((data) => `<img class="event__photo" src=${data.src} alt=${data.description}>`).join('')}
        </div>
      </div>
    </section>`;
};


const roundNumber = (price) => {
  const roundPrice = Math.round(price);
  return Math.abs(roundPrice);
};


export {
  returnEventType,
  getDestinationList,
  returnDestinationList,
  getNameDestination,
  getDataForTypePoint,
  getNumberOffer,
  getDataForTypeDestination,
  roundNumber
};
