const Message = {
  EVERTHING:  'Click New Event to create your first point',
  FUTURE: 'There are no future events now'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  SAVE: 'SAVE',
  'NO_SAVE': 'NO_SAVE'
};

const TypeSort = {
  DAY: 'DAY',
  PRICE: 'PRICE'
};

const TypeFilter = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE'
};

const WaipointsList = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  'CHECK-IN': 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTARANT: 'Restaurant'
};

const NameSpace = {
  WAYPOINTS: 'WAYPOINTS',
  DESTINATIONS: 'DESTINATIONS',
  OFFERS: 'OFFERRS'
};

const TypeAction = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
  FILTER_FUTURE: 'FILTER_FUTURE',
  EVERYTHING: 'EVERYTHING'
};

const TypeRedraw = {
  MINOR_PENDING: 'PENDING',
  MINOR_FULFILLED: 'FULFILLED',
  MINOR_REJECTED: 'REJECTED',
  PATCH_UPDATE: 'PATCH_UPDATE',
  PATCH_DELET: 'PATCH_DELET',
  MINOR: 'MINOR',
};

const ADDRESS_SERVER = 'https://18.ecmascript.pages.academy/big-trip/';

const Path = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers'
};

const VALUE_AUTHORIZATION = 'Basic Vlad Vanckov';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 2000,
};

const textRespons = 'Data not received. Check your connection to the server.';

export {
  Message,
  Mode,
  TypeSort,
  TypeFilter,
  WaipointsList,
  NameSpace,
  TypeAction,
  TypeRedraw,
  ADDRESS_SERVER,
  Path,
  VALUE_AUTHORIZATION,
  TimeLimit,
  textRespons
};
