import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { offersByType } from './mock-data/offer';
import { destinations } from './mock-data/destination';
import {
  WaipointsList
} from './const';

dayjs.extend(toObject);
dayjs.extend(isSameOrBefore);

const humanizData = (value) => dayjs(value).format('DD MMM');
const humanizTame = (value) => dayjs(value).format('HH:mm');
const getDate = (value) => {
  const date = dayjs(value).toObject();
  const time = `${date.years}-${date.months}-${date.date}`;
  return time;
};
const getDataTime = (value) => {
  const date = dayjs(value).toObject();
  const dateTime = `${date.years}-${date.months}-${date.date}T${date.hours}:${date.minutes}`;
  return dateTime;
};


const updateDataWaypoint = (routesList, updateWaypoint) => {
  const updateData = routesList.map((dataRoute) => dataRoute.uniqueValue === updateWaypoint.uniqueValue ? updateWaypoint : dataRoute);
  return updateData;
};

const updateDataWaypointList = (routesList, updateWaypoint) => {
  const updateData = routesList.filter((dataRoute) => dataRoute.uniqueValue !== updateWaypoint.uniqueValue);
  return updateData;
};


const returnEventType = (waypoint) => {
  const waypointList = Object.values(WaipointsList);

  return `<div class="event__type-list">
<fieldset class="event__type-group">
  <legend class="visually-hidden">Event type</legend>
${waypointList.map((event) => {
    const typeEvent = event.toLowerCase();

    return(`<div class="event__type-item">
    <input
    id="event-type-${typeEvent}-1"
    class="event__type-input  visually-hidden"
    type="radio"
    name="event-type"
    value=${typeEvent}
    ${waypoint === event ? 'checked' : ''}
    >
    <label class="event__type-label  event__type-label--${typeEvent}" for="event-type-taxi-1">${event}</label>
  </div>`);
  }
  ).join('')}
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


function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortWaypointsDown(waypointA, waypointB) {
  const weight = getWeightForNullDate(waypointA, waypointB);

  return weight ?? dayjs(waypointB).diff(dayjs(waypointA));
}


const filterWaypoints = (waypoints) => {
  const sortWaypoints = [];
  waypoints.forEach((waypoint) => {
    if(
      dayjs().isSameOrBefore(waypoint.dateFrom, 'D')
      ||
      dayjs().isBefore(waypoint.dateTo, 'D')
    ) {
      sortWaypoints.push(waypoint);
    }
  });

  return sortWaypoints;
};

export {
  humanizData,
  humanizTame,
  getDate,
  getDataTime,
  getDataForTypePoint,
  getDataForTypeDestination,
  roundNumber,
  sortWaypointsDown,
  filterWaypoints,
  returnEventType,
  returnDestinationList,
  getNameDestination,
  getDestinationList,
  getNumberOffer,
  updateDataWaypoint,
  updateDataWaypointList
};
