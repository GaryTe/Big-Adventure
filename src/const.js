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
};

const TypeAction = {
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
  FILTER_FUTURE: 'FILTER_FUTURE',
  EVERYTHING: 'EVERYTHING'
};

const TypeRedraw = {
  PATCH_UPDATE: 'PATCH_UPDATE',
  PATCH_DELET: 'PATCH_DELET',
  MINOR: 'MINOR',
};

export {
  Message,
  Mode,
  TypeSort,
  TypeFilter,
  WaipointsList,
  NameSpace,
  TypeAction,
  TypeRedraw
};
