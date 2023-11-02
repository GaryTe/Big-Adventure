import {encode} from 'he';


let destinations = null;
let offersByType = null;


const setDestinationsList = (dataDestinations) => {
  destinations = dataDestinations;
};

const setOffers = (dataOffer) => {
  offersByType = dataOffer;
};


const returnEventType = (waypoint) => {
  const waypointList = new Set();
  offersByType.forEach(({type}) => waypointList.add(type));

  return `<div class="event__type-list">
<fieldset class="event__type-group">
  <legend class="visually-hidden">Event type</legend>
${Array.from(waypointList).map((event) => {
    const typeEvent = `${event[0].toUpperCase()}${Array.from(event).slice(1).join('')}`;

    return(`<div class="event__type-item">
    <input
    id="event-type-${encode(event)}-1"
    class="event__type-input  visually-hidden"
    type="radio"
    name="event-type"
    value=${encode(event)}
    ${waypoint === event ? 'checked' : ''}
    >
    <label class="event__type-label  event__type-label--${encode(event)}" for="event-type-taxi-1">${encode(typeEvent)}</label>
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
  ${Array.from(destinationList).map((destination) => `<option value=${encode(destination)}></option>`).join('')}
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

  if(!nameDestination) {return {name: '....'};}
  return nameDestination;
};


const getDataForTypePoint = (point, offers) => {
  const offer = offersByType.find(({type}) => type === point.toLowerCase());

  if(!offer) {return '';}

  return`<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        ${offer.offers.map((data) => {
    const {title, price} = data;
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
        name=${encode(title)}
        ${checked}
        >
        <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${encode(title)}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${encode(price.toString())}</span>
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
      <p class="event__destination-description">${encode(description)}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((data) => `<img class="event__photo" src=${encode(data.src)} alt=${encode(data.description)}>`).join('')}
        </div>
      </div>
    </section>`;
};


const roundNumber = (price) => {
  const roundPrice = Math.round(price);
  return Math.abs(roundPrice);
};


const parseStateToWaypoint = (point) => {

  const dataPoint = {
    ...point
  };

  delete dataPoint.isFavorite;
  delete dataPoint.isSaving;
  delete dataPoint.isDeleting;
  delete dataPoint.isDisabled;

  return dataPoint;
};


const parseNewStateToWaypoint = (point) => {

  const dataPoint = {
    ...point
  };

  delete dataPoint.id;
  delete dataPoint.isFavorite;
  delete dataPoint.isSaving;
  delete dataPoint.isDisabled;

  return dataPoint;
};

export {
  returnEventType,
  getDestinationList,
  returnDestinationList,
  getNameDestination,
  getDataForTypePoint,
  getNumberOffer,
  getDataForTypeDestination,
  roundNumber,
  setDestinationsList,
  setOffers,
  parseStateToWaypoint,
  parseNewStateToWaypoint,
  offersByType
};
